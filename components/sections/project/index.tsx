import React from 'react'
import ProjectShowcaseClient from './client'
import { getProjects } from '@/lib/data/home'

const Project = async () => {
  const projects = await getProjects();

  return (
    <ProjectShowcaseClient projects={projects} />
  )
}

export default Project