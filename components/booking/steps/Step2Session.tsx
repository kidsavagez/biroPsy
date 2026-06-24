'use client'

import { motion } from 'framer-motion'
import { Monitor, MapPin, Check } from 'lucide-react'
import { SessionMode, SessionDuration, SESSION_DURATIONS } from '@/types'
import { getTherapistById } from '@/data/therapists'

interface Props {
  therapistId: string
  mode: SessionMode | ''
  duration: SessionDuration | 0
  onModeChange: (mode: SessionMode) => void
  onDurationChange: (duration: SessionDuration) => void
}

export default function Step2Session({ therapistId, mode, duration, onModeChange, onDurationChange }: Props) {
  const therapist = getTherapistById(therapistId)

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-1">Mode & Durasi Sesi</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Pilih cara bertemu dan durasi sesi yang paling nyaman untuk Anda.
      </p>

      {/* Session Mode */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-foreground mb-3">Mode Sesi</p>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              { value: 'online' as SessionMode, label: 'Online', icon: Monitor, desc: 'Video call via Zoom/Google Meet' },
              { value: 'offline' as SessionMode, label: 'Offline', icon: MapPin, desc: 'Tatap muka di klinik kami' },
            ] as const
          )
            .filter(({ value }) => !therapist || therapist.sessionModes.includes(value))
            .map(({ value, label, icon: Icon, desc }) => (
              <button
                key={value}
                onClick={() => onModeChange(value)}
                className={`relative text-left rounded-2xl border p-5 transition-all ${
                  mode === value
                    ? 'border-brand bg-accent/30 shadow-sm'
                    : 'border-border bg-card hover:border-brand/30'
                }`}
              >
                {mode === value && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                    <Check size={11} className="text-white" />
                  </div>
                )}
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-3">
                  <Icon size={18} className="text-brand" />
                </div>
                <p className="font-semibold text-foreground text-sm mb-1">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
                {value === 'offline' && (
                  <p className="text-xs text-muted-foreground mt-1">
                    📍 Jl. Sudirman No. 88, Jakarta Selatan
                  </p>
                )}
              </button>
            ))}
        </div>
        {therapist && therapist.sessionModes.length === 1 && (
          <p className="text-xs text-muted-foreground mt-2">
            ℹ️ {therapist.name} hanya tersedia untuk sesi {therapist.sessionModes[0] === 'online' ? 'online' : 'offline'}.
          </p>
        )}
      </div>

      {/* Duration */}
      <div>
        <p className="text-sm font-semibold text-foreground mb-3">Durasi Sesi</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SESSION_DURATIONS.map(({ duration: d, label, price }) => {
            const isPopular = d === 90
            return (
              <button
                key={d}
                onClick={() => onDurationChange(d)}
                className={`relative text-left rounded-2xl border p-5 transition-all ${
                  duration === d
                    ? 'border-brand bg-accent/30 shadow-sm'
                    : 'border-border bg-card hover:border-brand/30'
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-2 left-4 text-xs bg-brand text-white px-2 py-0.5 rounded-full">
                    Populer
                  </span>
                )}
                {duration === d && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                    <Check size={11} className="text-white" />
                  </div>
                )}
                <p className="font-bold text-foreground text-2xl mb-0.5">{d}</p>
                <p className="text-xs text-muted-foreground mb-3">menit</p>
                <p className="font-semibold text-brand text-sm">
                  Rp {(price / 1000).toFixed(0)}K
                </p>
                <p className="text-xs text-muted-foreground">
                  {d === 60
                    ? 'Fokus pada isu spesifik'
                    : d === 90
                    ? 'Eksplorasi mendalam'
                    : 'Sesi intensif komprehensif'}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Summary */}
      {mode && duration > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-accent/30 rounded-xl border border-brand/20 flex items-center justify-between"
        >
          <div className="text-sm">
            <span className="font-medium text-foreground">
              {mode === 'online' ? '🖥 Online' : '🏢 Offline'} · {duration} menit
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              Bersama {therapist?.name}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-brand text-lg">
              Rp {(SESSION_DURATIONS.find((s) => s.duration === duration)?.price || 0).toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-muted-foreground">per sesi</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
