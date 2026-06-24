'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Step1Therapist from './steps/Step1Therapist'
import Step2Session from './steps/Step2Session'
import Step3DateTime from './steps/Step3DateTime'
import Step4Info from './steps/Step4Info'
import Step5Payment from './steps/Step5Payment'
import {
  SessionMode,
  SessionDuration,
  PaymentMethod,
  BookingFormData,
  PRICING,
} from '@/types'
import { getTherapistById } from '@/data/therapists'

const STEPS = ['Terapis', 'Sesi', 'Jadwal', 'Info', 'Pembayaran']

export default function BookingWizard() {
  const router = useRouter()
  const params = useSearchParams()

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [infoValid, setInfoValid] = useState(false)

  const [therapistId, setTherapistId] = useState(params.get('therapist') || '')
  const [sessionMode, setSessionMode] = useState<SessionMode | ''>('')
  const [duration, setDuration] = useState<SessionDuration | 0>(
    Number(params.get('duration') || 0) as SessionDuration | 0
  )
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [info, setInfo] = useState<Partial<BookingFormData>>({})
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | ''>('')

  const canNext = useCallback(() => {
    if (step === 1) return !!therapistId
    if (step === 2) return !!sessionMode && !!duration
    if (step === 3) return !!date && !!time
    if (step === 4) return infoValid
    if (step === 5) return !!paymentMethod
    return false
  }, [step, therapistId, sessionMode, duration, date, time, infoValid, paymentMethod])

  const handleNext = () => {
    if (canNext()) setStep((s) => Math.min(s + 1, 5))
  }

  const handleBack = () => setStep((s) => Math.max(s - 1, 1))

  const handleConfirm = async () => {
    setIsSubmitting(true)
    try {
      const therapist = getTherapistById(therapistId)
      const price = PRICING[duration as SessionDuration]

      const payload: BookingFormData = {
        therapistId,
        sessionMode: sessionMode as SessionMode,
        duration: duration as SessionDuration,
        date,
        time,
        clientName: info.clientName || '',
        clientEmail: info.clientEmail || '',
        clientPhone: info.clientPhone || '',
        clientWhatsapp: info.clientWhatsapp || '',
        reason: info.reason || '',
        notes: info.notes || '',
        paymentMethod: paymentMethod as PaymentMethod,
      }

      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 409) {
          toast.error('Slot ini baru saja dipesan. Silakan pilih waktu lain.')
          setStep(3)
          setTime('')
          return
        }
        throw new Error(data.error || 'Terjadi kesalahan')
      }

      if (paymentMethod === 'online' && data.paymentUrl) {
        window.location.href = data.paymentUrl
      } else {
        router.push(`/booking/confirmation?id=${data.bookingId}`)
      }
    } catch (err: any) {
      toast.error(err.message || 'Gagal membuat booking. Coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const therapist = getTherapistById(therapistId)

  return (
    <div className="min-h-screen bg-muted/30 pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-muted-foreground">
              Langkah {step} dari {STEPS.length}
            </p>
            <p className="text-sm font-medium text-foreground">{STEPS[step - 1]}</p>
          </div>
          <Progress value={(step / STEPS.length) * 100} className="h-1.5" />
          <div className="flex mt-2">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`flex-1 text-center text-xs mt-1 ${
                  i + 1 <= step ? 'text-brand font-medium' : 'text-muted-foreground'
                }`}
              >
                <span className="hidden sm:inline">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Therapist mini-header (steps 2-5) */}
        {step > 1 && therapist && (
          <div className="flex items-center gap-3 bg-card border border-border rounded-2xl p-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent overflow-hidden flex-shrink-0">
              <img
                src={therapist.photo}
                alt={therapist.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const el = e.target as HTMLImageElement
                  el.style.display = 'none'
                  el.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-sm font-bold text-brand">${therapist.name.charAt(0)}</div>`
                }}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{therapist.name}</p>
              <p className="text-xs text-muted-foreground">{therapist.specialization}</p>
            </div>
            {step > 2 && sessionMode && duration > 0 && (
              <div className="ml-auto text-right">
                <p className="text-xs text-muted-foreground">
                  {sessionMode === 'online' ? 'Online' : 'Offline'} · {duration} min
                </p>
                <p className="text-sm font-semibold text-brand">
                  Rp {PRICING[duration as SessionDuration].toLocaleString('id-ID')}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Card */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              {step === 1 && (
                <Step1Therapist value={therapistId} onChange={setTherapistId} />
              )}
              {step === 2 && (
                <Step2Session
                  therapistId={therapistId}
                  mode={sessionMode}
                  duration={duration}
                  onModeChange={(m) => setSessionMode(m)}
                  onDurationChange={(d) => setDuration(d)}
                />
              )}
              {step === 3 && (
                <Step3DateTime
                  therapistId={therapistId}
                  duration={duration as SessionDuration}
                  date={date}
                  time={time}
                  onDateChange={setDate}
                  onTimeChange={setTime}
                />
              )}
              {step === 4 && (
                <Step4Info
                  values={info}
                  onChange={setInfo}
                  onValidityChange={setInfoValid}
                />
              )}
              {step === 5 && (
                <Step5Payment
                  paymentMethod={paymentMethod}
                  onPaymentChange={setPaymentMethod}
                  onConfirm={handleConfirm}
                  isSubmitting={isSubmitting}
                  summary={{
                    therapistId,
                    sessionMode,
                    duration: duration as SessionDuration,
                    date,
                    time,
                    clientName: info.clientName || '',
                    clientEmail: info.clientEmail || '',
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation (not shown on step 5 which has its own confirm button) */}
        {step < 5 && (
          <div className="flex items-center justify-between mt-5">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft size={16} />
              Kembali
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canNext()}
              className="bg-brand hover:bg-brand/90 text-white rounded-xl px-8"
            >
              Lanjut →
            </Button>
          </div>
        )}
        {step === 5 && (
          <div className="flex justify-start mt-5">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft size={16} />
              Kembali
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
