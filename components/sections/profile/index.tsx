import React from 'react'
import ProfileClient from './client'
import { getProfile } from '@/lib/data/home'
import AboutMe from '../about-me';

const Profile = async () => {
  const profile = await getProfile();
  if (!profile) {
    return <div>No profile data</div>;
  }
  return (
    <>
      <ProfileClient profile={profile} />
      <AboutMe profile={profile} />
    </>
  )
}

export default Profile