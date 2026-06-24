export type SessionMode = 'online' | 'offline'
export type SessionDuration = 60 | 90 | 120
export type PaymentMethod = 'online' | 'offline'
export type BookingStatus = 'pending' | 'confirmed' | 'paid' | 'cancelled' | 'completed'

export interface Therapist {
  id: string
  name: string
  credentials: string
  title: string
  specialization: string
  tags: string[]
  bio: string
  photo: string
  languages: string[]
  experience: number
  sessionModes: SessionMode[]
  availableDays: string[]
  availableHours: { start: string; end: string }
  rating: number
  reviewCount: number
  telegramChatId: string
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface BookingFormData {
  therapistId: string
  sessionMode: SessionMode
  duration: SessionDuration
  date: string
  time: string
  clientName: string
  clientEmail: string
  clientPhone: string
  clientWhatsapp: string
  reason: string
  notes: string
  paymentMethod: PaymentMethod
}

export interface Booking extends BookingFormData {
  id: string
  status: BookingStatus
  price: number
  createdAt: string
}

export interface BookingStep {
  step: number
  label: string
}

export const PRICING: Record<SessionDuration, number> = {
  60: 90000,
  90: 120000,
  120: 200000,
}

export const SESSION_DURATIONS: { duration: SessionDuration; label: string; price: number }[] = [
  { duration: 60, label: '60 Menit', price: 90000 },
  { duration: 90, label: '90 Menit', price: 120000 },
  { duration: 120, label: '120 Menit', price: 200000 },
]

export const SPECIALIZATIONS = [
  'Semua',
  'Kecemasan & Depresi',
  'Trauma & PTSD',
  'Pasangan & Hubungan',
  'Anak & Remaja',
  'Stres Kerja & Burnout',
  'Gangguan Makan',
  'Terapi Keluarga',
] as const
