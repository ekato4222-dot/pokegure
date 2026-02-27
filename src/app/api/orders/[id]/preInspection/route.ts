import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string })?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { cards } = await request.json() as {
    cards: {
      cardId: string;
      preInspectionResult: string;
      preInspectionGrade: string;
      preInspectionComment: string;
    }[];
  };

  const updates = await Promise.all(
    cards.map((c) =>
      prisma.orderCard.update({
        where: { id: c.cardId },
        data: {
          preInspectionResult: c.preInspectionResult,
          preInspectionGrade: c.preInspectionGrade,
          preInspectionComment: c.preInspectionComment,
        },
      })
    )
  );

  await prisma.order.update({
    where: { id },
    data: { status: "pre_done" },
  });

  return NextResponse.json(updates);
}
