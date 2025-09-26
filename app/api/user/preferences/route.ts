import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { safeGet, safeSet } from '@/lib/redis'

// In-memory fallback (per server instance) if Redis unavailable
const memoryStore = new Map<string, { company: string; timezone: string }>()

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const key = `user:prefs:${session.user.email}`
  try {
    const prefs = await safeGet(key)
    return NextResponse.json({
      preferences: prefs ? JSON.parse(prefs) : memoryStore.get(key) || { company: '', timezone: 'UTC' }
    })
  } catch (e) {
    // Fallback to in-memory
    return NextResponse.json({
      preferences: memoryStore.get(key) || { company: '', timezone: 'UTC' },
      fallback: true
    })
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { company = '', timezone = 'UTC' } = body || {}
  if (typeof company !== 'string' || typeof timezone !== 'string') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
  const key = `user:prefs:${session.user.email}`
  memoryStore.set(key, { company, timezone })
  try {
    await safeSet(key, JSON.stringify({ company, timezone }))
    return NextResponse.json({ ok: true, persisted: true })
  } catch (e) {
    return NextResponse.json({ ok: true, persisted: false, fallback: true })
  }
}
