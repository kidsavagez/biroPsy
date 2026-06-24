'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    initials: 'AR',
    name: 'A.R.',
    age: '28 tahun',
    specialization: 'Kecemasan',
    rating: 5,
    text: 'Saya tidak pernah menyangka akan mencoba terapi, tapi setelah beberapa sesi dengan Dr. Anisa, saya benar-benar merasakan perubahan. Panic attack saya berkurang drastis dan saya lebih bisa mengelola situasi stres.',
  },
  {
    initials: 'DM',
    name: 'D.M.',
    age: '34 tahun',
    specialization: 'Burnout Kerja',
    rating: 5,
    text: 'Eko sangat profesional dan memahami tekanan di dunia kerja. Saya datang dalam kondisi burnout parah, dan setelah 8 sesi saya kembali menemukan semangat bekerja dan keseimbangan hidup.',
  },
  {
    initials: 'RS',
    name: 'R.S.',
    age: 'Pasangan, 31 & 33 tahun',
    specialization: 'Terapi Pasangan',
    rating: 5,
    text: 'Kami hampir menyerah pada hubungan kami, tapi Dr. Citra membantu kami menemukan cara berkomunikasi yang lebih sehat. Sekarang kami bisa menyelesaikan konflik tanpa pertengkaran besar. Terima kasih!',
  },
  {
    initials: 'LK',
    name: 'L.K.',
    age: 'Ibu dari klien, 12 tahun',
    specialization: 'Terapi Anak',
    rating: 5,
    text: 'Anak saya awalnya sangat tertutup dan memiliki masalah di sekolah. Setelah beberapa bulan bersama Bu Dian, dia jauh lebih terbuka dan percaya diri. Metode play therapy-nya luar biasa!',
  },
  {
    initials: 'FP',
    name: 'F.P.',
    age: '26 tahun',
    specialization: 'Body Image',
    rating: 5,
    text: 'Bu Fitri sangat sabar dan tidak pernah menghakimi. Dia membantu saya memahami hubungan saya dengan makanan dan tubuh saya. Sekarang saya jauh lebih berdamai dengan diri sendiri.',
  },
  {
    initials: 'HW',
    name: 'H.W.',
    age: '42 tahun',
    specialization: 'Trauma',
    rating: 5,
    text: 'Pak Budi menggunakan metode EMDR yang sangat efektif untuk trauma masa kecil saya. Proses yang saya pikir akan memakan waktu bertahun-tahun ternyata bisa dilakukan dalam beberapa bulan saja.',
  },
]

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 })

  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold text-brand uppercase tracking-widest mb-3 block">
            Testimoni
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Cerita dari Klien Kami
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Identitas klien dirahasiakan sesuai kode etik. Testimoni ini dibagikan atas izin mereka.
          </p>
        </motion.div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[320px] sm:w-[360px] bg-card border border-border rounded-2xl p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold text-brand text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}, {t.age}</p>
                    <p className="text-xs text-brand">{t.specialization}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-accent hover:border-brand/30 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-accent hover:border-brand/30 transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
