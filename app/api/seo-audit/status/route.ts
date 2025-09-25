import { NextRequest, NextResponse } from 'next/server';
import { getAudit } from '../../../../lib/server/audit-store';
import { saveAuditRun } from '../../../../lib/server/save-audit-run';

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
      // Not yet initialized vs expired; treat as processing for first seconds
      return NextResponse.json({ status: 'processing' });
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
    return NextResponse.json({ status: 'processing' });
  } catch (e:any) {
    return NextResponse.json({ status: 'failed', error: e.message || 'Unexpected error'}, { status: 500 });
  }
}
