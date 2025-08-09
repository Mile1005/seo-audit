import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function createRun(input: {
  pageUrl: string;
  targetKeyword?: string;
  email?: string;
}) {
  return prisma.run.create({
    data: {
      pageUrl: input.pageUrl,
      targetKeyword: input.targetKeyword,
      email: input.email,
      status: "queued"
    }
  });
}

export async function updateRunStatus(runId: string, status: "queued" | "running" | "ready" | "failed") {
  return prisma.run.update({ where: { id: runId }, data: { status } });
}

export async function saveAudit(runId: string, json: unknown) {
  const audit = await prisma.audit.create({ data: { runId, json: JSON.stringify(json) } });
  return audit;
}

export async function getRunWithAudit(id: string) {
  return prisma.run.findUnique({ where: { id }, include: { audit: true } });
}


