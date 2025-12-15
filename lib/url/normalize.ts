export function normalizeUrl(input: string): string | null {
  if (!input) return null;
  let trimmed = input.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = "https://" + trimmed;
  }
  try {
    const u = new URL(trimmed);
    if (!u.hostname || !u.protocol.startsWith("http")) return null;
    return u.toString().replace(/\/$/, ""); // remove trailing slash for consistency
  } catch {
    return null;
  }
}
