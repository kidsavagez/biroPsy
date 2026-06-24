import { Booking } from '@/types'
import { Therapist } from '@/types'

export function getGoogleCalendarLink(booking: Booking, therapist: Therapist): string {
  const [year, month, day] = booking.date.split('-').map(Number)
  const [hour, minute] = booking.time.split(':').map(Number)

  const start = new Date(year, month - 1, day, hour, minute)
  const end = new Date(start.getTime() + booking.duration * 60 * 1000)

  const format = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const title = encodeURIComponent(`Sesi Terapi - ${therapist.name}`)
  const details = encodeURIComponent(
    `Booking ID: ${booking.id}\nMode: ${booking.sessionMode === 'online' ? 'Online' : 'Offline'}\nDurasi: ${booking.duration} menit\n\n${booking.sessionMode === 'offline' ? 'Lokasi: Klinik Harmoni Psikologi, Jl. Sudirman No. 88, Jakarta Selatan' : 'Sesi dilakukan secara online. Link meeting akan dikirimkan via email.'}`
  )
  const location = encodeURIComponent(
    booking.sessionMode === 'offline'
      ? 'Klinik Harmoni Psikologi, Jl. Sudirman No. 88, Jakarta Selatan'
      : 'Online (Zoom/Google Meet)'
  )

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${format(start)}/${format(end)}&details=${details}&location=${location}`
}

export function generateICSContent(booking: Booking, therapist: Therapist): string {
  const [year, month, day] = booking.date.split('-').map(Number)
  const [hour, minute] = booking.time.split(':').map(Number)

  const start = new Date(year, month - 1, day, hour, minute)
  const end = new Date(start.getTime() + booking.duration * 60 * 1000)

  const formatICS = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const now = new Date()
  const location =
    booking.sessionMode === 'offline'
      ? 'Klinik Harmoni Psikologi\\, Jl. Sudirman No. 88\\, Jakarta Selatan'
      : 'Online (Zoom/Google Meet)'

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Harmoni Psikologi//Booking System//ID',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `DTSTART:${formatICS(start)}`,
    `DTEND:${formatICS(end)}`,
    `DTSTAMP:${formatICS(now)}`,
    `UID:${booking.id}@harmonipsikologi.com`,
    `SUMMARY:Sesi Terapi - ${therapist.name}`,
    `DESCRIPTION:Booking ID: ${booking.id}\\nMode: ${booking.sessionMode === 'online' ? 'Online' : 'Offline'}\\nDurasi: ${booking.duration} menit`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Pengingat: Sesi terapi Anda besok',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Pengingat: Sesi terapi Anda 1 jam lagi',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}
