// Phase 4: persistence helper for unified audit results
// Provides a single function saveAuditRun that upserts the AuditRun row and issue snapshots.
// This is intentionally tolerant: failures are logged but not thrown (to avoid breaking API response paths).

import { prisma } from "../prisma";
import { AuditResultUnified } from "../types/audit";

export async function saveAuditRun(result: AuditResultUnified) {
  try {
    const { auditId, url, score, comprehensiveResults } = result;
    const issues = comprehensiveResults.issues || [];

    // Create AuditRun first
    const auditRunModel = (prisma as any)["auditRun"];
    const auditIssueModel = (prisma as any)["auditIssueSnapshot"];
    if (!auditRunModel) {
      console.warn("AuditRun model not present on prisma client yet");
      return;
    }
    await auditRunModel.upsert({
      where: { id: auditId },
      update: {
        status: result.status,
        score: score,
        completedAt: new Date(result.timestamp),
        result: result as unknown as any, // JSON column
      },
      create: {
        id: auditId,
        url,
        status: result.status,
        score: score,
        completedAt: new Date(result.timestamp),
        result: result as unknown as any,
      },
    });

    if (issues.length) {
      // Delete old snapshots if re-running same id (rare) then insert new
      if (auditIssueModel) {
        await auditIssueModel.deleteMany({ where: { auditRunId: auditId } });
        await auditIssueModel.createMany({
          data: issues.map((issue) => ({
            auditRunId: auditId,
            severity: issue.severity || "unknown",
            title: issue.title,
            description: issue.description,
            category: issue.category,
            type: issue.category, // mapping category -> type placeholder
            location: issue.location,
            selector: issue.selector,
          })),
        });
      }
    }
  } catch (err) {
    console.error("saveAuditRun failed (non-fatal):", err);
  }
}
