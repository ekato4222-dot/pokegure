import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, phone } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: "必須項目を入力してください" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "このメールアドレスは既に登録されています" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((v: string) => v.trim().toLowerCase())
      .filter(Boolean);

    const role = adminEmails.includes(String(email).toLowerCase()) ? "admin" : "customer";

    const user = await prisma.user.create({
      data: { email, password: hashed, name, phone, role },
    });

    return NextResponse.json({ id: user.id, email: user.email, name: user.name }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "登録に失敗しました" }, { status: 500 });
  }
}
