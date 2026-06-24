import { BookingFormData, PRICING, Booking } from '@/types'
import { getTherapistById } from '@/data/therapists'

function generateId(): string {
  const now = new Date()
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '')
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `HP-${datePart}-${random}`
}

export async function POST(request: Request) {
  try {
    const body: BookingFormData = await request.json()

    const { therapistId, sessionMode, duration, date, time, clientName, clientEmail, paymentMethod } = body

    if (!therapistId || !sessionMode || !duration || !date || !time || !clientName || !clientEmail || !paymentMethod) {
      return Response.json({ error: 'Data tidak lengkap' }, { status: 400 })
    }

    const therapist = getTherapistById(therapistId)
    if (!therapist) {
      return Response.json({ error: 'Terapis tidak ditemukan' }, { status: 404 })
    }

    const price = PRICING[duration]
    if (!price) {
      return Response.json({ error: 'Durasi tidak valid' }, { status: 400 })
    }

    const bookingId = generateId()
    const booking: Booking = {
      ...body,
      id: bookingId,
      price,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    // Check availability & save to Google Sheets (only if env configured)
    if (process.env.GOOGLE_SPREADSHEET_ID) {
      const { checkSlotAvailability, createBooking } = await import('@/lib/google-sheets')

      const available = await checkSlotAvailability(therapistId, date, time)
      if (!available) {
        return Response.json({ error: 'Slot ini baru saja dipesan. Silakan pilih waktu lain.' }, { status: 409 })
      }

      await createBooking(booking)
    }

    // Telegram notifications
    if (process.env.TELEGRAM_BOT_TOKEN) {
      const { sendAdminNotification, sendTherapistNotification } = await import('@/lib/telegram')
      await Promise.all([
        sendAdminNotification(booking),
        sendTherapistNotification(booking),
      ])
    }

    // Confirmation email
    if (process.env.RESEND_API_KEY) {
      const { sendConfirmationEmail } = await import('@/lib/resend')
      await sendConfirmationEmail(booking, therapist)
    }

    // Online payment via Midtrans
    if (paymentMethod === 'online' && process.env.MIDTRANS_SERVER_KEY) {
      const { createMidtransTransaction } = await import('@/lib/midtrans')
      const payment = await createMidtransTransaction(booking)
      return Response.json({ bookingId, paymentUrl: payment.redirect_url, snapToken: payment.token })
    }

    return Response.json({ bookingId, status: 'confirmed' })
  } catch (err: any) {
    console.error('Booking error:', err)
    return Response.json({ error: 'Terjadi kesalahan server. Coba lagi.' }, { status: 500 })
  }
}
