'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Globe, Monitor, MapPin, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { therapists } from '@/data/therapists'
import { SPECIALIZATIONS, Therapist } from '@/types'

interface Props {
  value: string
  onChange: (id: string) => void
}

export default function Step1Therapist({ value, onChange }: Props) {
  const [filter, setFilter] = useState('Semua')

  const filtered =
    filter === 'Semua' ? therapists : therapists.filter((t) => t.specialization === filter)

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-1">Pilih Terapis</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Temukan psikolog yang paling sesuai dengan kebutuhan Anda.
      </p>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SPECIALIZATIONS.map((spec) => (
          <button
            key={spec}
            onClick={() => setFilter(spec)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              filter === spec
                ? 'bg-brand text-white border-brand'
                : 'border-border text-muted-foreground hover:border-brand/40 hover:text-foreground'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((t) => (
            <motion.button
              key={t.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => onChange(t.id)}
              className={`text-left rounded-2xl border p-4 transition-all relative ${
                value === t.id
                  ? 'border-brand bg-accent/30 shadow-sm'
                  : 'border-border bg-card hover:border-brand/30 hover:bg-accent/10'
              }`}
            >
              {value === t.id && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                  <Check size={11} className="text-white" />
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl bg-accent/50 overflow-hidden flex-shrink-0">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement
                      el.style.display = 'none'
                      el.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-xl font-bold text-brand">${t.name.charAt(0)}</div>`
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-foreground leading-tight">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.credentials}</p>
                  <p className="text-xs text-brand font-medium mt-0.5">{t.specialization}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  <span className="font-medium text-foreground">{t.rating}</span>
                  <span>({t.reviewCount})</span>
                </div>
                <div className="flex gap-1">
                  {t.sessionModes.includes('online') && (
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Monitor size={9} /> Online
                    </span>
                  )}
                  {t.sessionModes.includes('offline') && (
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full flex items-center gap-1">
                      <MapPin size={9} /> Offline
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {t.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs rounded-full font-normal py-0">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-2">
                {t.experience} tahun pengalaman · {t.languages.join(', ')}
              </p>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
