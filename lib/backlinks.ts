export async function fetchBacklinkSnapshot(domainUrl: string, provider: string = 'openlinkprofiler') {
  const res = await fetch(`https://openlinkprofiler.org/api/domain/links?domain=${domainUrl}&apikey=${process.env.OLP_API_KEY}`);
  if (!res.ok) {
    if (res.status === 429) throw new Error('Backlink API quota exceeded');
    throw new Error('Backlink API error');
  }
  const data = await res.json();
  return {
    totalBacklinks: data.total_links || 0,
    referringDomains: data.refdomains || 0,
    provider,
  };
}
