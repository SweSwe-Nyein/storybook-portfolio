import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProfile = async () => {
  try {
    const data = await prisma.user.findFirst();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch profile");
  }
}

export async function getSkills() {
  try {
    const data = await prisma.skillCategory.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        skills: true,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch skills");
  }
}

export async function getProjects() {
  try {
    const data = await prisma.project.findMany({
      orderBy: {
        id: "asc",
      }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch projects");
  }
}