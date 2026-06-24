'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Wallet, Check, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PaymentMethod, SESSION_DURATIONS, SessionDuration } from '@/types'
import { getTherapistById } from '@/data/therapists'
import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'

interface BookingSummary {
  therapistId: string
  sessionMode: string
  duration: SessionDuration
  date: string
  time: string
  clientName: string
  clientEmail: string
}

interface Props {
  paymentMethod: PaymentMethod | ''
  onPaymentChange: (method: PaymentMethod) => void
  onConfirm: () => void
  isSubmitting: boolean
  summary: BookingSummary
}

export default function Step5Payment({ paymentMethod, onPaymentChange, onConfirm, isSubmitting, summary }: Props) {
  const [agreed, setAgreed] = useState(false)
  const therapist = getTherapistById(summary.therapistId)
  const price = SESSION_DURATIONS.find((s) => s.duration === summary.duration)?.price || 0

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-1">Pembayaran & Konfirmasi</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Tinjau ringkasan booking dan pilih metode pembayaran.
      </p>

      {/* Summary */}
      <div className="bg-accent/20 border border-brand/20 rounded-2xl p-5 mb-6">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Ringkasan Booking
        </p>
        <div className="space-y-2.5">
          {[
            { label: 'Terapis', value: `${therapist?.name}, ${therapist?.credentials}` },
            { label: 'Mode Sesi', value: summary.sessionMode === 'online' ? '🖥 Online' : '🏢 Offline' },
            { label: 'Durasi', value: `${summary.duration} menit` },
            {
              label: 'Tanggal',
              value: summary.date
                ? format(new Date(summary.date + 'T00:00:00'), 'EEEE, d MMMM yyyy', { locale: idLocale })
                : '-',
            },
            { label: 'Waktu', value: summary.time ? `${summary.time} WIB` : '-' },
            { label: 'Klien', value: summary.clientName },
            { label: 'Email', value: summary.clientEmail },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm gap-4">
              <span className="text-muted-foreground flex-shrink-0">{label}</span>
              <span className="text-foreground font-medium text-right">{value}</span>
            </div>
          ))}
          <div className="border-t border-border/50 pt-3 mt-1 flex justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-bold text-brand text-lg">
              Rp {price.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>

      {/* Payment method */}
      <p className="text-sm font-semibold text-foreground mb-3">Metode Pembayaran</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {[
          {
            value: 'online' as PaymentMethod,
            icon: CreditCard,
            title: 'Bayar Online',
            desc: 'Transfer bank, kartu kredit, GoPay, OVO, DANA & 20+ metode lainnya via Midtrans',
            badge: 'Direkomendasikan',
          },
          {
            value: 'offline' as PaymentMethod,
            icon: Wallet,
            title: 'Bayar Tunai',
            desc: 'Bayar langsung di klinik saat atau setelah sesi berlangsung',
          },
        ].map(({ value, icon: Icon, title, desc, badge }) => (
          <button
            key={value}
            onClick={() => onPaymentChange(value)}
            className={`relative text-left rounded-2xl border p-5 transition-all ${
              paymentMethod === value
                ? 'border-brand bg-accent/30 shadow-sm'
                : 'border-border bg-card hover:border-brand/30'
            }`}
          >
            {badge && (
              <span className="absolute -top-2 left-4 text-xs bg-brand text-white px-2 py-0.5 rounded-full">
                {badge}
              </span>
            )}
            {paymentMethod === value && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                <Check size={11} className="text-white" />
              </div>
            )}
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-3">
              <Icon size={18} className="text-brand" />
            </div>
            <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
          </button>
        ))}
      </div>

      {paymentMethod === 'online' && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl mb-5 text-xs text-blue-700"
        >
          <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
          <span>
            Anda akan diarahkan ke halaman pembayaran Midtrans yang aman. Booking dikonfirmasi
            setelah pembayaran berhasil.
          </span>
        </motion.div>
      )}

      {/* Agreement */}
      <label className="flex items-start gap-3 cursor-pointer mb-6">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 accent-brand"
        />
        <span className="text-xs text-muted-foreground">
          Saya menyetujui{' '}
          <a href="#" className="text-brand hover:underline">
            Syarat & Ketentuan
          </a>{' '}
          dan{' '}
          <a href="#" className="text-brand hover:underline">
            Kebijakan Privasi
          </a>{' '}
          Harmoni Psikologi. Saya memahami bahwa pembatalan kurang dari 24 jam sebelum sesi dapat
          dikenakan biaya administrasi.
        </span>
      </label>

      <Button
        onClick={onConfirm}
        disabled={!paymentMethod || !agreed || isSubmitting}
        className="w-full bg-brand hover:bg-brand/90 text-white rounded-2xl h-12 font-semibold"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin mr-2" />
            Memproses...
          </>
        ) : paymentMethod === 'online' ? (
          '💳 Lanjut ke Pembayaran'
        ) : (
          '✅ Konfirmasi Booking'
        )}
      </Button>
    </div>
  )
}
