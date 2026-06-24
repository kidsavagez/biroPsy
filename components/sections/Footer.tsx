import Link from 'next/link'

const links = {
  Layanan: [
    { label: 'Kecemasan & Depresi', href: '#layanan' },
    { label: 'Trauma & PTSD', href: '#layanan' },
    { label: 'Pasangan & Hubungan', href: '#layanan' },
    { label: 'Anak & Remaja', href: '#layanan' },
    { label: 'Stres Kerja', href: '#layanan' },
  ],
  Perusahaan: [
    { label: 'Tentang Kami', href: '#tentang' },
    { label: 'Tim Terapis', href: '#terapis' },
    { label: 'Harga', href: '#harga' },
    { label: 'FAQ', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Lainnya: [
    { label: 'Syarat & Ketentuan', href: '#' },
    { label: 'Kebijakan Privasi', href: '#' },
    { label: 'Kode Etik', href: '#' },
    { label: 'Karier', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                <span className="text-white text-sm font-bold">H</span>
              </div>
              <span className="font-semibold text-background text-sm">Harmoni Psikologi</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs text-background/60">
              Perjalanan menuju kesehatan mental Anda dimulai di sini. Layanan psikologi profesional,
              terpercaya, dan penuh kasih.
            </p>
            <div className="flex gap-3">
              {['IG', 'TW', 'YT', 'TK'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center text-xs text-background/70 hover:bg-background/20 transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-background uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-background/60 hover:text-background transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            © 2025 Harmoni Psikologi. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-background/40">Darurat Kesehatan Jiwa:</span>
            <a href="tel:119" className="text-xs font-semibold text-brand-light hover:underline">
              119 ext 8
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
