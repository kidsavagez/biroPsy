import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Harmoni Psikologi — Layanan Psikologi & Konsultasi Mental',
  description:
    'Platform konsultasi psikologi terpercaya dengan 7 psikolog berpengalaman. Booking sesi online & offline mudah, aman, dan rahasia.',
  keywords: ['psikologi', 'konsultasi mental', 'terapis', 'Jakarta', 'booking psikolog'],
  openGraph: {
    title: 'Harmoni Psikologi',
    description: 'Perjalanan Menuju Kesehatan Mental Anda Dimulai di Sini',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
