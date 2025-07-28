import React from 'react'
import WorkExperienceClient from './client'
import { getWorkExperience } from '@/lib/data/home'

const WorkExperience = async () => {
  const workExperiences = await getWorkExperience();

  return (
    <WorkExperienceClient workExperiences={workExperiences} />
  )
}

export default WorkExperience