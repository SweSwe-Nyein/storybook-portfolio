'use server';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  overview: z.string(),
  bio: z.string(),
  experienceYears: z.number(),
  projectsCount: z.number(),
  address: z.string(),
  githubUrl: z.string(),
  instagramUrl: z.string(),
  linkedInUrl: z.string(),
})

const PasswordFormSchema = z.object({
  currentPassword: z.string(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'], // the field where the error will appear
  message: 'Passwords do not match',
})

const UpdateProfile = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    role?: string[];
    overview?: string[];
    bio?: string[];
    experienceYears?: string[];
    projectsCount?: string[];
    address?: string[];
    githubUrl?: string[];
    instagramUrl?: string[];
    linkedInUrl?: string[];
  };
  message?: string | null;
}

export type PasswordState = {
  errors?: {
    currentPassword?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
}

export const updateProfile = async (id: string, prevState: State | undefined, formData: FormData) => {
  const validatedFields = UpdateProfile.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    role: formData.get('role'),
    overview: formData.get('overview'),
    bio: formData.get('bio'),
    experienceYears: Number(formData.get('experienceYears')),
    projectsCount: Number(formData.get('projectsCount')),
    address: formData.get('address'),
    githubUrl: formData.get('githubUrl'),
    instagramUrl: formData.get('instagramUrl'),
    linkedInUrl: formData.get('linkedInUrl'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing required fields',
    }
  }
  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        role: validatedFields.data.role,
        overview: validatedFields.data.overview,
        bio: validatedFields.data.bio,
        experienceYears: validatedFields.data.experienceYears,
        projectsCount: validatedFields.data.projectsCount,
        address: validatedFields.data.address,
        githubUrl: validatedFields.data.githubUrl,
        instagramUrl: validatedFields.data.instagramUrl,
        linkedInUrl: validatedFields.data.linkedInUrl,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update profile");
  }

  revalidatePath("/dashboard/settings");
  redirect("/dashboard/settings");
};

export const updatePassword = async (
  id: string,
  prevState: PasswordState | undefined,
  formData: FormData
) => {
  const validatedFields = PasswordFormSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing required fields",
    };
  }

  const { currentPassword, password } = validatedFields.data;

  try {
    // Get the user to check the current password
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user || !user.password) {
      return {
        errors: { currentPassword: ["User not found or has no password"] },
        message: "User not found",
      };
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return {
        errors: { currentPassword: ["Current password is incorrect"] },
        message: "Authentication failed",
      };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Update the password in the database
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

  } catch (error) {
    console.error(error);
    throw new Error("Failed to update password");
  }

  revalidatePath("/dashboard/settings");
  redirect("/dashboard/settings");
};
