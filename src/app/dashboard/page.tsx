import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getStatusLabel, STATUS_COLORS } from "@/lib/status";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userId = (session.user as { id?: string }).id!;
  const isAdmin = (session.user as { role?: string }).role === "admin";

  let orders: Array<any> = [];
  let dbError = false;

  try {
    orders = await prisma.order.findMany({
      where: isAdmin ? {} : { userId },
      include: { additionalCharges: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    dbError = true;
  }

  const planLabels: Record<string, string> = {
    economy: "エコノミー",
    standard: "スタンダード",
    express: "エクスプレス",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-gray)" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border-light)", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span className="gradient-text" style={{ fontSize: "1.4rem", fontWeight: 900 }}>ポケグレ</span>
        </Link>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {isAdmin && (
            <Link href="/admin" style={{ color: "var(--accent-indigo)", fontWeight: 600, fontSize: "0.9rem" }}>
              管理画面
            </Link>
          )}
          <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{session.user.name}</span>
          <Link href="/api/auth/signout" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            ログアウト
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-heading)" }}>
            {isAdmin ? "全注文一覧" : "マイページ"}
          </h1>
          <Link href="/dashboard/order/new">
            <button className="btn-primary" style={{ padding: "0.6rem 1.5rem", fontSize: "0.9rem" }}>
              ＋ 新規申し込み
            </button>
          </Link>
        </div>

        {dbError && (
          <div className="glass-card" style={{ marginBottom: "1rem", padding: "1rem", color: "#b45309" }}>
            現在データベースに接続できません。接続復旧後に注文一覧が表示されます。
          </div>
        )}

        {orders.length === 0 ? (
          <div className="glass-card" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
            <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>まだ申し込みがありません</p>
            <Link href="/dashboard/order/new">
              <button className="btn-primary">最初の申し込みをする</button>
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {orders.map((order) => {
              const extras = order.additionalCharges.reduce((s: number, c: { amount: number }) => s + c.amount, 0);
              const total = order.totalAmount + extras;
              return (
                <Link key={order.id} href={`/dashboard/order/${order.id}`} style={{ textDecoration: "none" }}>
                  <div className="glass-card" style={{ padding: "1.25rem 1.5rem", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
                        <span style={{
                          background: STATUS_COLORS[order.status] ?? "#6b7280",
                          color: "#fff",
                          padding: "0.2rem 0.75rem",
                          borderRadius: "999px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}>
                          {getStatusLabel(order.status)}
                        </span>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          {new Date(order.createdAt).toLocaleDateString("ja-JP")}
                        </span>
                      </div>
                      <p style={{ fontWeight: 600, color: "var(--text-heading)", marginBottom: "0.2rem" }}>
                        {planLabels[order.plan] ?? order.plan} / {order.gradingCompany} / {order.cardCount}枚
                      </p>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                        {order.preInspection ? "事前鑑定あり" : "事前鑑定なし"}
                        {order.paymentStatus === "paid" && <span style={{ color: "#10b981", marginLeft: "0.75rem", fontWeight: 600 }}>✓ 支払済み</span>}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--accent-indigo)" }}>
                        ¥{total.toLocaleString()}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>→ 詳細</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
