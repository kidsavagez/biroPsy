'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'

const info = [
  {
    icon: MapPin,
    label: 'Alamat',
    value: 'Jl. Sudirman No. 88, Karet Tengsin,\nJakarta Selatan 12920',
  },
  {
    icon: Phone,
    label: 'Telepon',
    value: '+62 21-1234-5678',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@harmonipsikologi.com',
  },
  {
    icon: Clock,
    label: 'Jam Operasional',
    value: 'Senin – Sabtu: 08.00 – 20.00 WIB\nMinggu: 09.00 – 16.00 WIB',
  },
]

export default function Contact() {
  return (
    <section id="kontak" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-brand uppercase tracking-widest mb-3 block">
            Kontak
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Hubungi Kami
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Punya pertanyaan atau membutuhkan bantuan? Tim kami siap membantu Anda.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {info.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 bg-card border border-border rounded-2xl p-5"
              >
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-brand" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {label}
                  </p>
                  <p className="text-sm text-foreground whitespace-pre-line">{value}</p>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/6281234567890?text=Halo%20Harmoni%20Psikologi%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20Anda."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white rounded-2xl px-6 py-4 hover:bg-[#20BC5B] transition-colors"
            >
              <MessageCircle size={20} />
              <span className="font-medium">Chat via WhatsApp</span>
              <span className="ml-auto text-white/70 text-sm">→</span>
            </a>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl overflow-hidden border border-border h-80 bg-accent/20 flex items-center justify-center relative">
              {/* Google Maps embed placeholder */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMzEuNyJTIDEwNsKwNDknMTAuMiJF!5e0!3m2!1sen!2sid!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Harmoni Psikologi"
              />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              📍 Harmoni Psikologi · Jl. Sudirman No. 88, Jakarta Selatan
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
