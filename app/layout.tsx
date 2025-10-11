"use client"
import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Suspense } from "react"
import { FavoritesProvider } from "@/context/favorites-context"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// export const metadata: Metadata = {
//   title: "Discover Jharkhand - Eco & Cultural Tourism",
//   description:
//     "Explore the natural beauty, rich culture, and eco-tourism opportunities of Jharkhand, India. Plan your sustainable adventure today.",
//   generator: "v0.app",
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning={true} >
        <FavoritesProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation />
            {children}
          </Suspense>
        </FavoritesProvider>
        <Analytics />
      </body>
    </html>
  )
}
