// Simple in-memory database for development
// In production, you'd want to use a real database like PostgreSQL

interface Run {
  id: string;
  pageUrl: string;
  targetKeyword?: string;
  email?: string;
  status: string;
  createdAt: Date;
}

interface Audit {
  id: string;
  runId: string;
  json: string;
  createdAt: string;
}

// In-memory storage
const runs = new Map<string, Run>();
const audits = new Map<string, Audit>();

// Helper functions
export const dbHelpers = {
  // Create a new run
  async createRun(data: { id: string; pageUrl: string; targetKeyword?: string; email?: string; status?: string }) {
    const now = new Date().toISOString();
    const run: Run = {
      id: data.id,
      pageUrl: data.pageUrl,
      targetKeyword: data.targetKeyword,
      email: data.email,
      status: data.status || 'queued',
      createdAt: new Date(now)
    };
    runs.set(data.id, run);
    console.log(`Created run: ${data.id}`);
    return run;
  },

  // Update run status
  async updateRunStatus(runId: string, status: string) {
    const run = runs.get(runId);
    if (run) {
      run.status = status;
      runs.set(runId, run);
      console.log(`Updated run ${runId} status to: ${status}`);
    }
    return run;
  },

  // Get run by ID
  async getRun(runId: string): Promise<Run | undefined> {
    return runs.get(runId);
  },

  // Get run with audit
  async getRunWithAudit(runId: string) {
    const run = runs.get(runId);
    if (!run) return null;

    const audit = Array.from(audits.values()).find(a => a.runId === runId);

    return {
      ...run,
      audit: audit ? {
        id: audit.id,
        json: audit.json,
        createdAt: audit.createdAt
      } : null
    };
  },

  // Get runs by email with pagination
  async getRunsByEmail(email: string, limit: number = 10, offset: number = 0) {
    const userRuns = Array.from(runs.values())
      .filter(run => run.email === email)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const total = userRuns.length;
    const paginatedRuns = userRuns.slice(offset, offset + limit);

    return {
      runs: paginatedRuns.map(run => ({
        ...run,
        hasResults: Array.from(audits.values()).some(audit => audit.runId === run.id)
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    };
  },

  // Create audit
  async createAudit(data: {
    id: string;
    runId: string;
    json: string;
  }) {
    const audit: Audit = {
      id: data.id,
      runId: data.runId,
      json: data.json,
      createdAt: new Date().toISOString()
    };
    audits.set(data.id, audit);
    return audit;
  },

  // Get recent runs for debug
  async getRecentRuns() {
    return Array.from(runs.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10)
      .map(run => ({
        id: run.id,
        status: run.status,
        pageUrl: run.pageUrl,
        createdAt: run.createdAt
      }));
  }
};



