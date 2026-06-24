import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Protect this endpoint with a secret
  const authHeader = request.headers.get('authorization')
  const expectedSecret = `Bearer ${process.env.CRON_SECRET}`

  if (!process.env.CRON_SECRET || authHeader !== expectedSecret) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { getUpcomingBookingsIn24h } = await import('@/lib/google-sheets')
    const { sendReminderNotification } = await import('@/lib/telegram')
    const { sendReminderEmail } = await import('@/lib/resend')
    const { getTherapistById } = await import('@/data/therapists')

    const bookings = await getUpcomingBookingsIn24h()
    let sent = 0

    for (const booking of bookings) {
      const therapist = getTherapistById(booking.therapistId)
      if (!therapist) continue

      await Promise.all([
        sendReminderNotification(booking),
        sendReminderEmail(booking, therapist),
      ])
      sent++
    }

    return Response.json({ success: true, remindersSent: sent })
  } catch (err: any) {
    console.error('Reminder cron error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
