import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { STATUS_LIST } from "@/lib/status";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const userId = (session.user as { id?: string }).id;
  const isAdmin = (session.user as { role?: string }).role === "admin";

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true, phone: true } },
      cards: true,
      additionalCharges: true,
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!isAdmin && order.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(order);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string })?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();

  if (body.status && !STATUS_LIST.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const numberFields = [
    "adminFeeCandidate",
    "declaredPrice",
    "insuranceFee",
    "totalCardCount",
    "gradingTotalAmount",
    "preInspectionFee",
    "returnShippingFee",
    "totalInvoiceAmount",
    "psaFee",
    "customsShippingFee",
    "estimatedNetProfit",
  ] as const;

  const data: Record<string, string | number | boolean | null> = {
    inputNo: body.inputNo ?? null,
    listNo: body.listNo ?? null,
    userDisplayName: body.userDisplayName ?? null,
    customerName: body.customerName ?? null,
    customerPhone: body.customerPhone ?? null,
    memo: body.memo ?? null,
    preInspectionRequested:
      typeof body.preInspectionRequested === "boolean" ? body.preInspectionRequested : null,
    actualShippingPlan: body.actualShippingPlan ?? null,
    cardName: body.cardName ?? null,
    status: body.status,
    adminNote: body.adminNote ?? null,
  };

  for (const field of numberFields) {
    const value = body[field];
    data[field] = value === "" || value === undefined || value === null ? null : Number(value);
  }

  const order = await prisma.order.update({
    where: { id },
    data,
  });

  return NextResponse.json(order);
}
