import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getStatusLabel, STATUS_COLORS } from "@/lib/status";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  if ((session.user as { role?: string }).role !== "admin") redirect("/dashboard");

  const orders = await prisma.order.findMany({
    include: { user: { select: { name: true, email: true } }, additionalCharges: true },
    orderBy: { createdAt: "desc" },
  });

  const PLAN_LABELS: Record<string, string> = {
    economy: "エコノミー",
    standard: "スタンダード",
    express: "エクスプレス",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-gray)" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border-light)", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="gradient-text" style={{ fontSize: "1.4rem", fontWeight: 900 }}>ポケグレ 管理画面</span>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link href="/dashboard" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>マイページ</Link>
          <Link href="/api/auth/signout" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>ログアウト</Link>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-heading)" }}>注文一覧</h1>
          <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>全 {orders.length} 件</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {orders.map((order) => {
            const extras = order.additionalCharges.reduce((s, c) => s + c.amount, 0);
            const total = order.totalAmount + extras;
            return (
              <Link key={order.id} href={`/admin/orders/${order.id}`} style={{ textDecoration: "none" }}>
                <div className="glass-card" style={{ padding: "1rem 1.5rem", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.3rem" }}>
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
                      {order.paymentStatus === "paid" && (
                        <span style={{ color: "#10b981", fontWeight: 600, fontSize: "0.8rem" }}>✓ 支払済み</span>
                      )}
                    </div>
                    <p style={{ fontWeight: 600 }}>{order.user.name} ({order.user.email})</p>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      {PLAN_LABELS[order.plan] ?? order.plan} / {order.gradingCompany} / {order.cardCount}枚 /
                      {order.preInspection ? " 事前鑑定あり" : " 事前鑑定なし"}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontWeight: 700, color: "#6366f1" }}>¥{total.toLocaleString()}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {new Date(order.createdAt).toLocaleDateString("ja-JP")}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
