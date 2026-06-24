'use client'

import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const stats = [
  { value: 500, suffix: '+', label: 'Klien Terbantu', emoji: '🤝' },
  { value: 7, suffix: '', label: 'Psikolog Spesialis', emoji: '🧠' },
  { value: 3, suffix: ' Tahun', label: 'Berpengalaman', emoji: '🏆' },
  { value: 98, suffix: '%', label: 'Tingkat Kepuasan', emoji: '⭐' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1500
    const step = Math.ceil(value / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative py-12 bg-brand">
      {/* subtle wave top */}
      <div className="absolute -top-px left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1200 30" className="w-full fill-background">
          <path d="M0,0 C300,30 900,30 1200,0 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, suffix, label, emoji }) => (
            <div key={label} className="text-center">
              <div className="text-3xl mb-2">{emoji}</div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <Counter value={value} suffix={suffix} />
              </div>
              <p className="text-sm text-white/70">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* subtle wave bottom */}
      <div className="absolute -bottom-px left-0 right-0 overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1200 30" className="w-full fill-background">
          <path d="M0,0 C300,30 900,30 1200,0 L1200,0 L0,0 Z" />
        </svg>
      </div>
    </section>
  )
}
