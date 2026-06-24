import { Resend } from 'resend'
import { Booking, PRICING } from '@/types'
import { Therapist } from '@/types'
import { getGoogleCalendarLink, generateICSContent } from './calendar'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = `${process.env.RESEND_FROM_NAME || 'Harmoni Psikologi'} <${process.env.RESEND_FROM_EMAIL || 'booking@harmonipsikologi.com'}>`

function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`
}

function bookingEmailHtml(booking: Booking, therapist: Therapist, type: 'confirmation' | 'reminder'): string {
  const calendarLink = getGoogleCalendarLink(booking, therapist)
  const isOnline = booking.sessionMode === 'online'

  const title = type === 'confirmation' ? 'Booking Dikonfirmasi!' : '⏰ Pengingat: Sesi Terapi Besok'
  const intro =
    type === 'confirmation'
      ? `Hei <strong>${booking.clientName}</strong>, booking Anda telah berhasil dikonfirmasi.`
      : `Hei <strong>${booking.clientName}</strong>, sesi terapi Anda dijadwalkan <strong>besok</strong>. Ini adalah pengingat untuk Anda.`

  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:#52796f;padding:32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">🌿 Harmoni Psikologi</h1>
              <p style="margin:8px 0 0;color:#d1e8d4;font-size:14px;">Perjalanan Menuju Kesehatan Mental Anda</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px 32px;">
              <h2 style="margin:0 0 8px;color:#2f3e46;font-size:22px;">${title}</h2>
              <p style="margin:0 0 24px;color:#6b7280;font-size:15px;">${intro}</p>

              <!-- Booking Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7f4;border-radius:12px;padding:24px;margin-bottom:24px;">
                <tr><td>
                  <p style="margin:0 0 16px;font-weight:600;color:#354f52;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Detail Sesi</p>
                  ${row('ID Booking', booking.id)}
                  ${row('Terapis', `${therapist.name}, ${therapist.credentials}`)}
                  ${row('Tanggal', new Date(booking.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))}
                  ${row('Waktu', `${booking.time} WIB`)}
                  ${row('Durasi', `${booking.duration} menit`)}
                  ${row('Mode', isOnline ? '🖥 Online' : '🏢 Offline')}
                  ${row('Harga', formatRupiah(booking.price))}
                  ${row('Pembayaran', booking.paymentMethod === 'online' ? '💳 Online (Midtrans)' : '💵 Bayar Tunai Setelah Sesi')}
                  ${!isOnline ? row('Lokasi', 'Jl. Sudirman No. 88, Karet Tengsin, Jakarta Selatan') : ''}
                </td></tr>
              </table>

              ${isOnline ? `<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:16px;margin-bottom:24px;"><p style="margin:0;color:#92400e;font-size:14px;">📧 <strong>Sesi Online:</strong> Link meeting (Zoom/Google Meet) akan dikirimkan melalui email ini maksimal 1 jam sebelum sesi dimulai.</p></div>` : ''}

              <!-- Add to Calendar -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td>
                    <a href="${calendarLink}" style="display:inline-block;background:#52796f;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:10px;font-weight:600;font-size:15px;">📅 Tambah ke Google Calendar</a>
                  </td>
                </tr>
              </table>

              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
              <p style="color:#9ca3af;font-size:13px;margin:0;">Jika Anda perlu mengubah atau membatalkan jadwal, hubungi kami minimal <strong>24 jam sebelum sesi</strong> di <a href="mailto:hello@harmonipsikologi.com" style="color:#52796f;">hello@harmonipsikologi.com</a> atau WhatsApp <a href="https://wa.me/6281234567890" style="color:#52796f;">+62 812-3456-7890</a>.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">© 2025 Harmoni Psikologi · Jl. Sudirman No. 88, Jakarta Selatan</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function row(label: string, value: string): string {
  return `<table width="100%" style="margin-bottom:10px;"><tr><td style="color:#6b7280;font-size:14px;width:40%;">${label}</td><td style="color:#1f2937;font-size:14px;font-weight:500;">${value}</td></tr></table>`
}

export async function sendConfirmationEmail(booking: Booking, therapist: Therapist): Promise<void> {
  const icsContent = generateICSContent(booking, therapist)

  await resend.emails.send({
    from: FROM,
    to: booking.clientEmail,
    subject: `✅ Booking Dikonfirmasi - ${therapist.name} | ${booking.date} ${booking.time}`,
    html: bookingEmailHtml(booking, therapist, 'confirmation'),
    attachments: [
      {
        filename: `sesi-terapi-${booking.id}.ics`,
        content: Buffer.from(icsContent).toString('base64'),
      },
    ],
  })
}

export async function sendReminderEmail(booking: Record<string, string>, therapist: Therapist): Promise<void> {
  const bookingObj = booking as unknown as Booking
  await resend.emails.send({
    from: FROM,
    to: booking.clientEmail,
    subject: `⏰ Pengingat: Sesi Terapi Besok - ${therapist.name} | ${booking.date} ${booking.time}`,
    html: bookingEmailHtml(bookingObj, therapist, 'reminder'),
  })
}
