import * as cheerio from "cheerio";

function sameHost(href: string, base: URL) {
  try {
    const u = new URL(href, base);
    return u.host === base.host;
  } catch {
    return false;
  }
}

export function parseHtml(html: string, baseUrl: string) {
  const $ = cheerio.load(html);
  const base = new URL(baseUrl);

  const title = ($("title").first().text() || "").trim() || null;
  const meta = ($('meta[name="description"]').attr("content") || "").trim() || null;
  const canonical = ($('link[rel="canonical"]').attr("href") || "").trim() || null;
  const h1 = ($("h1").first().text() || "").trim() || null;
  const h2 = $("h2").map((_, el) => $(el).text().trim()).get();
  const h3 = $("h3").map((_, el) => $(el).text().trim()).get();

  const images = $("img")
    .map((_, el) => ({ src: ($(el).attr("src") || "").trim(), alt: ($(el).attr("alt") || "").trim() || null }))
    .get()
    .filter((x) => x.src);

  const internalLinks = $("a[href]")
    .map((_, el) => ({ href: ($(el).attr("href") || "").trim(), anchor: ($(el).text() || "").trim() || null }))
    .get()
    .filter((x) => x.href)
    .map((x) => {
      try {
        const u = new URL(x.href, base);
        return { href: u.toString(), anchor: x.anchor };
      } catch {
        return x;
      }
    })
    .filter((x) => {
      try {
        const u = new URL(x.href);
        return u.host === base.host;
      } catch {
        return false;
      }
    });

  const jsonLdTypes: string[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const txt = $(el).contents().text();
    try {
      const obj = JSON.parse(txt);
      if (Array.isArray(obj)) {
        for (const item of obj) {
          const t = item["@type"];
          if (typeof t === "string") jsonLdTypes.push(t);
          else if (Array.isArray(t)) jsonLdTypes.push(...t.filter((v) => typeof v === "string"));
        }
      } else {
        const t = obj["@type"];
        if (typeof t === "string") jsonLdTypes.push(t);
        else if (Array.isArray(t)) jsonLdTypes.push(...t.filter((v) => typeof v === "string"));
      }
    } catch {}
  });

  // Cleaned text for word count/answerability. Remove scripts/styles/nav.
  $("script, style, nav, footer, header").remove();
  const textBlocks = $("body").text().replace(/\s+/g, " ").trim();

  return {
    title,
    meta,
    canonical,
    h1,
    h2,
    h3,
    images,
    internalLinks,
    jsonLdTypes,
    textBlocks
  };
}


