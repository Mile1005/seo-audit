export async function fetchKeywordRank(domainUrl: string, keyword: string, provider: string = 'serpapi') {
  const res = await fetch(`https://serpapi.com/search.json?q=${encodeURIComponent(keyword)}&domain=${domainUrl}&apikey=${process.env.SERP_API_KEY}`);
  if (!res.ok) throw new Error('SERP API error');
  const data = await res.json();
  let positionNumber = 0;
  if (data.organic_results && Array.isArray(data.organic_results)) {
    const match = data.organic_results.find((r: any) => r.domain === domainUrl || r.link?.includes(domainUrl));
    if (match) positionNumber = match.position || 0;
  }
  return { position: positionNumber, provider };
}
