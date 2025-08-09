import { describe, it, expect } from "vitest";
import { StartAuditInput } from "@/lib/schemas";

describe("StartAuditInput schema", () => {
  it("accepts valid payload", () => {
    const parsed = StartAuditInput.parse({ pageUrl: "https://example.com" });
    expect(parsed.pageUrl).toBe("https://example.com");
  });
  it("rejects invalid url", () => {
    expect(() => StartAuditInput.parse({ pageUrl: "not-a-url" })).toThrow();
  });
});


