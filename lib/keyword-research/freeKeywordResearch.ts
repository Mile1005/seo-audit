import type {
  KeywordDevice,
  KeywordIntent,
  KeywordResult,
  KeywordTrendPoint,
} from '@/types/keywords'

export interface FreeKeywordResearchParams {
  keyword: string
  location: string
  language: string
  device: KeywordDevice
  projectId?: string
  domain?: string
}

function clamp(num: number, min: number, max: number) {
  return Math.min(max, Math.max(min, num))
}

// Stable FNV-1a 32-bit hash for deterministic pseudo-randomness
function fnv1a32(input: string) {
  let hash = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  // Convert to unsigned 32-bit
  return hash >>> 0
}

export function detectIntent(keyword: string): KeywordIntent {
  const kw = keyword.toLowerCase()

  // Transactional
  if (/(buy|order|coupon|discount|deal|pricing|price|quote|hire|purchase|subscribe)/.test(kw)) {
    return 'TRANSACTIONAL'
  }

  // Commercial investigation
  if (/(best|top|vs\b|compare|comparison|review|alternatives?|software|tool)/.test(kw)) {
    return 'COMMERCIAL'
  }

  // Navigational
  if (/(login|sign\s*in|dashboard|app|website|official|homepage)/.test(kw)) {
    return 'NAVIGATIONAL'
  }

  // Informational
  if (/(how\s+to|what\s+is|why|guide|tutorial|examples?|tips|strategy)/.test(kw)) {
    return 'INFORMATIONAL'
  }

  return 'UNKNOWN'
}

export async function fetchAutocomplete(keyword: string, lang: string): Promise<string[]> {
  const url = `https://www.google.com/complete/search?client=firefox&q=${encodeURIComponent(
    keyword,
  )}&hl=${encodeURIComponent(lang)}`

  try {
    const res = await fetch(url, {
      headers: {
        // Helps avoid occasional 403s in some environments
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
        Accept: 'application/json,text/plain,*/*',
      },
      // Keep free tier fast
      cache: 'no-store',
    })

    if (!res.ok) return []

    const data: unknown = await res.json()
    // Google typically returns: [query, [suggestions...], ...]
    if (Array.isArray(data) && Array.isArray(data[1])) {
      return (data[1] as unknown[])
        .filter((s): s is string => typeof s === 'string')
        .slice(0, 10)
    }

    return []
  } catch {
    return []
  }
}

export function estimateSearchVolumeFromSuggestions(suggestions: string[], seed: number): number {
  // Base range influenced by number of suggestions and seed
  const base = 50 + suggestions.length * 250
  const spread = 6000
  const vol = base + (seed % spread)
  // Keep realistic for MVP
  return clamp(Math.round(vol), 10, 250_000)
}

export function estimateDifficulty(keyword: string, suggestions: string[], seed: number): number {
  const words = keyword.trim().split(/\s+/).filter(Boolean).length
  const len = keyword.trim().length

  const suggestionFactor = clamp(suggestions.length * 6, 0, 40)
  const wordFactor = clamp(words * 8, 0, 25)
  const lengthFactor = clamp(Math.floor(len / 6) * 4, 0, 20)
  const seedFactor = (seed % 2000) / 2000 // 0-1

  const difficulty = suggestionFactor + wordFactor + lengthFactor + seedFactor * 20
  return clamp(Number(difficulty.toFixed(1)), 0, 100)
}

export function estimateCompetition(keyword: string, seed: number): number {
  const kw = keyword.toLowerCase()
  const commercialBoost = /(buy|price|pricing|quote|agency|service|software|tool|best)/.test(kw)
    ? 0.15
    : 0

  const base = (seed % 1000) / 1000 // 0-0.999
  return clamp(Number((base + commercialBoost).toFixed(2)), 0, 1)
}

export function estimateCpc(keyword: string, seed: number): number {
  const intent = detectIntent(keyword)
  const intentMultiplier =
    intent === 'TRANSACTIONAL' ? 1.4 : intent === 'COMMERCIAL' ? 1.1 : 0.7

  const base = ((seed >>> 8) % 800) / 100 // 0-7.99
  return clamp(Number((base * intentMultiplier).toFixed(2)), 0, 25)
}

export function generateTrend(keyword: string, seed: number, points = 12): KeywordTrendPoint[] {
  const now = new Date()
  const kw = keyword.toLowerCase()
  const hasYear = /\b20\d{2}\b/.test(kw)

  const base = 35 + (seed % 30) // 35-64
  const slope = ((seed >>> 16) % 15) / 10 - 0.7 // ~ -0.7 .. 0.8
  const yearBoost = hasYear ? 12 : 0

  const result: KeywordTrendPoint[] = []

  for (let i = points - 1; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1))
    const seasonal = Math.sin((i / 12) * Math.PI * 2) * 8
    const value = clamp(Math.round(base + slope * (points - 1 - i) * 6 + seasonal + yearBoost), 0, 100)

    result.push({ date: d.toISOString(), value })
  }

  return result
}

export async function runFreeKeywordResearch(
  params: FreeKeywordResearchParams,
): Promise<KeywordResult> {
  const keyword = params.keyword.trim()
  const seed = fnv1a32(`${keyword}|${params.location}|${params.language}|${params.device}`)

  const suggestions = await fetchAutocomplete(keyword, params.language)

  const searchVolume = estimateSearchVolumeFromSuggestions(suggestions, seed)
  const difficulty = estimateDifficulty(keyword, suggestions, seed)
  const competition = estimateCompetition(keyword, seed)
  const cpc = estimateCpc(keyword, seed)
  const intent = detectIntent(keyword)

  return {
    id: `kw_${seed.toString(16)}`,
    keyword,
    searchVolume,
    difficulty,
    cpc,
    competition,
    intent,
    status: 'ACTIVE',
    country: params.location,
    device: params.device,
    createdAt: new Date().toISOString(),
    relatedKeywords: suggestions,
    trend: generateTrend(keyword, seed, 12),
  }
}
