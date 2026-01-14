import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "@/lib/prisma";
import { s3 } from "@/lib/s3";
import { requireUserId } from "@/lib/require-user";


export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_MIMES = new Set(["video/mp4", "video/quicktime", "video/webm"]);
const MAX_BYTES = 500 * 1024 * 1024; // 500MB

function extFromMime(mimeType: string) {
  if (mimeType === "video/mp4") return "mp4";
  if (mimeType === "video/webm") return "webm";
  if (mimeType === "video/quicktime") return "mov";
  return "bin";
}

export async function POST(req: NextRequest) {
  try {
    // TODO: Better Auth
    const userId = await requireUserId();
    if (!userId) return NextResponse.json({ error: "Não autenticado." }, { status: 401 });


    const body = await req.json().catch(() => null);
    const mimeType = body?.mimeType as string | undefined;
    const size = body?.size as number | undefined;

    if (!mimeType || !ALLOWED_MIMES.has(mimeType)) {
      return NextResponse.json({ error: "mimeType inválido." }, { status: 400 });
    }
    if (typeof size !== "number" || size <= 0 || size > MAX_BYTES) {
      return NextResponse.json({ error: "size inválido." }, { status: 400 });
    }

    const ext = extFromMime(mimeType);

    // 1) cria registro para obter videoId (ObjectId)
    const created = await prisma.video.create({
      data: {
        userId,
        mimeType,
        size,
        storageKeyOriginal: "PENDING",
      },
      select: { id: true, status: true },
    });

    const videoId = created.id;
    const key = `${userId}/${videoId}/original.${ext}`;

    // 2) salva a key final
    await prisma.video.update({
      where: { id: videoId },
      data: { storageKeyOriginal: key },
    });

    // 3) gera presigned PUT
    const bucket = process.env.S3_BUCKET!;
    const uploadUrl = await getSignedUrl(
      s3,
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: mimeType,
      }),
      { expiresIn: 600 } // 10 min
    );

    return NextResponse.json(
      {
        ok: true,
        videoId,
        status: created.status, // UPLOADING
        storageKeyOriginal: key,
        upload: {
          method: "PUT",
          url: uploadUrl,
          headers: {
            "Content-Type": mimeType,
          },
          expiresInSeconds: 600,
        },
        // DEV: Bruno usa proxy pq ele não manda raw PUT binário bem
        dev: {
          uploadProxyEndpoint: "/api/videos/upload-proxy",
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro no init." }, { status: 500 });
  }
}
