import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const therapistId = searchParams.get('therapistId')
  const date = searchParams.get('date')

  if (!therapistId || !date) {
    return Response.json({ error: 'therapistId and date required' }, { status: 400 })
  }

  try {
    // In production, this reads the BlockedSlots tab from Google Sheets
    // For the pitch demo, return empty blocked list (all slots available)
    if (!process.env.GOOGLE_SPREADSHEET_ID) {
      return Response.json({ blocked: [] })
    }

    const { google } = await import('googleapis')
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })
    const sheets = google.sheets({ version: 'v4', auth })
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: 'BlockedSlots!A:D',
    })

    const rows = res.data.values || []
    const blocked = rows
      .slice(1)
      .filter((r) => r[0] === therapistId && r[1] === date)
      .map((r) => r[2])

    return Response.json({ blocked })
  } catch (err) {
    console.error('Availability check error:', err)
    return Response.json({ blocked: [] })
  }
}
