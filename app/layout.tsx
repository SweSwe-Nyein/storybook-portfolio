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
  title: "Swe Nyein | Frontend Developer",
  description: "Portfolio of Swe Nyein, a frontend developer passionate about clean design and fullstack integrations.",
  openGraph: {
    title: "Swe Nyein | Frontend Developer",
    description: "Explore my portfolio, projects, and work experience as a modern frontend developer.",
    url: "https://www.swenyein.dev",
    siteName: "Swe Nyein Portfolio",
    images: [
      {
        url: "https://www.swenyein.dev/og.png", // You need to host this image
        width: 1200,
        height: 630,
        alt: "Swe Nyein Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swe Nyein | Frontend Developer",
    description: "Explore my portfolio, projects, and work experience.",
    images: ["https://www.swenyein.dev/og.png"],
  },
};

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
