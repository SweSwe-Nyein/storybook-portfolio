"use client"

export default function AuthErrorPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
      <p className="mt-4 text-gray-700">
        {searchParams.error
          ? `Error: ${searchParams.error}`
          : "An unknown error occurred during authentication."}
      </p>
    </div>
  );
}