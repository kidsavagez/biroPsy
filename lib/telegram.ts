import { Booking, PRICING } from '@/types'
import { getTherapistById } from '@/data/therapists'

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`

async function sendMessage(chatId: string, text: string): Promise<void> {
  if (!chatId || !process.env.TELEGRAM_BOT_TOKEN) return

  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  })
}

function formatBookingMessage(booking: Booking, prefix: string): string {
  const therapist = getTherapistById(booking.therapistId)
  const modeLabel = booking.sessionMode === 'online' ? '🖥 Online' : '🏢 Offline'
  const paymentLabel = booking.paymentMethod === 'online' ? '💳 Online (Midtrans)' : '💵 Tunai'

  return `${prefix}

📋 <b>ID Booking:</b> ${booking.id}
👤 <b>Klien:</b> ${booking.clientName}
📧 <b>Email:</b> ${booking.clientEmail}
📱 <b>Telepon:</b> ${booking.clientPhone}
💬 <b>WhatsApp:</b> ${booking.clientWhatsapp}

🧠 <b>Terapis:</b> ${therapist?.name || booking.therapistId}
📌 <b>Mode:</b> ${modeLabel}
⏱ <b>Durasi:</b> ${booking.duration} menit
💰 <b>Harga:</b> Rp ${booking.price.toLocaleString('id-ID')}

📅 <b>Tanggal:</b> ${booking.date}
🕐 <b>Waktu:</b> ${booking.time} WIB
💳 <b>Pembayaran:</b> ${paymentLabel}

📝 <b>Alasan:</b> ${booking.reason || '-'}
📒 <b>Catatan:</b> ${booking.notes || '-'}`
}

export async function sendAdminNotification(booking: Booking): Promise<void> {
  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID || ''
  const message = formatBookingMessage(booking, '🔔 <b>BOOKING BARU MASUK!</b>')
  await sendMessage(adminChatId, message)
}

export async function sendTherapistNotification(booking: Booking): Promise<void> {
  const therapist = getTherapistById(booking.therapistId)
  if (!therapist?.telegramChatId) return

  const message = formatBookingMessage(
    booking,
    `📅 <b>Jadwal Baru untuk ${therapist.name}</b>`
  )
  await sendMessage(therapist.telegramChatId, message)
}

export async function sendReminderNotification(booking: Record<string, string>): Promise<void> {
  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID || ''
  const therapist = getTherapistById(booking.therapistId)

  const message = `⏰ <b>PENGINGAT SESI — 24 JAM LAGI</b>

📋 <b>ID:</b> ${booking.id}
👤 <b>Klien:</b> ${booking.clientName}
📱 <b>WA:</b> ${booking.clientWhatsapp}
🧠 <b>Terapis:</b> ${therapist?.name || booking.therapistId}
📅 <b>Tanggal:</b> ${booking.date} pukul ${booking.time} WIB
⏱ <b>Durasi:</b> ${booking.duration} menit`

  await sendMessage(adminChatId, message)

  if (therapist?.telegramChatId) {
    await sendMessage(therapist.telegramChatId, message)
  }
}
