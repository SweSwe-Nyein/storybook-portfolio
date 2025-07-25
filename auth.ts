import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from 'zod';
import type { ProfileData } from '@/types/profile';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./lib/prisma";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<ProfileData | undefined> {
  try {
    const user = await sql<ProfileData[]>`SELECT * FROM "User" WHERE email = ${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return undefined; // Instead of throwing
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/login",
    error: "/error",
  },
  adapter: PrismaAdapter(prisma),
  session: {strategy: 'jwt'},
  providers: [
    Google,
    GitHub({
      allowDangerousEmailAccountLinking: true
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email({ message: 'Invalid email' }),
            password: z.string().min(6),
          })
          .safeParse(credentials);
          if(parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            if (!user.password) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);
            // const passwordsMatch = password == user.password
            if (passwordsMatch) return user;
          }
          return null;
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user?.email) return false;
      const dbUser = await getUser(user.email);
      if (!dbUser) {
        return false;
      }
      return true;
    }
  },
});
