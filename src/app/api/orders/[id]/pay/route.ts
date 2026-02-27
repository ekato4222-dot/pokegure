import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { paymentMethod } = await request.json();

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const userId = (session.user as { id?: string }).id;
  const isAdmin = (session.user as { role?: string }).role === "admin";
  if (!isAdmin && order.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Mock payment processing
  const updated = await prisma.order.update({
    where: { id },
    data: { paymentStatus: "paid", paymentMethod },
  });

  return NextResponse.json(updated);
}
