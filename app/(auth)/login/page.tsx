import { LoginForm } from '@/components/auth/login-form'
import React, { Suspense} from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-950 flex items-center justify-center p-4 book-texture">
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}

export default page