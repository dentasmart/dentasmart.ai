import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { seedAdminUser } from "./blogDb";
import { createAgentRun, updateAgentRun, listAgentRuns, cleanupTestRuns } from "./blogAgent";

// ─── Context helpers (same pattern as blog.test.ts) ──────────

function createPublicContext(): TrpcContext {
  const cookies: Record<string, string> = {};
  return {
    user: null,
    req: {
      protocol: "https",
      headers: { cookie: "" },
    } as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string) => {
        cookies[name] = value;
      },
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createAdminContext(cookieStr: string): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: { cookie: cookieStr },
    } as TrpcContext["req"],
    res: {
      cookie: () => {},
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Blog Agent", () => {
  let adminCookie = "";
  const testRunIds: number[] = [];

  beforeAll(async () => {
    await seedAdminUser();

    // Login to get admin cookie
    let setCookieValue = "";
    const ctx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: { cookie: "" },
      } as TrpcContext["req"],
      res: {
        cookie: (_name: string, value: string) => {
          setCookieValue = value;
        },
        clearCookie: () => {},
      } as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(ctx);
    const result = await caller.blog.adminLogin({
      username: "admin",
      password: "DentaSmart2026",
    });
    expect(result.success).toBe(true);
    adminCookie = `blog_admin_session=${setCookieValue}`;
  });

  describe("Agent DB Helpers", () => {
    it("should create an agent run record", async () => {
      const runId = await createAgentRun({ triggerType: "manual", governanceCandidateId: 1 });
      testRunIds.push(runId);
      expect(runId).toBeGreaterThan(0);
    });

    it("should update an agent run record", async () => {
      const runId = await createAgentRun({ triggerType: "manual", governanceCandidateId: 1 });
      testRunIds.push(runId);
      await updateAgentRun(runId, {
        status: "success",
        title: "Test Article Title",
        slug: "test-article-title",
        primaryKeyword: "test keyword",
        durationMs: 5000,
      });

      const runs = await listAgentRuns(50);
      const latestRun = runs.find((r) => r.id === runId);
      expect(latestRun).toBeDefined();
      expect(latestRun!.status).toBe("success");
      expect(latestRun!.title).toBe("Test Article Title");
      expect(latestRun!.slug).toBe("test-article-title");
    });

    it("should list agent runs in descending order", async () => {
      // Create a couple of runs
      const id1 = await createAgentRun({ triggerType: "manual", governanceCandidateId: 1 });
      const id2 = await createAgentRun({ triggerType: "manual", governanceCandidateId: 1 });
      testRunIds.push(id1, id2);

      const runs = await listAgentRuns(10);
      expect(runs.length).toBeGreaterThanOrEqual(2);

      // Verify descending order by createdAt
      for (let i = 1; i < runs.length; i++) {
        const prev = new Date(runs[i - 1].createdAt).getTime();
        const curr = new Date(runs[i].createdAt).getTime();
        expect(prev).toBeGreaterThanOrEqual(curr);
      }
    });

    it("should record failed runs with error message", async () => {
      const runId = await createAgentRun({ triggerType: "manual", governanceCandidateId: 1 });
      testRunIds.push(runId);
      await updateAgentRun(runId, {
        status: "failed",
        error: "LLM timeout after 30s",
        durationMs: 30000,
      });

      const runs = await listAgentRuns(50);
      const failedRun = runs.find((r) => r.id === runId);
      expect(failedRun).toBeDefined();
      expect(failedRun!.status).toBe("failed");
      expect(failedRun!.error).toBe("LLM timeout after 30s");
    });
  });

  describe("Agent tRPC Procedures", () => {
    it("should reject agentListRuns without admin auth", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      await expect(caller.blog.agentListRuns()).rejects.toThrow();
    });

    it("should list runs via agentListRuns with admin auth", async () => {
      if (!adminCookie) {
        console.warn("Skipping: admin cookie not available");
        return;
      }
      const ctx = createAdminContext(adminCookie);
      const caller = appRouter.createCaller(ctx);
      const runs = await caller.blog.agentListRuns();
      expect(Array.isArray(runs)).toBe(true);
    });

    it("should reject agentTrigger without admin auth", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      await expect(caller.blog.agentTrigger({ candidateId: 1 })).rejects.toThrow();
    });
  });

  afterAll(async () => {
    // Clean up all test-created agent_runs records
    if (testRunIds.length > 0) {
      await cleanupTestRuns(testRunIds);
    }
  });
});
