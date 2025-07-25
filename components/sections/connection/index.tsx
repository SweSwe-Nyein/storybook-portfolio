import React from 'react'
import ConnectionClient from './client'
import { getProfile } from '@/lib/data/home'

const Connection = async () => {
  const profile = await getProfile();
  if (!profile) {
    return <div>No profile data</div>;
  }
  return (
    <ConnectionClient profile={profile} />
  )
}

export default Connection