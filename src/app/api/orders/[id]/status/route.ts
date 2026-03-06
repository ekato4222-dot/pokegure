import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { normalizeStatus } from "@/lib/status";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string })?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { status, adminNote } = await request.json();
  const normalizedStatus = normalizeStatus(status);

  if (!normalizedStatus) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status: normalizedStatus, ...(adminNote !== undefined && { adminNote }) },
    });

    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 503 });
  }
}
