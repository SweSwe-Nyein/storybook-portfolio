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
  title: "Artistic Portfolio | Frontend Developer & Storyteller",
  description:
    "An artistic portfolio showcasing frontend development work with traditional Burmese aesthetic and storytelling design.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${quattrocento.variable} ${yeseva.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-serif antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
