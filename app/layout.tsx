import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Navbar } from "@/components/Navbar"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stock Hub | 4K Product CRUD Dashboard",
  description: "Innovative 4K Product Management Platform built with Shadcn & Radix UI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
          
          <footer className="mt-auto border-t border-stone-200/80 bg-white/70 backdrop-blur-md py-8 text-slate-800">
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid gap-8 md:grid-cols-3 text-slate-700">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Product Stock Hub</h3>
                  <p className="mt-2 text-xs text-slate-600 font-medium">
                    Innovative CRUD operations platform with eye-soothing 4K light studio background themes and Shadcn UI components.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Quick Contacts</h3>
                  <p className="mt-2 text-xs text-slate-600 font-medium">
                    Support: <a href="mailto:info@productmanager.com" className="text-purple-700 hover:underline font-bold">info@productmanager.com</a><br />
                    Phone: <span className="text-slate-800 font-bold">+91-1234-567-890</span>
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Hub Location</h3>
                  <p className="mt-2 text-xs text-slate-600 font-medium">
                    123 YS Innovations, Coimbatore<br />
                    Tamilnadu, India 631100
                  </p>
                </div>
              </div>
              <div className="mt-8 border-t border-stone-200 pt-4 text-center text-xs text-slate-500 font-semibold">
                © {new Date().getFullYear()} Stock Hub. Powered by Next.js & Radix UI.
              </div>
            </div>
          </footer>
          <Toaster position="top-right" theme="light" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}