'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  isBefore,
  startOfDay,
  getDay,
} from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { SessionDuration } from '@/types'
import { getTherapistById } from '@/data/therapists'

const DAY_MAP: Record<string, number> = {
  Minggu: 0, Senin: 1, Selasa: 2, Rabu: 3, Kamis: 4, Jumat: 5, Sabtu: 6,
}

interface Props {
  therapistId: string
  duration: SessionDuration
  date: string
  time: string
  onDateChange: (date: string) => void
  onTimeChange: (time: string) => void
}

function generateTimeSlots(start: string, end: string, durationMin: number): string[] {
  const slots: string[] = []
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  let current = sh * 60 + sm
  const endTotal = eh * 60 + em
  while (current + durationMin <= endTotal) {
    const h = Math.floor(current / 60)
    const m = current % 60
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    current += 60
  }
  return slots
}

export default function Step3DateTime({ therapistId, duration, date, time, onDateChange, onTimeChange }: Props) {
  const [viewMonth, setViewMonth] = useState(new Date())
  const [availableSlots, setAvailableSlots] = useState<{ time: string; available: boolean }[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  const therapist = getTherapistById(therapistId)
  const availableDayNums = (therapist?.availableDays || []).map((d) => DAY_MAP[d])

  const today = startOfDay(new Date())
  const days = eachDayOfInterval({ start: startOfMonth(viewMonth), end: endOfMonth(viewMonth) })
  const startPad = getDay(startOfMonth(viewMonth))

  const selectedDate = date ? new Date(date + 'T00:00:00') : null

  const isDayAvailable = (day: Date) => {
    if (isBefore(day, today)) return false
    return availableDayNums.includes(getDay(day))
  }

  useEffect(() => {
    if (!date || !therapist) return

    setLoadingSlots(true)
    const allSlots = generateTimeSlots(
      therapist.availableHours.start,
      therapist.availableHours.end,
      duration
    )

    fetch(`/api/availability?therapistId=${therapistId}&date=${date}`)
      .then((r) => r.json())
      .then((data: { blocked: string[] }) => {
        const blocked = data.blocked || []
        setAvailableSlots(
          allSlots.map((t) => ({ time: t, available: !blocked.includes(t) }))
        )
      })
      .catch(() => {
        setAvailableSlots(allSlots.map((t) => ({ time: t, available: true })))
      })
      .finally(() => setLoadingSlots(false))
  }, [date, therapistId, duration, therapist])

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-1">Pilih Jadwal</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Pilih tanggal dan waktu yang tersedia untuk terapis Anda.
      </p>

      {/* Calendar */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6">
        {/* Month header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setViewMonth((m) => subMonths(m, 1))}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            disabled={viewMonth <= new Date()}
          >
            <ChevronLeft size={16} />
          </button>
          <p className="font-semibold text-foreground text-sm capitalize">
            {format(viewMonth, 'MMMM yyyy', { locale: idLocale })}
          </p>
          <button
            onClick={() => setViewMonth((m) => addMonths(m, 1))}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 mb-2">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
            <div key={d} className="text-center text-xs text-muted-foreground font-medium py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({ length: startPad }).map((_, i) => (
            <div key={`pad-${i}`} />
          ))}
          {days.map((day) => {
            const available = isDayAvailable(day)
            const selected = selectedDate && isSameDay(day, selectedDate)
            const todayDay = isToday(day)

            return (
              <button
                key={day.toISOString()}
                disabled={!available}
                onClick={() => {
                  onDateChange(format(day, 'yyyy-MM-dd'))
                  onTimeChange('')
                }}
                className={`
                  aspect-square rounded-lg text-xs font-medium transition-all
                  ${selected ? 'bg-brand text-white' : ''}
                  ${!selected && available ? 'hover:bg-accent text-foreground' : ''}
                  ${!available ? 'text-muted-foreground/40 cursor-not-allowed' : ''}
                  ${todayDay && !selected ? 'ring-1 ring-brand/40' : ''}
                `}
              >
                {format(day, 'd')}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="w-3 h-3 rounded-sm bg-brand" /> Terpilih
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="w-3 h-3 rounded-sm bg-muted-foreground/20" /> Tidak tersedia
          </div>
        </div>
      </div>

      {/* Time slots */}
      {date && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-semibold text-foreground mb-3">
            Jam Tersedia —{' '}
            <span className="font-normal text-muted-foreground">
              {format(new Date(date + 'T00:00:00'), 'EEEE, d MMMM yyyy', { locale: idLocale })}
            </span>
          </p>

          {loadingSlots ? (
            <div className="flex justify-center py-8">
              <Loader2 size={20} className="animate-spin text-brand" />
            </div>
          ) : availableSlots.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Tidak ada slot tersedia untuk tanggal ini.
            </p>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {availableSlots.map(({ time: t, available }) => (
                <button
                  key={t}
                  disabled={!available}
                  onClick={() => onTimeChange(t)}
                  className={`py-2.5 rounded-xl text-xs font-medium transition-all border ${
                    time === t
                      ? 'bg-brand text-white border-brand'
                      : available
                      ? 'bg-card border-border hover:border-brand/40 text-foreground'
                      : 'bg-muted/50 border-border text-muted-foreground/40 line-through cursor-not-allowed'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
