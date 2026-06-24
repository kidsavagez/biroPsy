'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Star, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  return (
    <section id="beranda" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="dot-pattern absolute inset-0 opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <motion.div initial="hidden" animate="show" className="text-center lg:text-left">
          <motion.div variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-brand bg-accent px-3 py-1.5 rounded-full mb-6">
              <Shield size={12} />
              Terpercaya · Profesional · Rahasia
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground mb-6"
          >
            Mulai Perjalanan{' '}
            <span className="text-gradient">Kesehatan Mental</span>{' '}
            Anda
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
          >
            Kami hadir dengan 7 psikolog berpengalaman, siap mendampingi Anda melalui sesi konsultasi
            yang personal, aman, dan sepenuhnya rahasia — secara online maupun offline.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
          >
            <Link
              href="/booking"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-brand hover:bg-brand/90 text-white rounded-full px-8 shadow-lg shadow-brand/25'
              )}
            >
              Buat Janji Sekarang <ArrowRight size={16} className="ml-2" />
            </Link>
            <a
              href="#terapis"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'rounded-full px-8 border-border hover:bg-accent'
              )}
            >
              Kenali Terapis Kami
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="flex flex-wrap gap-4 justify-center lg:justify-start mt-10"
          >
            {[
              { icon: Users, text: '500+ Klien Terbantu' },
              { icon: Star, text: '4.8 Rating Rata-rata' },
              { icon: Shield, text: 'Terlisensi & Terverifikasi' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon size={14} className="text-brand" />
                {text}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="hidden lg:block"
        >
          <div className="relative">
            {/* Main card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-2xl">
                  🧠
                </div>
                <div>
                  <p className="font-semibold text-foreground">Sesi Terapi Hari Ini</p>
                  <p className="text-sm text-muted-foreground">Senin, 10:00 WIB</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { emoji: '😰', text: 'Mengelola Kecemasan', done: true },
                  { emoji: '💪', text: 'Membangun Resiliensi', done: true },
                  { emoji: '🌱', text: 'Pertumbuhan Pribadi', done: false },
                ].map(({ emoji, text, done }) => (
                  <div
                    key={text}
                    className={`flex items-center gap-3 p-3 rounded-xl text-sm ${
                      done ? 'bg-accent/60 text-accent-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <span>{emoji}</span>
                    <span className={done ? 'line-through opacity-60' : ''}>{text}</span>
                    {done && <span className="ml-auto text-brand">✓</span>}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Progress minggu ini</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`w-5 h-1.5 rounded-full ${i <= 3 ? 'bg-brand' : 'bg-muted'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-4 border border-border/50 text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">⭐</span>
                <div>
                  <p className="font-semibold text-foreground">4.9/5</p>
                  <p className="text-xs text-muted-foreground">127 ulasan</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-lg p-4 border border-border/50 text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🔒</span>
                <p className="font-medium text-foreground text-xs">100% Rahasia</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-border rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-muted-foreground rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
