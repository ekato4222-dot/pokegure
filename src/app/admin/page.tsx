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

  let orders: Array<any> = [];
  try {
    orders = await prisma.order.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    orders = [];
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-gray)" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border-light)", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="gradient-text" style={{ fontSize: "1.4rem", fontWeight: 900 }}>ポケグレ 管理画面</span>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link href="/dashboard" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>マイページ</Link>
          <Link href="/api/auth/signout" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>ログアウト</Link>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-heading)" }}>注文一覧</h1>
          <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>全 {orders.length} 件</span>
        </div>

        <div className="glass-card" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "860px" }}>
            <thead>
              <tr style={{ background: "rgba(99,102,241,0.06)", textAlign: "left" }}>
                {[
                  "打ち込みNo.",
                  "リストNo.",
                  "氏名",
                  "ステータス",
                  "合計請求金額",
                  "事前鑑定",
                  "更新",
                ].map((h) => (
                  <th key={h} style={{ padding: "0.8rem", fontSize: "0.85rem", color: "var(--text-muted)", borderBottom: "1px solid var(--border-light)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{ padding: "0.75rem 0.8rem", fontFamily: "monospace" }}>{order.inputNo ?? "-"}</td>
                  <td style={{ padding: "0.75rem 0.8rem", fontFamily: "monospace" }}>{order.listNo ?? "-"}</td>
                  <td style={{ padding: "0.75rem 0.8rem" }}>{order.customerName ?? order.user.name ?? "-"}</td>
                  <td style={{ padding: "0.75rem 0.8rem" }}>
                    <span style={{
                      background: STATUS_COLORS[order.status] ?? "#6b7280",
                      color: "#fff",
                      padding: "0.2rem 0.7rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem 0.8rem", fontWeight: 700, color: "#6366f1" }}>
                    ¥{(order.totalInvoiceAmount ?? order.totalAmount).toLocaleString()}
                  </td>
                  <td style={{ padding: "0.75rem 0.8rem" }}>{order.preInspectionRequested ? "あり" : "なし"}</td>
                  <td style={{ padding: "0.75rem 0.8rem" }}>
                    <Link href={`/admin/orders/${order.id}`} style={{ color: "#6366f1", fontWeight: 600 }}>編集</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
