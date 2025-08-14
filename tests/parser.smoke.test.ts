import { parseHtml } from "../lib/parse";

test("parser extracts title, meta, headings, links, images", () => {
  const html = `
    <html>
      <head>
        <title>Example Title</title>
        <meta name="description" content="An example meta description" />
        <link rel="canonical" href="https://example.com/" />
        <script type="application/ld+json">{"@type":"Article"}</script>
      </head>
      <body>
        <h1>H1</h1>
        <h2>H2a</h2>
        <h3>H3a</h3>
        <img src="/img.png" alt="Alt text" />
        <a href="/a">A</a>
      </body>
    </html>`;
  const parsed = parseHtml(html, "https://example.com");
  expect(parsed.title).toBe("Example Title");
  expect(parsed.meta).toBe("An example meta description");
  expect(parsed.h1).toBe("H1");
  expect(parsed.h2.length).toBeGreaterThanOrEqual(1);
  expect(parsed.h3.length).toBeGreaterThanOrEqual(1);
  expect(parsed.images.length).toBe(1);
  expect(parsed.internalLinks.length).toBe(1);
  expect(parsed.jsonLdTypes).toContain("Article");
});