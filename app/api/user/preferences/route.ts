import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getRedis } from '@/lib/redis'

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const redis = getRedis()
  const key = `user:prefs:${session.user.email}`
  const prefs = await redis.get(key)
  return NextResponse.json({
    preferences: prefs ? JSON.parse(prefs) : { company: '', timezone: 'UTC' }
  })
}

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { company = '', timezone = 'UTC' } = body || {}
  if (typeof company !== 'string' || typeof timezone !== 'string') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
  const redis = getRedis()
  const key = `user:prefs:${session.user.email}`
  await redis.set(key, JSON.stringify({ company, timezone }))
  return NextResponse.json({ ok: true })
}
