import { describe, it, expect } from "vitest";
import { calculateAudit } from "./heuristics";

const parsedBase = {
  title: "Good Title With Keyword",
  meta: "This is a decent meta description with enough length to be considered optimal.",
  canonical: "https://example.com",
  h1: "Heading",
  h2: ["Sub1"],
  h3: ["Sub1-1"],
  images: [{ src: "/i.jpg", alt: "Alt" }],
  internalLinks: [{ href: "https://example.com/a", anchor: "Anchor" }, { href: "https://example.com/b", anchor: "Anchor2" }],
  jsonLdTypes: ["Article"],
  textBlocks: "Word ".repeat(900)
};

describe("heuristics", () => {
  it("produces overall score within range", () => {
    const res = calculateAudit("https://example.com", parsedBase as any, { keyword: "Keyword" });
    expect(res.scores.overall).toBeGreaterThanOrEqual(0);
    expect(res.scores.overall).toBeLessThanOrEqual(100);
  });

  it("penalizes missing h1", () => {
    const res = calculateAudit("https://example.com", { ...parsedBase, h1: null } as any, { keyword: "Keyword" });
    expect(res.scores.headings).toBeLessThan(100);
    expect(res.issues.some((i) => i.id === "h1_missing")).toBe(true);
  });
});


