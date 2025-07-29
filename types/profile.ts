export type ProfileData = {
  id: string;
  name: string | null;
  email: string | null;
  password: string | null;
  role: string | null;
  overview: string | null;
  bio: string | null;
  experienceYears: number | null;
  projectsCount: number | null;
  emailVerified: Date | null;
  image: string | null;
  address: string | null;
  githubUrl: string | null;
  instagramUrl: string | null;
  linkedInUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type SkillData = {
  id: number;
  name: string;
  description: string;
  icon: string | null;
  color: string | null;
  skills: Skills[];
}

export type Skills = {
  id: number;
  name: string;
  skillCategoryId: number;
}

export type workExperienceData = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies: string[];
  companyUrl: string | null;
  type: string;
}

export type ProjectData = {
  id: number;
  tag: string | null;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  liveUrl: string | null;
  codeUrl: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}