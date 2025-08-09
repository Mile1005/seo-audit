import { PrismaClient } from "@prisma/client";

let prismaInstance: PrismaClient | null = null;
export function getPrisma(): PrismaClient {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
}

export async function createRun(input: {
  pageUrl: string;
  targetKeyword?: string;
  email?: string;
}) {
  return getPrisma().run.create({
    data: {
      pageUrl: input.pageUrl,
      targetKeyword: input.targetKeyword,
      email: input.email,
      status: "queued"
    }
  });
}

export async function updateRunStatus(runId: string, status: "queued" | "running" | "ready" | "failed") {
  return getPrisma().run.update({ where: { id: runId }, data: { status } });
}

export async function saveAudit(runId: string, json: unknown) {
  const audit = await getPrisma().audit.create({ data: { runId, json: JSON.stringify(json) } });
  return audit;
}

export async function getRunWithAudit(id: string) {
  return getPrisma().run.findUnique({ where: { id }, include: { audit: true } });
}


