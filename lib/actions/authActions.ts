'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { signOut } from "@/auth";
import { revalidatePath } from 'next/cache';
import prisma from '../prisma';

const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}
export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};
export async function signOutAction() {
  await signOut({ redirectTo: '/' });
  revalidatePath('/');
}
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials';
        default:
          return 'Something went wrong';
      }
    }
    throw error;
  }
}

export async function signInWithGoogle () {
  await signIn('google', { callbackUrl: '/dashboard' });
}