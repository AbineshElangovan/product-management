import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Product Dashboard",
  description: "Next.js + Zustand CRUD",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">
            {children}
          </main>
         
         
          <footer className="border-t border-slate-200 bg-slate-50 py-8">
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <h3 className="font-semibold text-slate-900">Contact Us</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Email: <a href="mailto:info@productmanager.com" className="text-slate-900 hover:underline">info@productmanager.com</a>
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Phone: <a href="tel:+91-1234-567-890" className="text-slate-900 hover:underline">+91-1234-567-890</a>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Address</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    123 YS Innovations, Coimbatore<br />
                    Tamilnadu, India 631100
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Hours</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
              <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-600">
            
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}