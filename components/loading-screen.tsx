"use client"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-950 book-texture overflow-hidden flex items-center justify-center animate-fadeOut">
      {/* Main Loading Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Central Mandala Loader */}
        <div className="relative mb-12">
          <div className="w-32 h-32 relative animate-spin-slow">
            <BurmeseMandala className="w-full h-full text-red-500 dark:text-red-400" />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-6xl font-serif text-red-900 dark:text-red-100 mb-4 handwritten-title">
            မင်္ဂလာပါ
          </h1>
          <p className="text-xl text-red-700 dark:text-red-300 story-text">
            Welcome to my digital sanctuary
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex space-x-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 bg-red-500 dark:bg-red-400 rounded-full animate-pulse delay-[${i * 200}ms]`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Burmese Mandala SVG Component
const BurmeseMandala = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="64" cy="64" r="60" />
    <circle cx="64" cy="64" r="45" />
    <circle cx="64" cy="64" r="30" />
    <circle cx="64" cy="64" r="15" />

    {/* Petals */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = i * 45 * (Math.PI / 180)
      const x1 = 64 + Math.cos(angle) * 15
      const y1 = 64 + Math.sin(angle) * 15
      const x2 = 64 + Math.cos(angle) * 60
      const y2 = 64 + Math.sin(angle) * 60
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
    })}

    {/* Inner petals */}
    {Array.from({ length: 16 }).map((_, i) => {
      const angle = i * 22.5 * (Math.PI / 180)
      const x1 = 64 + Math.cos(angle) * 30
      const y1 = 64 + Math.sin(angle) * 30
      const x2 = 64 + Math.cos(angle) * 45
      const y2 = 64 + Math.sin(angle) * 45
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} opacity="0.6" />
    })}
  </svg>
)
