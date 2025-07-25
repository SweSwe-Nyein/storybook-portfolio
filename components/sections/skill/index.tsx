import { getSkills } from '@/lib/data/home'
import React from 'react'
import InteractiveSkillsClient from './client';

const InteractiveSkills = async () => {
  const skills = await getSkills();
  return (
    <InteractiveSkillsClient skills={skills} />
  )
}

export default InteractiveSkills