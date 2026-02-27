import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PLAN_PRICES: Record<string, number> = {
  economy: 3500,
  standard: 5500,
  express: 12000,
};

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id;
  const isAdmin = (session.user as { role?: string }).role === "admin";

  const orders = await prisma.order.findMany({
    where: isAdmin ? {} : { userId },
    include: { user: { select: { name: true, email: true } }, cards: true, additionalCharges: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { plan, gradingCompany, cardCount, preInspection, cards } = body;
    const userId = (session.user as { id?: string }).id!;

    const planPrice = PLAN_PRICES[plan] ?? 0;
    const preInspectionPrice = preInspection ? 500 : 0;
    const totalAmount = (planPrice + preInspectionPrice) * cardCount;

    const order = await prisma.order.create({
      data: {
        userId,
        plan,
        gradingCompany,
        cardCount,
        preInspection,
        totalAmount,
        cards: {
          create: (cards as { cardName: string }[]).map((c) => ({ cardName: c.cardName })),
        },
      },
      include: { cards: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "注文作成に失敗しました" }, { status: 500 });
  }
}
