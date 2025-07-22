import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create User
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'sweswe4720@gmail.com',
      password: 'password123',
      role: 'developer',
      bio: 'Fullstack Developer with a passion for frontend tech.',
      experienceYears: 5,
      projectsCount: 3,
      image: 'https://example.com/john.jpg',
      emailVerified: new Date(),
    },
  });

  // Create Skill Categories and Skills
  const frontendCategory = await prisma.skillCategory.create({
    data: {
      name: 'Frontend Development',
      description: 'Building UI with modern frontend tools.',
      proficiency: 90,
      skills: {
        create: [
          { name: 'React' },
          { name: 'Next.js' },
          { name: 'TypeScript' },
        ],
      },
    },
  });

  const designCategory = await prisma.skillCategory.create({
    data: {
      name: 'UI/UX Design',
      description: 'Designing user-friendly and accessible interfaces.',
      proficiency: 80,
      skills: {
        create: [
          { name: 'Figma' },
          { name: 'Adobe XD' },
        ],
      },
    },
  });

  // Create Projects
  await prisma.project.createMany({
    data: [
      {
        title: 'Storybook Portfolio',
        subtitle: 'A Tale of a Developer',
        description: 'A personal portfolio built with modern technologies.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        liveUrl: 'https://example.com/portfolio',
        codeUrl: 'https://github.com/johndoe/portfolio',
      },
      {
        title: 'Task Manager App',
        subtitle: 'Productivity in Your Pocket',
        description: 'A fullstack task management application.',
        techStack: ['React', 'Node.js', 'Prisma'],
        liveUrl: 'https://example.com/taskapp',
        codeUrl: 'https://github.com/johndoe/taskapp',
      },
    ],
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
