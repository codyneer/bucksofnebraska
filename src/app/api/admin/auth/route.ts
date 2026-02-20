import { NextRequest, NextResponse } from 'next/server'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export async function POST(request: NextRequest) {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Admin not configured' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    if (email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      // Generate a simple session token (hash of credentials + date)
      const token = Buffer.from(`${ADMIN_EMAIL}:${Date.now()}`).toString('base64')
      return NextResponse.json({ success: true, token })
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
