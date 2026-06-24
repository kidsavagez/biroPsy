import { google } from 'googleapis'
import { Booking } from '@/types'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

const SHEET_BOOKINGS = 'Bookings'
const SHEET_BLOCKED = 'BlockedSlots'

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
  })
}

async function getSheets() {
  const auth = getAuth()
  return google.sheets({ version: 'v4', auth })
}

export async function createBooking(booking: Booking): Promise<void> {
  const sheets = await getSheets()
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!

  const row = [
    booking.id,
    booking.clientName,
    booking.clientEmail,
    booking.clientPhone,
    booking.clientWhatsapp,
    booking.therapistId,
    booking.sessionMode,
    booking.duration,
    booking.price,
    booking.date,
    booking.time,
    booking.paymentMethod,
    booking.status,
    booking.reason,
    booking.notes,
    booking.createdAt,
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_BOOKINGS}!A:P`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  })

  await blockSlot(booking.therapistId, booking.date, booking.time, booking.id)
}

export async function checkSlotAvailability(
  therapistId: string,
  date: string,
  time: string
): Promise<boolean> {
  const sheets = await getSheets()
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_BLOCKED}!A:D`,
  })

  const rows = res.data.values || []
  const isBlocked = rows.some(
    (row) => row[0] === therapistId && row[1] === date && row[2] === time
  )

  return !isBlocked
}

async function blockSlot(
  therapistId: string,
  date: string,
  time: string,
  bookingId: string
): Promise<void> {
  const sheets = await getSheets()
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_BLOCKED}!A:D`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[therapistId, date, time, bookingId]] },
  })
}

export async function updateBookingStatus(
  bookingId: string,
  status: string
): Promise<void> {
  const sheets = await getSheets()
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_BOOKINGS}!A:A`,
  })

  const rows = res.data.values || []
  const rowIndex = rows.findIndex((row) => row[0] === bookingId)

  if (rowIndex === -1) return

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_BOOKINGS}!M${rowIndex + 1}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[status]] },
  })
}

export async function getUpcomingBookingsIn24h(): Promise<Record<string, string>[]> {
  const sheets = await getSheets()
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_BOOKINGS}!A:P`,
  })

  const rows = res.data.values || []
  const now = new Date()
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000)

  return rows
    .slice(1)
    .filter((row) => {
      if (row[12] === 'cancelled') return false
      const sessionDate = new Date(`${row[9]}T${row[10]}:00`)
      return sessionDate >= now && sessionDate <= in24h
    })
    .map((row) => ({
      id: row[0],
      clientName: row[1],
      clientEmail: row[2],
      clientPhone: row[3],
      clientWhatsapp: row[4],
      therapistId: row[5],
      sessionMode: row[6],
      duration: row[7],
      price: row[8],
      date: row[9],
      time: row[10],
      paymentMethod: row[11],
      status: row[12],
      reason: row[13],
      notes: row[14],
      createdAt: row[15],
    }))
}
