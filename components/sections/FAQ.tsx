'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'Apakah sesi terapi benar-benar rahasia?',
    a: 'Ya, 100%. Seluruh informasi dan percakapan dalam sesi terapi dijaga kerahasiaannya secara ketat sesuai kode etik profesi psikolog dan peraturan perundang-undangan yang berlaku. Tidak ada informasi Anda yang akan dibagikan tanpa persetujuan Anda.',
  },
  {
    q: 'Bagaimana cara memilih terapis yang tepat?',
    a: 'Anda bisa melihat profil, spesialisasi, dan pendekatan terapi masing-masing psikolog di halaman "Terapis Kami". Jika masih ragu, Anda bisa memilih sesi konsultasi gratis 15 menit untuk menemukan yang paling cocok. Perpindahan terapis juga sangat mudah jika dirasa kurang cocok.',
  },
  {
    q: 'Apa perbedaan sesi online dan offline?',
    a: 'Sesi online dilakukan melalui video call (Zoom/Google Meet) sehingga Anda bisa mengikuti dari mana saja. Sesi offline dilakukan langsung di klinik kami di Jakarta Selatan. Efektivitas kedua metode ini telah terbukti setara dalam berbagai penelitian.',
  },
  {
    q: 'Berapa sesi yang saya butuhkan?',
    a: 'Ini sangat bergantung pada jenis dan tingkat permasalahan Anda. Untuk isu ringan, 4-6 sesi sudah cukup efektif. Untuk kondisi yang lebih kompleks seperti trauma atau depresi berat, bisa memerlukan 12-20+ sesi. Psikolog Anda akan memberikan rekomendasi setelah sesi pertama.',
  },
  {
    q: 'Apakah saya bisa membatalkan atau menjadwal ulang?',
    a: 'Ya, Anda bisa membatalkan atau menjadwal ulang sesi maksimal 24 jam sebelum jadwal. Pembatalan kurang dari 24 jam dapat dikenakan biaya administrasi sebesar 50% dari harga sesi.',
  },
  {
    q: 'Apakah Anda menerima BPJS atau asuransi?',
    a: 'Saat ini kami belum bekerja sama dengan BPJS. Namun beberapa asuransi swasta mungkin menanggung biaya konsultasi psikologi. Kami menyediakan nota/invoice resmi untuk keperluan klaim asuransi.',
  },
  {
    q: 'Bagaimana jika kondisi saya darurat?',
    a: 'Jika Anda mengalami krisis mental atau darurat (termasuk pikiran untuk menyakiti diri sendiri), segera hubungi hotline kesehatan jiwa di 119 ext 8 atau Into The Light Indonesia di 119. Kami bukan layanan darurat, namun kami selalu mendukung Anda untuk mendapatkan pertolongan yang tepat.',
  },
]

export default function FAQ() {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold text-brand uppercase tracking-widest mb-3 block">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Pertanyaan Umum
          </h2>
          <p className="text-muted-foreground">
            Tidak menemukan jawaban yang Anda cari?{' '}
            <a href="#kontak" className="text-brand hover:underline">
              Hubungi kami
            </a>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-brand/30"
              >
                <AccordionTrigger className="text-left font-medium text-foreground text-sm py-5 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
