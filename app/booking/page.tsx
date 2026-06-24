import { Suspense } from 'react'
import Link from 'next/link'
import BookingWizard from '@/components/booking/BookingWizard'

export const metadata = {
  title: 'Buat Janji — Harmoni Psikologi',
  description: 'Buat janji sesi terapi dengan psikolog pilihan Anda.',
}

export default function BookingPage() {
  return (
    <>
      {/* Minimal nav */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
              <span className="text-white text-xs font-bold">H</span>
            </div>
            <span className="font-semibold text-sm text-foreground">
              Harmoni <span className="text-brand">Psikologi</span>
            </span>
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Kembali ke Beranda
          </Link>
        </div>
      </header>

      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-brand border-t-transparent rounded-full" />
        </div>
      }>
        <BookingWizard />
      </Suspense>
    </>
  )
}
