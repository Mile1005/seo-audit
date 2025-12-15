export type KeywordDevice = "DESKTOP" | "MOBILE";

export type KeywordStatus = "ACTIVE" | "PAUSED" | "ARCHIVED";

export type KeywordIntent =
  | "INFORMATIONAL"
  | "COMMERCIAL"
  | "TRANSACTIONAL"
  | "NAVIGATIONAL"
  | "UNKNOWN";

export interface KeywordTrendPoint {
  date: string; // ISO
  value: number; // 0-100
}

export interface KeywordResult {
  id: string;
  keyword: string;
  searchVolume: number;
  difficulty: number; // 0-100
  cpc: number; // USD
  competition: number; // 0-1
  intent: KeywordIntent;
  status: KeywordStatus;
  country: string;
  device: KeywordDevice;
  createdAt: string;

  // Optional enrichments
  relatedKeywords?: string[];
  trend?: KeywordTrendPoint[];
}
