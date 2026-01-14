import { NextRequest, NextResponse } from "next/server";
import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // TODO: plugar Better Auth aqui:
    // const user = await requireUser(req);
    // if (!user) return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
    const userId = "TEMP_USER_ID";

    const body = await req.json().catch(() => null);
    const videoId = body?.videoId as string | undefined;

    if (!videoId) {
      return NextResponse.json({ error: "videoId é obrigatório." }, { status: 400 });
    }

    // 1) pega o vídeo no DB e valida dono
    const video = await prisma.video.findUnique({
      where: { id: videoId },
      select: { id: true, userId: true, storageKeyOriginal: true, status: true },
    });

    if (!video) return NextResponse.json({ error: "Vídeo não encontrado." }, { status: 404 });
    if (video.userId !== userId) return NextResponse.json({ error: "Sem permissão." }, { status: 403 });

    // 2) confirma que o objeto existe no storage
    const bucket = process.env.S3_BUCKET!;
    const head = await s3.send(
      new HeadObjectCommand({
        Bucket: bucket,
        Key: video.storageKeyOriginal,
      })
    );

    // 3) marca UPLOADED
    const updated = await prisma.video.update({
      where: { id: videoId },
      data: { status: "UPLOADED" },
      select: { id: true, status: true, updatedAt: true },
    });

    return NextResponse.json({
      ok: true,
      video: updated,
      storage: {
        contentLength: head.ContentLength ?? null,
        contentType: head.ContentType ?? null,
        etag: head.ETag ?? null,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro no complete." }, { status: 500 });
  }
}
