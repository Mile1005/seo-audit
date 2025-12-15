import { NextRequest, NextResponse } from 'next/server';
import { getAudit } from '../../../../lib/server/audit-store';
import { saveAuditRun } from '../../../../lib/server/save-audit-run';
import { auth } from '../../../../auth';
import { prisma } from '../../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const auditId = searchParams.get('auditId');
    if (!auditId) {
      return NextResponse.json({ error: 'Missing auditId' }, { status: 400 });
    }
    const record = getAudit(auditId);
    if (!record) {
      // In-memory store may be empty on cold start / different instance.
      // Try persisted AuditRun (Phase 4) as a fallback so the UI stays "alive".
      try {
        const auditRunModel = (prisma as any)['auditRun']
        if (auditRunModel) {
          const db = await auditRunModel.findUnique({ where: { id: auditId } })
          if (db) {
            const p = (db.result as any)?.progress
            const startedAt = db.startedAt ? new Date(db.startedAt).getTime() : Date.now()
            const updatedAt = db.updatedAt ? new Date(db.updatedAt).getTime() : Date.now()
            const now = Date.now()
            const elapsedMs = Math.max(0, now - startedAt)
            if (String(db.status) === 'failed') {
              return NextResponse.json({ status: 'failed', error: db.error || 'Audit failed' })
            }
            if (String(db.status) === 'completed' && db.result) {
              return NextResponse.json({ status: 'completed', data: db.result })
            }
            return NextResponse.json({
              status: 'processing',
              stage: p?.stage || 'queued',
              progress: typeof p?.progress === 'number' ? p.progress : undefined,
              message: p?.message || undefined,
              startedAt,
              updatedAt,
              elapsedMs,
            })
          }
        }
      } catch {
        // Ignore DB fallback errors and keep response cheap.
      }

      // Not yet initialized vs expired; treat as processing with a safe default stage
      return NextResponse.json({ status: 'processing', stage: 'queued', progress: 2, message: 'Queued' });
    }

    const now = Date.now();
    const elapsedMs = Math.max(0, now - (record.startedAt || now));
    const stalledMs = Math.max(0, now - (record.updatedAt || now));
    const STALL_TIMEOUT_MS = Number(process.env.AUDIT_STALL_TIMEOUT_MS || 120000);

    if (record.ownerId) {
      const session = await auth();
      const userId = session?.user?.id;
      if (!userId || userId !== record.ownerId) {
        return NextResponse.json({ status: 'processing' });
      }
    }
    if (record.status === 'failed') {
      return NextResponse.json({ status: 'failed', error: record.error });
    }
    if (record.status === 'completed') {
      // Fire-and-forget persistence (only if not yet persisted - naive: rely on DB upsert idempotence)
      if (record.data) {
        saveAuditRun(record.data); // do not await to keep poll fast
      }
      return NextResponse.json({ status: 'completed', data: record.data });
    }

    if (stalledMs > STALL_TIMEOUT_MS) {
      return NextResponse.json({
        status: 'failed',
        error: 'Audit stalled (no progress updates). Please try again.',
      });
    }

    return NextResponse.json({
      status: 'processing',
      stage: record.stage || 'queued',
      progress: typeof record.progress === 'number' ? record.progress : undefined,
      message: record.message || undefined,
      startedAt: record.startedAt,
      updatedAt: record.updatedAt,
      elapsedMs,
    });
  } catch (e:any) {
    return NextResponse.json({ status: 'failed', error: e.message || 'Unexpected error'}, { status: 500 });
  }
}
