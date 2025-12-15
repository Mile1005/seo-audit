"use client";

import useSWR from "swr";
import { useState } from "react";

// Types
export interface Project {
  id: string;
  name: string;
  domain: string;
  description?: string;
  status: "ACTIVE" | "PAUSED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string;
    name: string | null;
    email: string;
  };
  _count?: {
    keywords: number;
    siteAudits: number;
    backlinks: number;
  };
}

export interface Keyword {
  id: string;
  keyword: string;
  searchVolume?: number;
  difficulty?: number;
  cpc?: number;
  intent?: "UNKNOWN" | "INFORMATIONAL" | "NAVIGATIONAL" | "TRANSACTIONAL" | "COMMERCIAL";
  status: "ACTIVE" | "PAUSED" | "ARCHIVED";
  country: string;
  device: "DESKTOP" | "MOBILE";
  createdAt: string;
  updatedAt: string;
  project?: {
    id: string;
    name: string;
    domain: string;
  };
}

export interface Backlink {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText?: string;
  domainRating?: number;
  pageRating?: number;
  traffic?: number;
  linkType: "FOLLOW" | "NOFOLLOW";
  status: "ACTIVE" | "LOST" | "BROKEN";
  firstSeen: string;
  lastSeen: string;
  createdAt: string;
  project?: {
    id: string;
    name: string;
    domain: string;
  };
}

export interface AuditData {
  project: {
    id: string;
    name: string;
    domain: string;
    status: string;
  };
  latestAudit?: {
    id: string;
    status: string;
    createdAt: string;
    completedAt?: string;
    totalPages: number;
    totalIssues: number;
    issuesByType: Array<{
      type: string;
      _count: { id: number };
    }>;
    performanceMetrics: {
      overallScore: number;
    };
    summary?: any;
  };
  auditHistory: Array<{
    id: string;
    status: string;
    createdAt: string;
    completedAt?: string;
    totalPages: number;
    totalIssues: number;
    overallScore?: number;
  }>;
  totalAudits: number;
}

export interface SiteAudit {
  id: string;
  url: string;
  status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
  score?: number;
  issues: number;
  createdAt: string;
  completedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Fetcher function
const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      // Add auth headers when implementing authentication
      "x-user-id": "demo-user", // For development
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "An error occurred");
  }

  return res.json();
};

// Projects hooks
export function useProjects(page = 1, limit = 10) {
  const { data, error, mutate, isLoading } = useSWR<
    ApiResponse<{
      projects: Project[];
      pagination: {
        page: number;
        limit: number;
        totalCount: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    }>
  >(`/api/projects?page=${page}&limit=${limit}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  return {
    projects: data?.data?.projects || [],
    pagination: data?.data?.pagination,
    isLoading,
    error: error?.message,
    mutate,
  };
}

export function useProject(projectId: string) {
  const { data, error, mutate, isLoading } = useSWR<ApiResponse<Project>>(
    projectId ? `/api/projects/${projectId}` : null,
    fetcher
  );

  return {
    project: data?.data,
    isLoading,
    error: error?.message,
    mutate,
  };
}

export function useProjectOverview(projectId: string) {
  const { data, error, mutate, isLoading } = useSWR<ApiResponse<any>>(
    projectId ? `/api/projects/${projectId}/overview` : null,
    fetcher
  );

  return {
    overview: data?.data,
    isLoading,
    error: error?.message,
    mutate,
  };
}

export function useCreateProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProject = async (projectData: {
    name: string;
    domain: string;
    description?: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": "demo-user",
        },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create project");
      }

      const result = await res.json();
      return result.data.project;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create project";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createProject, isLoading, error };
}

// Keywords hooks
export function useKeywords(projectId?: string, page = 1, limit = 10, query?: string) {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(projectId && { projectId }),
    ...(query && { query }),
  });

  const { data, error, mutate, isLoading } = useSWR<
    ApiResponse<{
      keywords: Keyword[];
      pagination: {
        page: number;
        limit: number;
        totalCount: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    }>
  >(`/api/keywords?${searchParams}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  return {
    keywords: data?.data?.keywords || [],
    pagination: data?.data?.pagination,
    isLoading,
    error: error?.message,
    mutate,
  };
}

export function useCreateKeyword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createKeyword = async (keywordData: {
    projectId: string;
    keyword: string;
    searchVolume?: number;
    difficulty?: number;
    cpc?: number;
    intent?: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/keywords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": "demo-user",
        },
        body: JSON.stringify(keywordData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create keyword");
      }

      const result = await res.json();
      return result.data.keyword;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create keyword";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createKeyword, isLoading, error };
}

// Backlinks hooks
export function useBacklinks(projectId?: string, page = 1, limit = 10, status?: string) {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(projectId && { projectId }),
    ...(status && { status }),
  });

  const { data, error, mutate, isLoading } = useSWR<
    ApiResponse<{
      backlinks: Backlink[];
      stats: {
        totalBacklinks: number;
        avgDomainRating: number;
        avgPageRating: number;
        avgTraffic: number;
      };
      pagination: {
        page: number;
        limit: number;
        totalCount: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    }>
  >(`/api/backlinks?${searchParams}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  return {
    backlinks: data?.data?.backlinks || [],
    stats: data?.data?.stats,
    pagination: data?.data?.pagination,
    isLoading,
    error: error?.message,
    mutate,
  };
}

export function useCreateBacklink() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBacklink = async (backlinkData: {
    projectId: string;
    sourceUrl: string;
    targetUrl: string;
    anchorText?: string;
    domainRating?: number;
    pageRating?: number;
    traffic?: number;
    linkType?: string;
    status?: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/backlinks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": "demo-user",
        },
        body: JSON.stringify(backlinkData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create backlink");
      }

      const result = await res.json();
      return result.data.backlink;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create backlink";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createBacklink, isLoading, error };
}

// Audit hooks
export function useProjectAudit(projectId: string) {
  const { data, error, mutate, isLoading } = useSWR<ApiResponse<AuditData>>(
    projectId ? `/api/projects/${projectId}/audit` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  return {
    auditData: data?.data,
    isLoading,
    error: error?.message,
    mutate,
  };
}

export function useStartAudit() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startAudit = async (
    projectId: string,
    auditOptions?: {
      auditType?: string;
      settings?: Record<string, any>;
    }
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/projects/${projectId}/audit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": "demo-user",
        },
        body: JSON.stringify(auditOptions || {}),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to start audit");
      }

      const result = await res.json();
      return result.data.audit;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to start audit";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { startAudit, isLoading, error };
}

// Site Audits hooks
export function useSiteAudits(projectId: string, page = 1, limit = 10) {
  const { data, error, mutate, isLoading } = useSWR<
    ApiResponse<{
      audits: SiteAudit[];
      pagination: {
        page: number;
        limit: number;
        totalCount: number;
        totalPages: number;
      };
    }>
  >(projectId ? `/api/projects/${projectId}/audits?page=${page}&limit=${limit}` : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  return {
    audits: data?.data?.audits || [],
    pagination: data?.data?.pagination,
    isLoading,
    error: error?.message,
    mutate,
  };
}

// Optimistic updates helper
export function useOptimisticUpdate<T>(
  key: string,
  mutate: (data?: T | Promise<T> | ((data: T) => T)) => Promise<T | undefined>
) {
  const optimisticUpdate = async (
    updateFn: () => Promise<T>,
    optimisticData: T | ((data: T) => T)
  ) => {
    try {
      // Optimistically update the data
      await mutate(optimisticData);

      // Perform the actual update
      const result = await updateFn();

      // Revalidate to ensure consistency
      await mutate();

      return result;
    } catch (error) {
      // Revert on error
      await mutate();
      throw error;
    }
  };

  return { optimisticUpdate };
}
