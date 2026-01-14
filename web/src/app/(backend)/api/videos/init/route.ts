import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { s3 } from "@/lib/s3";
import { prisma } from "@/lib/prisma"; // ajuste o path conforme seu projeto

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_MIMES = new Set(["video/mp4", "video/quicktime", "video/webm"]);
const MAX_BYTES = 500 * 1024 * 1024; // 500MB (ajuste)

export async function POST(req: NextRequest) {
  try {
    // TODO: plugar Better Auth aqui:
    // const user = await requireUser(req);
    // if (!user) return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
    const userId = "TEMP_USER_ID"; // substitua pelo user.id

    const body = await req.json().catch(() => null);
    const mimeType = body?.mimeType as string | undefined;
    const size = body?.size as number | undefined;

    if (!mimeType || !ALLOWED_MIMES.has(mimeType)) {
      return NextResponse.json({ error: "mimeType inválido." }, { status: 400 });
    }
    if (!size || typeof size !== "number" || size <= 0 || size > MAX_BYTES) {
      return NextResponse.json({ error: "size inválido." }, { status: 400 });
    }

    // 1) cria registro no DB (status UPLOADING)
    const video = await prisma.video.create({
      data: {
        userId,
        mimeType,
        size,
        storageKeyOriginal: "TEMP", // vamos setar já já
      },
      select: { id: true },
    });

    // 2) define a key no storage com videoId
    const videoId = video.id; // ObjectId string
    const ext =
      mimeType === "video/mp4" ? "mp4" : mimeType === "video/webm" ? "webm" : "mov";

    const storageKeyOriginal = `videos/${userId}/${videoId}/original.${ext}`;

    // 3) atualiza o registro com a key correta
    await prisma.video.update({
      where: { id: videoId },
      data: { storageKeyOriginal },
    });

    // 4) gera presigned PUT URL
    const bucket = process.env.S3_BUCKET!;
    const putCmd = new PutObjectCommand({
      Bucket: bucket,
      Key: storageKeyOriginal,
      ContentType: mimeType,
      // (Opcional) metadata: { videoId, userId },
    });

    const uploadUrl = await getSignedUrl(s3, putCmd, { expiresIn: 60 * 10 }); // 10 min

    return NextResponse.json(
      {
        ok: true,
        videoId,
        storageKeyOriginal,
        upload: {
          method: "PUT",
          url: uploadUrl,
          headers: {
            "Content-Type": mimeType,
          },
          expiresInSeconds: 600,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro no init." }, { status: 500 });
  }
}
