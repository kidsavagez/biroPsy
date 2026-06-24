import { Booking } from '@/types'

const MIDTRANS_BASE_URL = process.env.MIDTRANS_IS_PRODUCTION === 'true'
  ? 'https://app.midtrans.com'
  : 'https://app.sandbox.midtrans.com'

const SNAP_URL = process.env.MIDTRANS_IS_PRODUCTION === 'true'
  ? 'https://app.midtrans.com/snap/v1/transactions'
  : 'https://app.sandbox.midtrans.com/snap/v1/transactions'

export async function createMidtransTransaction(booking: Booking): Promise<{ token: string; redirect_url: string }> {
  const serverKey = process.env.MIDTRANS_SERVER_KEY!
  const authHeader = Buffer.from(`${serverKey}:`).toString('base64')

  const payload = {
    transaction_details: {
      order_id: booking.id,
      gross_amount: booking.price,
    },
    customer_details: {
      first_name: booking.clientName,
      email: booking.clientEmail,
      phone: booking.clientPhone,
    },
    item_details: [
      {
        id: `sesi-${booking.duration}min`,
        price: booking.price,
        quantity: 1,
        name: `Sesi Terapi ${booking.duration} Menit (${booking.sessionMode === 'online' ? 'Online' : 'Offline'})`,
      },
    ],
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_APP_URL}/booking/confirmation?id=${booking.id}`,
    },
  }

  const res = await fetch(SNAP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${authHeader}`,
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Midtrans error: ${res.status}`)
  }

  return res.json()
}

export function verifyMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string
): boolean {
  const crypto = require('crypto')
  const serverKey = process.env.MIDTRANS_SERVER_KEY!
  const expected = crypto
    .createHash('sha512')
    .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
    .digest('hex')
  return expected === signatureKey
}
