import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const adminPassword = await bcrypt.hash("admin1234", 10);
  await prisma.user.upsert({
    where: { email: "admin@pokegure.jp" },
    update: {},
    create: {
      email: "admin@pokegure.jp",
      password: adminPassword,
      name: "管理者",
      role: "admin",
    },
  });

  // Test user
  const testPassword = await bcrypt.hash("test1234", 10);
  await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      password: testPassword,
      name: "テストユーザー",
      phone: "090-0000-0000",
      role: "customer",
    },
  });

  console.log("Seed complete!");
  console.log("Admin: admin@pokegure.jp / admin1234");
  console.log("Test:  test@example.com / test1234");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
