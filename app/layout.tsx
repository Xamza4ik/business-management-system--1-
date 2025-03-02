import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { SideNav } from "@/components/side-nav"
import { TopNav } from "@/components/top-nav"
import { Providers } from "./providers"
import { Toaster } from "@/components/toaster"
import { CustomerProvider } from "@/lib/customer-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Biznes Boshqaruv Tizimi",
  description: "Biznes boshqaruv va hisobot tizimi",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <CustomerProvider>
            <div className="flex min-h-screen flex-col">
              <TopNav />
              <div className="flex flex-1">
                <SideNav />
                {children}
              </div>
            </div>
            <Toaster />
          </CustomerProvider>
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'