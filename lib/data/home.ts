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

export const getSkills = async () => {
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

export const getWorkExperience = async () => {
  try {
    const data = await prisma.workExperience.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch work experience");
  }
}

export const getProjects = async () => {
  try {
    const data = await prisma.project.findMany({
      orderBy: {
        id: "desc",
      },
      take: 4
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch projects");
  }
}