'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, CreditCard, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { SESSION_DURATIONS } from '@/types'

const features = [
  'Konsultasi dengan psikolog berlisensi',
  'Sesi terstruktur & terfokus',
  'Catatan sesi digital (opsional)',
  'Rekomendasi tindak lanjut',
  'Konfirmasi & pengingat otomatis',
]

export default function Pricing() {
  return (
    <section id="harga" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-brand uppercase tracking-widest mb-3 block">
            Harga
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Transparan & Terjangkau
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Investasi terbaik adalah pada kesehatan mental Anda. Pilih durasi yang sesuai dengan kebutuhan.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {SESSION_DURATIONS.map(({ duration, label, price }, i) => {
            const isPopular = duration === 90
            return (
              <motion.div
                key={duration}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border p-8 flex flex-col ${
                  isPopular
                    ? 'bg-brand text-white border-brand shadow-xl shadow-brand/20 scale-105'
                    : 'bg-card border-border'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-white text-brand text-xs font-bold px-4 py-1 rounded-full shadow-sm">
                      Paling Populer
                    </span>
                  </div>
                )}

                <h3 className={`font-semibold text-lg mb-1 ${isPopular ? 'text-white' : 'text-foreground'}`}>
                  {label}
                </h3>
                <p className={`text-sm mb-4 ${isPopular ? 'text-white/70' : 'text-muted-foreground'}`}>
                  {duration === 60 ? 'Sesi singkat & terarah' : duration === 90 ? 'Sesi standar yang mendalam' : 'Sesi intensif komprehensif'}
                </p>

                <div className="mb-6">
                  <span className={`text-4xl font-bold ${isPopular ? 'text-white' : 'text-foreground'}`}>
                    Rp {(price / 1000).toFixed(0)}K
                  </span>
                  <span className={`text-sm ml-1 ${isPopular ? 'text-white/70' : 'text-muted-foreground'}`}>
                    / sesi
                  </span>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check
                        size={14}
                        className={`mt-0.5 flex-shrink-0 ${isPopular ? 'text-white' : 'text-brand'}`}
                      />
                      <span className={isPopular ? 'text-white/80' : 'text-muted-foreground'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/booking?duration=${duration}`}
                  className={cn(
                    buttonVariants({ size: 'sm' }),
                    'justify-center rounded-xl',
                    isPopular
                      ? 'bg-white text-brand hover:bg-white/90'
                      : 'bg-brand text-white hover:bg-brand/90'
                  )}
                >
                  Pilih Sesi {label}
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Payment methods */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-4"
        >
          <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
              <CreditCard size={18} className="text-brand" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Bayar Online (Midtrans)</h4>
              <p className="text-sm text-muted-foreground">
                Transfer bank, kartu kredit/debit, GoPay, OVO, DANA, dan 20+ metode lainnya.
                Pembayaran aman dan terenkripsi.
              </p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
              <Wallet size={18} className="text-brand" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Bayar di Tempat / Setelah Sesi</h4>
              <p className="text-sm text-muted-foreground">
                Tersedia untuk sesi offline dan online. Konfirmasi booking terlebih dahulu, lakukan
                pembayaran tunai saat atau setelah sesi.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
