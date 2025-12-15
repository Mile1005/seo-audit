// API Client for frontend requests
// Uses browser's native fetch API for maximum compatibility

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// API Client Configuration
interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

// Request Options
interface RequestOptions extends Omit<RequestInit, "cache"> {
  timeout?: number;
  retries?: number;
  cache?: boolean; // Our custom cache flag (not the browser cache)
}

class ApiClient {
  private baseURL: string;
  private timeout: number;
  private retries: number;
  private retryDelay: number;
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();

  constructor(config: ApiClientConfig = {}) {
    this.baseURL = config.baseURL || "";
    this.timeout = config.timeout || 30000;
    this.retries = config.retries || 3;
    this.retryDelay = config.retryDelay || 1000;
  }

  // Main request method with retry logic
  async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const url = this.baseURL + endpoint;
    const cacheKey = `${options.method || "GET"}-${url}-${JSON.stringify(options.body || {})}`;

    console.log(`API Request: ${options.method || "GET"} ${url}`);

    // Check cache for GET requests
    if ((!options.method || options.method === "GET") && options.cache !== false) {
      const cached = this.getCached(cacheKey);
      if (cached) {
        console.log(`Cache hit for ${url}`);
        return cached;
      }
    }

    let lastError: Error | null = null;
    const maxRetries = options.retries ?? this.retries;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), options.timeout || this.timeout);

        // Separate our custom options from standard RequestInit options
        const { timeout, retries, cache, ...fetchOptions } = options;

        console.log(`Attempt ${attempt + 1}/${maxRetries + 1} for ${url}`);

        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
        });

        clearTimeout(timeoutId);

        console.log(`Response received: ${response.status} ${response.statusText}`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const result: ApiResponse<T> = {
          success: true,
          data,
        };

        console.log(`Request successful for ${url}`);

        // Cache successful GET requests
        if ((!options.method || options.method === "GET") && options.cache !== false) {
          this.setCache(cacheKey, result, 5 * 60 * 1000); // 5 minutes
        }

        return result;
      } catch (error) {
        lastError = error as Error;
        console.error(`Request error (attempt ${attempt + 1}):`, lastError);

        // Don't retry on certain errors
        if (
          error instanceof Error &&
          (error.message.includes("400") || // Bad Request
            error.message.includes("401") || // Unauthorized
            error.message.includes("403") || // Forbidden
            error.message.includes("404")) // Not Found
        ) {
          break;
        }

        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
          await this.delay(this.retryDelay * Math.pow(2, attempt));
        }
      }
    }

    return {
      success: false,
      error: lastError?.message || "Request failed",
    };
  }

  // HTTP Methods
  async get<T = any>(
    endpoint: string,
    options: Omit<RequestOptions, "method" | "body"> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T = any>(
    endpoint: string,
    data?: any,
    options: Omit<RequestOptions, "method"> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T = any>(
    endpoint: string,
    data?: any,
    options: Omit<RequestOptions, "method"> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T = any>(
    endpoint: string,
    options: Omit<RequestOptions, "method" | "body"> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }

  // Cache management
  private getCached(key: string) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private setCache(key: string, data: any, ttl: number) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  // Utility methods
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  clearCache(): void {
    this.cache.clear();
  }
}

// API Endpoints Interface
export interface CrawlStartRequest {
  startUrl: string;
  limit?: number;
  mode?: "sync" | "async" | "auto";
}

export interface CrawlResult {
  crawlId?: string;
  status: "processing" | "completed" | "failed";
  result?: {
    startUrl: string;
    totalPages: number;
    successfulPages: number;
    failedPages: number;
    averageLoadTime: number;
    crawlTime: number;
    pages: any[];
    issues: any;
    robotsTxt: any;
    sitemapXml: any;
    brokenLinks: any[];
    timestamp: string;
  };
  error?: string;
  message?: string;
  estimatedTime?: string;
}

export interface AuditStartRequest {
  url: string;
  email?: string;
  keyword?: string;
  options?: any;
}

export interface AuditResult {
  auditId: string;
  status: "queued" | "running" | "completed" | "failed";
  result?: any;
  message?: string;
  estimatedTime?: string;
}

export interface CompetitorAnalysisRequest {
  targetDomain: string;
  competitors: string[];
  keywords?: string[];
}

export interface KeywordTrackingRequest {
  domain: string;
  keywords: string[];
  searchEngine?: "google" | "bing";
  location?: string;
}

export interface AIAnalysisRequest {
  content: string;
  analysisType: "seo" | "content" | "technical";
  context?: any;
}

// Pre-configured API client instance
export const apiClient = new ApiClient({
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
});

// Specific API methods
export const api = {
  // Crawl endpoints
  crawl: {
    start: (data: CrawlStartRequest) => apiClient.post<CrawlResult>("/api/crawl/start", data),
    get: (id: string) => apiClient.get<CrawlResult>(`/api/crawl/get?id=${id}`),
    export: (id: string, format: "json" | "csv" = "json") =>
      apiClient.get(`/api/crawl/export?id=${id}&format=${format}`),
  },

  // SEO Audit endpoints
  audit: {
    start: (data: AuditStartRequest) => apiClient.post<AuditResult>("/api/seo-audit/start", data),
    get: (id: string) => apiClient.get<AuditResult>(`/api/seo-audit/get?id=${id}`),
    results: (id: string) => apiClient.get(`/api/seo-audit/results?id=${id}`),
  },

  // Competitor Analysis (to be implemented)
  competitor: {
    analyze: (data: CompetitorAnalysisRequest) => apiClient.post("/api/competitor/analyze", data),
  },

  // Keyword Tracking (to be implemented)
  keywords: {
    track: (data: KeywordTrackingRequest) => apiClient.post("/api/keywords/track", data),
    get: (domain: string) => apiClient.get(`/api/keywords/get?domain=${domain}`),
  },

  // AI Assistant (to be implemented)
  ai: {
    analyze: (data: AIAnalysisRequest) => apiClient.post("/api/ai/analyze", data),
    chat: (message: string, context?: any) => apiClient.post("/api/ai/chat", { message, context }),
  },

  // User & Auth
  user: {
    profile: () => apiClient.get("/api/private/me"),
    usage: () => apiClient.get("/api/user/usage"),
  },

  // Projects
  projects: {
    list: () => apiClient.get("/api/private/projects"),
    create: (name: string) => apiClient.post("/api/private/projects", { name }),
    get: (id: string) => apiClient.get(`/api/private/projects/${id}`),
    update: (id: string, data: any) => apiClient.put(`/api/private/projects/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/private/projects/${id}`),
  },

  // Contact & Support
  contact: {
    submit: (data: any) => apiClient.post("/api/contact", data),
  },
};

// Error handling helper
export function handleApiError(error: ApiResponse): string {
  if (error.error) {
    return error.error;
  }
  if (error.message) {
    return error.message;
  }
  return "An unexpected error occurred";
}

// Loading state helper
export function isLoading(response: ApiResponse | null): boolean {
  return response === null;
}

// Success check helper
export function isSuccess<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { success: true; data: T } {
  return response.success === true && response.data !== undefined;
}

// Error check helper
export function isError(
  response: ApiResponse
): response is ApiResponse & { success: false; error: string } {
  return response.success === false;
}

export default apiClient;
