"use client"

import React, { useActionState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ProfileData } from '@/types/profile'
import { State, updateProfile } from '@/lib/actions/profileAction'
import { Button } from "@/components/ui/button"

const Profile = ({profile}: {profile: ProfileData}) => {
  const initialState: State = { message: null, errors: {} };
  const updateProfileWithId = updateProfile.bind(null, profile.id);
  const [state, formAction] = useActionState(updateProfileWithId, initialState);
  
  return (
    <form action={formAction}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Full Name</label>
            <Input 
              id='name'
              name='name'
              defaultValue={profile.name ?? ""}
              className="artistic-input"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Email</label>
            <Input 
              id='email'
              name='email'
              type='email'
              defaultValue={profile.email ?? ""}
              className="artistic-input"
            />
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Role</label>
            <Input 
              id='role'
              name='role'
              defaultValue={profile.role ?? ""}
              className="artistic-input"
            />
            <div id="role-error" aria-live="polite" aria-atomic="true">
              {state.errors?.role &&
                state.errors.role.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Address</label>
            <Input 
              id='address'
              name='address'
              defaultValue={profile.address ?? ""}
              className="artistic-input"
            />
            <div id="address-error" aria-live="polite" aria-atomic="true">
              {state.errors?.address &&
                state.errors.address.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Experience Year</label>
            <Input 
              id='experienceYears'
              name='experienceYears'
              type='number'
              defaultValue={profile.experienceYears ?? ""}
              className="artistic-input"
            />
            <div id="experienceYears-error" aria-live="polite" aria-atomic="true">
              {state.errors?.experienceYears &&
                state.errors.experienceYears.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Projects Count</label>
            <Input 
              id='projectsCount'
              name='projectsCount'
              type='number'
              defaultValue={profile.projectsCount ?? ""}
              className="artistic-input"
            />
            <div id="projectsCount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.projectsCount &&
                state.errors.projectsCount.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Overview</label>
            <Textarea
              id='overview'
              name='overview'
              defaultValue={profile.overview ?? ""}
              className="artistic-input"
              rows={5}
            />
            <div id="overview-error" aria-live="polite" aria-atomic="true">
              {state.errors?.overview &&
                state.errors.overview.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Bio</label>
            <Textarea
              id='bio'
              name='bio'
              defaultValue={profile.bio ?? ""}
              className="artistic-input"
              rows={5}
            />
            <div id="bio-error" aria-live="polite" aria-atomic="true">
              {state.errors?.bio &&
                state.errors.bio.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Github URL</label>
            <Input 
              id='githubUrl'
              name='githubUrl'
              defaultValue={profile.githubUrl ?? ""}
              className="artistic-input"
            />
            <div id="githubUrl-error" aria-live="polite" aria-atomic="true">
              {state.errors?.githubUrl &&
                state.errors.githubUrl.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Instagram URL</label>
            <Input 
              id='instagramUrl'
              name='instagramUrl'
              defaultValue={profile.instagramUrl ?? ""}
              className="artistic-input"
            />
            <div id="instagramUrl-error" aria-live="polite" aria-atomic="true">
              {state.errors?.instagramUrl &&
                state.errors.instagramUrl.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Linkedin URL</label>
            <Input 
              id='linkedInUrl'
              name='linkedInUrl'
              defaultValue={profile.linkedInUrl ?? ""}
              className="artistic-input"
            />
            <div id="linkedInUrl-error" aria-live="polite" aria-atomic="true">
              {state.errors?.linkedInUrl &&
                state.errors.linkedInUrl.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-red-100 dark:border-red-800">
          <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white artistic-button">
            <span className="handwritten">Save Changes</span>
          </Button>
        </div>
      </div>
    </form>
  )
}

export default Profile