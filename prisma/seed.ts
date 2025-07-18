import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Swe',
      email: 'sweswe4720@gmail.com',
      password: 'password123',
      role: 'Frontend Developer',
      bio: 'From Yangon to Chiang Mai, crafting seamless user experiences...',
      experienceYears: 3,
      projectsCount: 10
    }
  })

  const frontendCategory = await prisma.skillCategory.create({
    data: {
      name: 'Frontend Development',
      description: 'Crafting beautiful, responsive user interfaces with modern frameworks',
      proficiency: 95,
      skills: {
        create: [
          { name: 'React' },
          { name: 'Next.js' },
          { name: 'TypeScript' },
          { name: 'Redux' },
          { name: 'Tanstack' },
          { name: 'Zustand' }
        ]
      }
    }
  })

  const project = await prisma.project.create({
    data: {
      title: 'Storybook Portfolio',
      subtitle: 'A Tale of a Developer',
      description: 'Built with Framer Motion for dynamic visuals and smooth interactions...',
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Prisma', 'MongoDB'],
      liveUrl: 'https://swe-storybook.vercel.app',
      codeUrl: 'https://github.com/your-repo-link'
    }
  })

  console.log({ user, frontendCategory, project })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
