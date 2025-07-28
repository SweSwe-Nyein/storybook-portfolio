import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { PasswordState, updatePassword } from '@/lib/actions/profileAction';
import { ProfileData } from '@/types/profile';
import React, { useActionState } from 'react'

const Security = ({profile}: {profile: ProfileData}) => {
  const initialState: PasswordState = { message: null, errors: {} };
  const updatePasswordWithId = updatePassword.bind(null, profile.id);
  const [state, formAction] = useActionState(updatePasswordWithId, initialState);
  
  return (
    <form action={formAction}>
      <div className="space-y-6">
        <div>
          <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Current Password</label>
          <Input
            id='currentPassword'
            name='currentPassword'
            type="password" 
            className="artistic-input"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.currentPassword &&
              state.errors.currentPassword.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">New Password</label>
          <Input 
            id='password'
            name='password'
            type="password" 
            className="artistic-input"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-red-700 dark:text-red-300 mb-2 handwritten">Confirm New Password</label>
          <Input 
            id='confirmPassword'
            name='confirmPassword'
            type="password" 
            className="artistic-input"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.confirmPassword &&
              state.errors.confirmPassword.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-red-100 dark:border-red-800">
          <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white artistic-button">
            <span className="handwritten">Update Password</span>
          </Button>
        </div>
      </div>
    </form>
  )
}

export default Security