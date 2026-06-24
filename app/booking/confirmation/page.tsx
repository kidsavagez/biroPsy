import Link from 'next/link'
import { CheckCircle, Calendar, Clock, User, CreditCard, MapPin, Monitor, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { getTherapistById } from '@/data/therapists'
import { PRICING, SessionDuration, PaymentMethod } from '@/types'
import { getGoogleCalendarLink } from '@/lib/calendar'
import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'

export const metadata = {
  title: 'Booking Dikonfirmasi — Harmoni Psikologi',
}

interface Props {
  searchParams: Promise<{ id?: string; order_id?: string; transaction_status?: string }>
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const params = await searchParams
  const bookingId = params.id || params.order_id || 'HP-DEMO-001'
  const isPaid = params.transaction_status === 'settlement' || params.transaction_status === 'capture'

  // Demo data for pitch purposes (in production, fetch from Google Sheets)
  const demoBooking = {
    id: bookingId,
    therapistId: 'anisa-putri',
    sessionMode: 'online' as const,
    duration: 90 as SessionDuration,
    date: '2025-08-15',
    time: '10:00',
    clientName: 'Nama Klien',
    clientEmail: 'klien@email.com',
    clientPhone: '081234567890',
    clientWhatsapp: '081234567890',
    reason: '',
    notes: '',
    paymentMethod: 'online' as PaymentMethod,
    status: isPaid ? ('paid' as const) : ('confirmed' as const),
    price: PRICING[90],
    createdAt: new Date().toISOString(),
  }

  const therapist = getTherapistById(demoBooking.therapistId)
  const calendarLink = therapist
    ? getGoogleCalendarLink(demoBooking, therapist)
    : '#'

  const sessionDate = demoBooking.date
    ? format(new Date(demoBooking.date + 'T00:00:00'), 'EEEE, d MMMM yyyy', { locale: idLocale })
    : '-'

  const details = [
    { icon: User, label: 'Terapis', value: `${therapist?.name}, ${therapist?.credentials}` },
    { icon: Calendar, label: 'Tanggal', value: sessionDate },
    { icon: Clock, label: 'Waktu', value: `${demoBooking.time} WIB (${demoBooking.duration} menit)` },
    {
      icon: demoBooking.sessionMode === 'online' ? Monitor : MapPin,
      label: 'Mode',
      value:
        demoBooking.sessionMode === 'online'
          ? 'Online (link dikirim via email)'
          : 'Offline — Jl. Sudirman No. 88, Jakarta Selatan',
    },
    {
      icon: CreditCard,
      label: 'Pembayaran',
      value:
        demoBooking.paymentMethod === 'online'
          ? isPaid
            ? `✅ Lunas — Rp ${demoBooking.price.toLocaleString('id-ID')}`
            : `⏳ Menunggu — Rp ${demoBooking.price.toLocaleString('id-ID')}`
          : `💵 Bayar tunai saat sesi — Rp ${demoBooking.price.toLocaleString('id-ID')}`,
    },
  ]

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
              <span className="text-white text-xs font-bold">H</span>
            </div>
            <span className="font-semibold text-sm text-foreground">
              Harmoni <span className="text-brand">Psikologi</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="min-h-screen bg-muted/30 pt-24 pb-12 px-4">
        <div className="max-w-lg mx-auto">
          {/* Success header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-brand" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Booking Berhasil!</h1>
            <p className="text-muted-foreground text-sm">
              Konfirmasi telah dikirim ke email Anda.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 bg-accent/50 border border-brand/20 rounded-full px-4 py-1.5">
              <span className="text-xs text-muted-foreground">ID Booking:</span>
              <span className="text-xs font-mono font-bold text-brand">{bookingId}</span>
            </div>
          </div>

          {/* Details card */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-5">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-brand" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add to calendar */}
          <a
            href={calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-card border border-border rounded-2xl py-4 text-sm font-medium text-foreground hover:bg-accent/30 hover:border-brand/30 transition-colors mb-3"
          >
            <Calendar size={16} className="text-brand" />
            Tambah ke Google Calendar
            <ExternalLink size={12} className="text-muted-foreground" />
          </a>

          {/* Next steps */}
          <div className="bg-accent/20 border border-brand/20 rounded-2xl p-5 mb-5">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
              Langkah Selanjutnya
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-brand font-bold">1.</span>
                Cek email Anda untuk konfirmasi dan file kalender (.ics)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand font-bold">2.</span>
                {demoBooking.sessionMode === 'online'
                  ? 'Link Zoom/Meet akan dikirim via email 1 jam sebelum sesi'
                  : 'Datang ke klinik 10 menit sebelum jadwal'}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand font-bold">3.</span>
                {demoBooking.paymentMethod === 'offline'
                  ? 'Siapkan pembayaran tunai sebesar Rp ' + demoBooking.price.toLocaleString('id-ID')
                  : 'Pembayaran telah selesai — Anda siap untuk sesi!'}
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'outline' }), 'flex-1 rounded-xl border-border justify-center')}
            >
              Hubungi Kami
            </a>
            <Link
              href="/"
              className={cn(buttonVariants(), 'flex-1 rounded-xl bg-brand hover:bg-brand/90 text-white justify-center')}
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
