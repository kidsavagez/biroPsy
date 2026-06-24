'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Star, Globe, Monitor, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { therapists } from '@/data/therapists'
import { SPECIALIZATIONS } from '@/types'

export default function Therapists() {
  const [activeFilter, setActiveFilter] = useState<string>('Semua')

  const filtered =
    activeFilter === 'Semua'
      ? therapists
      : therapists.filter((t) => t.specialization === activeFilter)

  return (
    <section id="terapis" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-semibold text-brand uppercase tracking-widest mb-3 block">
            Tim Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Kenali Para Psikolog Kami
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Setiap psikolog kami telah tersertifikasi dan berpengalaman dalam bidangnya masing-masing.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {SPECIALIZATIONS.map((spec) => (
            <button
              key={spec}
              onClick={() => setActiveFilter(spec)}
              className={`text-xs font-medium px-4 py-2 rounded-full border transition-all ${
                activeFilter === spec
                  ? 'bg-brand text-white border-brand shadow-sm'
                  : 'bg-card text-muted-foreground border-border hover:border-brand/50 hover:text-foreground'
              }`}
            >
              {spec}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((therapist) => (
              <motion.div
                key={therapist.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25 }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-brand/20 transition-all group"
              >
                {/* Photo */}
                <div className="relative h-48 bg-accent/30 flex items-center justify-center overflow-hidden">
                  <img
                    src={therapist.photo}
                    alt={therapist.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.parentElement!.innerHTML = `<div class="w-20 h-20 rounded-full bg-brand/20 flex items-center justify-center text-3xl font-bold text-brand">${therapist.name.charAt(0)}</div>`
                    }}
                  />
                  {/* Mode badges */}
                  <div className="absolute top-3 right-3 flex gap-1">
                    {therapist.sessionModes.includes('online') && (
                      <span className="bg-white/90 backdrop-blur rounded-full px-2 py-0.5 text-xs flex items-center gap-1 text-foreground">
                        <Monitor size={10} /> Online
                      </span>
                    )}
                    {therapist.sessionModes.includes('offline') && (
                      <span className="bg-white/90 backdrop-blur rounded-full px-2 py-0.5 text-xs flex items-center gap-1 text-foreground">
                        <MapPin size={10} /> Offline
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-semibold text-foreground text-sm leading-tight">{therapist.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{therapist.credentials}</p>
                  <p className="text-xs text-brand font-medium mt-1">{therapist.specialization}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {therapist.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs rounded-full font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span className="font-medium text-foreground">{therapist.rating}</span>
                      <span>({therapist.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Globe size={10} />
                      {therapist.languages[0]}
                    </div>
                  </div>

                  <Link
                    href={`/booking?therapist=${therapist.id}`}
                    className={cn(
                      buttonVariants({ size: 'sm' }),
                      'w-full mt-3 bg-brand hover:bg-brand/90 text-white rounded-xl text-xs justify-center'
                    )}
                  >
                    Buat Janji
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
