import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

const adminEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((v) => v.trim().toLowerCase())
  .filter(Boolean);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "メールアドレス", type: "email" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Vercelテスト環境向け: DB未接続でも入れるデモ管理者
        const demoAdminEmail = process.env.DEMO_ADMIN_EMAIL?.trim().toLowerCase();
        const demoAdminPassword = process.env.DEMO_ADMIN_PASSWORD;
        if (
          demoAdminEmail &&
          demoAdminPassword &&
          credentials.email.toLowerCase() === demoAdminEmail &&
          credentials.password === demoAdminPassword
        ) {
          return {
            id: "demo-admin",
            email: credentials.email,
            name: "Demo Admin",
            role: "admin",
          };
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) return null;

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) return null;

          const role = adminEmails.includes(user.email.toLowerCase()) ? "admin" : user.role;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; role?: string }).id = token.sub;
        (session.user as { id?: string; role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
