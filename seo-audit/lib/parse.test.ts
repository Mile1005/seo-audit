import { describe, it, expect } from "vitest";
import { parseHtml } from "./parse";

describe("parseHtml", () => {
  it("extracts basic fields", () => {
    const html = `
      <html><head>
        <title>Title</title>
        <meta name="description" content="Desc" />
        <link rel="canonical" href="https://example.com/page" />
        <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article"}</script>
      </head>
      <body>
        <h1>H1</h1>
        <h2>H2</h2>
        <h3>H3</h3>
        <img src="/a.jpg" alt="Alt" />
        <a href="/internal">Internal</a>
        <a href="https://other.com">External</a>
      </body></html>`;
    const res = parseHtml(html, "https://example.com/page");
    expect(res.title).toBe("Title");
    expect(res.meta).toBe("Desc");
    expect(res.h1).toBe("H1");
    expect(res.h2.length).toBe(1);
    expect(res.h3.length).toBe(1);
    expect(res.images.length).toBe(1);
    expect(res.internalLinks.length).toBe(1);
    expect(res.jsonLdTypes.includes("Article")).toBe(true);
  });
});


