import puppeteer from "puppeteer";

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
    await page.goto("https://www.aiseoturbo.com", { waitUntil: "networkidle2", timeout: 30000 });
    const html = await page.content();

    console.log("HTML length:", html.length);
    console.log("Has title:", html.includes("<title>"));
    console.log("Has meta description:", html.includes('name="description"'));
    console.log("Has canonical:", html.includes('rel="canonical"'));
    console.log("Has viewport:", html.includes('name="viewport"'));

    // Check for actual content
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    console.log("Title found:", titleMatch ? titleMatch[1] : "No title");

    const descMatch = html.match(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i
    );
    console.log(
      "Meta description found:",
      descMatch ? descMatch[1].substring(0, 100) + "..." : "No meta description"
    );

    const canonicalMatch = html.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i
    );
    console.log("Canonical found:", canonicalMatch ? canonicalMatch[1] : "No canonical");

    console.log("\nFirst 2000 chars of HTML:");
    console.log(html.substring(0, 2000));

    await browser.close();
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
