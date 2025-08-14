import { calculateAudit } from "../lib/heuristics";

test("missing meta description triggers high severity issue", () => {
  const url = "https://example.com";
  const parsed: any = {
    title: "Short",
    meta: null,
    canonical: null,
    h1: "Heading",
    h2: ["Sub1"],
    h3: [],
    images: [],
    internalLinks: [{ href: url + "/a", anchor: "A" }, { href: url + "/b", anchor: "B" }],
    jsonLdTypes: [],
    textBlocks: "<ul><li>Item</li></ul>"
  };
  const res = calculateAudit(url, parsed, {});
  const metaIssue = res.issues.find((i) => i.id === "meta_length");
  expect(metaIssue).toBeTruthy();
  expect(metaIssue?.severity).toBe("medium");
  expect(typeof metaIssue?.snippet === "string" || metaIssue?.snippet === null).toBe(true);
});