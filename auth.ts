import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { z } from 'zod';
import type { User } from '@/types/user';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM "User" WHERE email = ${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return undefined; // Instead of throwing
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/login",
    error: "/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
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
            // const passwordsMatch = await bcrypt.compare(password, user.password);
            const passwordsMatch = password == user.password
            if (passwordsMatch) return user;
          }
          return null;
      }
    }),
  ],
  
  callbacks: {
    async signIn({ user, account, profile }) {
      if(account?.provider === 'google') return true;
      console.log('signIn', { user, account, profile });
      // Only allow sign in if user exists in your DB
      if (!user?.email) return false;
      const dbUser = await getUser(user.email!);
      if (dbUser) return true;
      return false; // Block sign in for unknown users
    },
  }
});
