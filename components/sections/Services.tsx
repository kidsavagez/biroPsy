'use client'

import { motion } from 'framer-motion'

const services = [
  { emoji: '😰', title: 'Kecemasan & Depresi', desc: 'CBT dan teknik mindfulness untuk mengelola kecemasan, depresi, dan gangguan mood.' },
  { emoji: '💔', title: 'Trauma & PTSD', desc: 'EMDR dan trauma-focused therapy untuk pemulihan dari pengalaman traumatis.' },
  { emoji: '💑', title: 'Pasangan & Hubungan', desc: 'Terapi pasangan untuk memperkuat komunikasi dan menyelesaikan konflik secara sehat.' },
  { emoji: '🧒', title: 'Anak & Remaja', desc: 'Play therapy dan art therapy dalam pendekatan ramah anak untuk tumbuh kembang optimal.' },
  { emoji: '💼', title: 'Stres Kerja & Burnout', desc: 'Strategi praktis untuk mengatasi tekanan profesional dan menemukan keseimbangan hidup.' },
  { emoji: '🌸', title: 'Citra Diri & Gangguan Makan', desc: 'Pendekatan holistik menuju body acceptance dan hubungan yang sehat dengan makanan.' },
  { emoji: '👨‍👩‍👧', title: 'Terapi Keluarga', desc: 'Sesi bersama untuk membangun dinamika keluarga yang lebih harmonis dan penuh kasih.' },
]

export default function Services() {
  return (
    <section id="layanan" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-brand uppercase tracking-widest mb-3 block">
            Layanan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Spesialisasi yang Kami Tawarkan
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Setiap perjalanan adalah unik. Kami menyediakan berbagai layanan untuk memenuhi kebutuhan
            kesehatan mental Anda yang beragam.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map(({ emoji, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-brand/30 transition-all cursor-default"
            >
              <span className="text-3xl mb-4 block">{emoji}</span>
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-brand transition-colors">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: services.length * 0.07 }}
            className="bg-brand rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <span className="text-3xl mb-4 block">✨</span>
              <h3 className="font-semibold text-white mb-2">Tidak Yakin?</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Konsultasi gratis 15 menit untuk menemukan layanan yang tepat untuk Anda.
              </p>
            </div>
            <a
              href="/booking"
              className="mt-4 inline-block text-sm font-semibold text-white border border-white/30 rounded-xl px-4 py-2 hover:bg-white/10 transition-colors text-center"
            >
              Mulai Sekarang →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
