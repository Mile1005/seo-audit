import { calculateAudit } from "../lib/heuristics";

test("title/meta scoring prefers proper lengths", () => {
  const url = "https://example.com";
  const parsed: any = {
    title: "A perfectly sized title for SEO testing purposes",
    meta: "This meta description is within the recommended character length for SEO and click-through rates.",
    canonical: null,
    h1: "Heading",
    h2: ["Sub1"],
    h3: ["Subsub1"],
    images: [],
    internalLinks: [{ href: url + "/a", anchor: "A" }, { href: url + "/b", anchor: "B" }],
    jsonLdTypes: ["Article"],
    textBlocks: "<ul><li>Item</li></ul> <table></table> ".repeat(20)
  };
  const res = calculateAudit(url, parsed, { keyword: "SEO" });
  expect(res.scores.title_meta).toBeGreaterThanOrEqual(70);
});