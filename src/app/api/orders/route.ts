import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { INITIAL_ORDER_STATUS } from "@/lib/status";

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

  try {
    const orders = await prisma.order.findMany({
      where: isAdmin ? {} : { userId },
      include: { user: { select: { name: true, email: true } }, cards: true, additionalCharges: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: "DB unavailable", orders: [] }, { status: 503 });
  }
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

    // デモユーザーはDBなしでモック成功レスポンスを返す
    if (userId === "demo-user" || userId === "demo-admin") {
      const planPrice = PLAN_PRICES[plan] ?? 0;
      const preInspectionPrice = preInspection ? 500 : 0;
      const totalAmount = (planPrice + preInspectionPrice) * cardCount;
      return NextResponse.json({
        id: "demo-order-" + Date.now(),
        plan, gradingCompany, cardCount, preInspection,
        status: INITIAL_ORDER_STATUS,
        totalAmount,
        cards: (cards as { cardName: string }[]).map((c, i) => ({ id: `demo-card-${i}`, cardName: c.cardName })),
        demo: true,
      }, { status: 201 });
    }

    const planPrice = PLAN_PRICES[plan] ?? 0;
    const preInspectionPrice = preInspection ? 500 : 0;
    const totalAmount = (planPrice + preInspectionPrice) * cardCount;

    const customerName = (session.user as { name?: string | null }).name ?? null;

    const order = await prisma.order.create({
      data: {
        userId,
        plan,
        gradingCompany,
        cardCount,
        preInspection,
        status: INITIAL_ORDER_STATUS,
        totalAmount,
        userDisplayName: customerName,
        customerName,
        preInspectionRequested: preInspection,
        totalCardCount: cardCount,
        gradingTotalAmount: totalAmount,
        preInspectionFee: preInspection ? 500 * cardCount : 0,
        totalInvoiceAmount: totalAmount,
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
