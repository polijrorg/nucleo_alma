import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3"; // seu client S3/MinIO
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const videoId = form.get("videoId");
    const file = form.get("file");

    if (!videoId || typeof videoId !== "string") {
      return NextResponse.json({ error: "videoId ausente." }, { status: 400 });
    }
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Arquivo ausente (file)." }, { status: 400 });
    }

    const video = await prisma.video.findUnique({
      where: { id: videoId },
      select: { id: true, storageKeyOriginal: true, mimeType: true },
    });

    if (!video) {
      return NextResponse.json({ error: "Video não encontrado." }, { status: 404 });
    }

    // valida mime se quiser bater com o init
    if (video.mimeType && file.type !== video.mimeType) {
      return NextResponse.json(
        { error: `Content-Type diferente do esperado (${video.mimeType}).` },
        { status: 400 }
      );
    }

    const bucket = process.env.S3_BUCKET!;
    const bytes = await file.arrayBuffer();

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: video.storageKeyOriginal,
        Body: Buffer.from(bytes),
        ContentType: file.type,
      })
    );

    // opcional: você pode marcar como UPLOADED aqui
    await prisma.video.update({
      where: { id: videoId },
      data: { status: "UPLOADED" }, // se você tiver esse campo
    }).catch(() => {});

    return NextResponse.json({ ok: true, videoId, key: video.storageKeyOriginal });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro no upload-proxy." }, { status: 500 });
  }
}
