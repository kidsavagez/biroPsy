export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { order_id, transaction_status, status_code, gross_amount, signature_key } = body

    if (!process.env.MIDTRANS_SERVER_KEY) {
      return Response.json({ received: true })
    }

    const { verifyMidtransSignature } = await import('@/lib/midtrans')
    const isValid = verifyMidtransSignature(order_id, status_code, gross_amount, signature_key)

    if (!isValid) {
      return Response.json({ error: 'Invalid signature' }, { status: 403 })
    }

    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      if (process.env.GOOGLE_SPREADSHEET_ID) {
        const { updateBookingStatus } = await import('@/lib/google-sheets')
        await updateBookingStatus(order_id, 'paid')
      }
    }

    if (transaction_status === 'cancel' || transaction_status === 'deny' || transaction_status === 'expire') {
      if (process.env.GOOGLE_SPREADSHEET_ID) {
        const { updateBookingStatus } = await import('@/lib/google-sheets')
        await updateBookingStatus(order_id, 'cancelled')
      }
    }

    return Response.json({ received: true })
  } catch (err: any) {
    console.error('Midtrans webhook error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
