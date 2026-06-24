'use client'

import { motion } from 'framer-motion'
import { Heart, Eye, Lightbulb, ShieldCheck } from 'lucide-react'

const values = [
  { icon: Heart, title: 'Empati', desc: 'Setiap klien diperlakukan dengan penuh rasa hormat, kasih sayang, dan pemahaman mendalam.' },
  { icon: ShieldCheck, title: 'Kerahasiaan', desc: 'Semua informasi dan percakapan dijaga kerahasiaannya secara ketat sesuai kode etik profesi.' },
  { icon: Eye, title: 'Transparansi', desc: 'Kami terbuka tentang metode terapi, proses, dan ekspektasi yang realistis bagi setiap klien.' },
  { icon: Lightbulb, title: 'Berbasis Bukti', desc: 'Seluruh pendekatan terapi kami berlandaskan penelitian ilmiah yang terbukti efektif.' },
]

export default function About() {
  return (
    <section id="tentang" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="text-xs font-semibold text-brand uppercase tracking-widest mb-3 block">
              Tentang Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
              Tempat Aman untuk{' '}
              <span className="text-gradient">Tumbuh dan Pulih</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Harmoni Psikologi didirikan pada 2022 oleh sekelompok psikolog klinis yang percaya bahwa
              kesehatan mental adalah hak semua orang, bukan kemewahan. Kami hadir untuk meruntuhkan
              stigma dan membuat layanan psikologi lebih mudah diakses.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Dengan 7 psikolog berpengalaman yang memiliki spesialisasi beragam, kami siap mendampingi
              Anda melalui berbagai tantangan kehidupan — dari kecemasan sehari-hari hingga trauma yang
              mendalam.
            </p>

            <div className="flex flex-wrap gap-3">
              {['Psikolog Berlisensi', 'HIMPSI Terdaftar', 'Privasi Terjamin', 'Sesi Fleksibel'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium bg-accent text-accent-foreground px-3 py-1.5 rounded-full"
                  >
                    ✓ {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Values grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-3">
                  <Icon size={18} className="text-brand" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
