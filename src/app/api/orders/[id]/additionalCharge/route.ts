import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseNullableInt } from "@/lib/orderFields";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string })?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { description, amount } = await request.json();
  const parsed = parseNullableInt(amount);

  if (!description || !parsed.ok || parsed.value === null) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const charge = await prisma.additionalCharge.create({
      data: { orderId: id, description, amount: parsed.value },
    });

    return NextResponse.json(charge, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Create failed" }, { status: 503 });
  }
}
