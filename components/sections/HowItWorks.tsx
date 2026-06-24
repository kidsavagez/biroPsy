'use client'

import { motion } from 'framer-motion'
import { UserCheck, CalendarCheck, Video } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: UserCheck,
    title: 'Pilih Terapis',
    desc: 'Temukan psikolog yang paling sesuai dengan kebutuhan Anda dari 7 spesialis kami. Filter berdasarkan spesialisasi, bahasa, atau mode sesi.',
  },
  {
    step: '02',
    icon: CalendarCheck,
    title: 'Pilih Jadwal',
    desc: 'Tentukan tanggal dan waktu yang paling nyaman. Pilih durasi sesi (60, 90, atau 120 menit) dan mode pertemuan (online atau offline).',
  },
  {
    step: '03',
    icon: Video,
    title: 'Mulai Sesi',
    desc: 'Konfirmasi booking Anda dan lakukan pembayaran. Anda akan menerima konfirmasi email beserta link kalender dan detail sesi.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-brand uppercase tracking-widest mb-3 block">
            Cara Kerja
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Tiga Langkah Mudah
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Memulai perjalanan kesehatan mental Anda semudah itu. Tidak perlu antre, tidak perlu repot.
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-border" />

          {steps.map(({ step, icon: Icon, title, desc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center">
                  <Icon size={28} className="text-brand" />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
