import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Quattrocento, Yeseva_One } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { ToastProvider } from "@/components/ui/toast-context"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
})

const yeseva = Yeseva_One({
  subsets: ["latin"],
  variable: "--font-yeseva",
  display: "swap",
  weight: ["400"],
})

const quattrocento = Quattrocento({
  subsets: ["latin"],
  variable: "--font-quattrocento",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal"],
})

export const metadata: Metadata = {
  title: "Swe | Frontend Developer & Storyteller",
  description: "An portfolio showcasing frontend development work with traditional Burmese aesthetic and storytelling design.",
  icons: {
    icon: '/favicon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${quattrocento.variable} ${yeseva.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-serif antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
