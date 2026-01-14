import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    return NextResponse.json({ session: session ?? null }, { status: 200 });
  } catch (_err) {
    return NextResponse.json({ session: null }, { status: 200 });
  }
}
