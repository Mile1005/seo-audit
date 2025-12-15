import { useState, useEffect, useCallback, useRef } from "react";
import { api, ApiResponse, isSuccess, isError, handleApiError } from "../lib/api-client";

// Generic API state
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

// Hook options
interface UseApiOptions {
  immediate?: boolean;
  cacheKey?: string;
  cacheTTL?: number;
  retry?: boolean;
  retryAttempts?: number;
  retryDelay?: number;
}

// Generic API hook
export function useApi<T = any>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
) {
  const {
    immediate = false,
    cacheKey,
    cacheTTL = 5 * 60 * 1000, // 5 minutes
    retry = true,
    retryAttempts = 3,
    retryDelay = 1000,
  } = options;

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
    lastUpdated: null,
  });

  const retryCount = useRef(0);
  const cache = useRef<Map<string, { data: T; timestamp: number }>>(new Map());

  // Check cache
  const getCachedData = useCallback(
    (key: string): T | null => {
      if (!cacheKey) return null;
      const cached = cache.current.get(key);
      if (cached && Date.now() - cached.timestamp < cacheTTL) {
        return cached.data;
      }
      cache.current.delete(key);
      return null;
    },
    [cacheKey, cacheTTL]
  );

  // Set cache
  const setCachedData = useCallback(
    (key: string, data: T) => {
      if (cacheKey) {
        cache.current.set(key, { data, timestamp: Date.now() });
      }
    },
    [cacheKey]
  );

  // Execute API call
  const execute = useCallback(async () => {
    // Check cache first
    if (cacheKey) {
      const cached = getCachedData(cacheKey);
      if (cached) {
        setState((prev) => ({
          ...prev,
          data: cached,
          loading: false,
          error: null,
          lastUpdated: Date.now(),
        }));
        return cached;
      }
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiCall();

      if (isSuccess(response)) {
        const data = response.data;
        setState({
          data,
          loading: false,
          error: null,
          lastUpdated: Date.now(),
        });

        // Cache successful response
        if (cacheKey) {
          setCachedData(cacheKey, data);
        }

        retryCount.current = 0;
        return data;
      } else {
        throw new Error(handleApiError(response));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

      // Retry logic
      if (retry && retryCount.current < retryAttempts) {
        retryCount.current++;
        setTimeout(() => {
          execute();
        }, retryDelay * retryCount.current);
        return;
      }

      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));

      retryCount.current = 0;
      throw error;
    }
  }, [apiCall, cacheKey, getCachedData, setCachedData, retry, retryAttempts, retryDelay]);

  // Auto-execute on mount if immediate is true
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  // Reset function
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      lastUpdated: null,
    });
    retryCount.current = 0;
  }, []);

  // Refresh function (ignores cache)
  const refresh = useCallback(async () => {
    if (cacheKey) {
      cache.current.delete(cacheKey);
    }
    return execute();
  }, [execute, cacheKey]);

  return {
    ...state,
    execute,
    reset,
    refresh,
    isSuccess: state.data !== null && state.error === null,
    isError: state.error !== null,
  };
}

// Specific hooks for common API calls

// Crawl operations
export function useCrawlStart() {
  return useApi(async () => api.crawl.start({ startUrl: "", limit: 10 }), { immediate: false });
}

export function useCrawlStatus(crawlId: string | null) {
  return useApi(
    async () => {
      if (!crawlId) throw new Error("Crawl ID is required");
      return api.crawl.get(crawlId);
    },
    {
      immediate: !!crawlId,
      cacheKey: crawlId ? `crawl-${crawlId}` : undefined,
      cacheTTL: 10000, // 10 seconds for real-time data
    }
  );
}

// SEO Audit operations
export function useAuditStart() {
  return useApi(async () => api.audit.start({ url: "" }), { immediate: false });
}

export function useAuditStatus(auditId: string | null) {
  return useApi(
    async () => {
      if (!auditId) throw new Error("Audit ID is required");
      return api.audit.get(auditId);
    },
    {
      immediate: !!auditId,
      cacheKey: auditId ? `audit-${auditId}` : undefined,
      cacheTTL: 10000, // 10 seconds for real-time data
    }
  );
}

// User profile
export function useUserProfile() {
  return useApi(() => api.user.profile(), {
    immediate: true,
    cacheKey: "user-profile",
    cacheTTL: 10 * 60 * 1000, // 10 minutes
  });
}

// Projects
export function useProjects() {
  return useApi(() => api.projects.list(), {
    immediate: true,
    cacheKey: "projects",
    cacheTTL: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProject(projectId: string | null) {
  return useApi(
    async () => {
      if (!projectId) throw new Error("Project ID is required");
      return api.projects.get(projectId);
    },
    {
      immediate: !!projectId,
      cacheKey: projectId ? `project-${projectId}` : undefined,
      cacheTTL: 5 * 60 * 1000, // 5 minutes
    }
  );
}

// Form submission hook
export function useFormSubmission<TRequest = any, TResponse = any>() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const submit = useCallback(
    async (
      apiCall: (data: TRequest) => Promise<ApiResponse<TResponse>>,
      data: TRequest,
      onSuccess?: (response: TResponse) => void
    ) => {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      try {
        const response = await apiCall(data);

        if (isSuccess(response)) {
          setSubmitSuccess(true);
          onSuccess?.(response.data);
          return response.data;
        } else {
          throw new Error(handleApiError(response));
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Submission failed";
        setSubmitError(errorMessage);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(false);
  }, []);

  return {
    isSubmitting,
    submitError,
    submitSuccess,
    submit,
    reset,
  };
}

// Polling hook for real-time updates
export function usePolling<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  interval: number = 5000,
  condition: (data: T | null) => boolean = () => true
) {
  const { data, loading, error, execute } = useApi(apiCall, { immediate: true });
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (data && condition(data)) {
      // Start polling
      intervalRef.current = setInterval(() => {
        execute();
      }, interval);
    } else {
      // Stop polling
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [data, execute, interval, condition]);

  return { data, loading, error };
}

// Mutation hook for create/update/delete operations
export function useMutation<TRequest = any, TResponse = any>() {
  const [state, setState] = useState<{
    data: TResponse | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = useCallback(
    async (apiCall: (data: TRequest) => Promise<ApiResponse<TResponse>>, data: TRequest) => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await apiCall(data);

        if (isSuccess(response)) {
          setState({
            data: response.data,
            loading: false,
            error: null,
          });
          return response.data;
        } else {
          throw new Error(handleApiError(response));
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Mutation failed";
        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });
        throw error;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    mutate,
    reset,
    isLoading: state.loading,
    isSuccess: state.data !== null && state.error === null,
    isError: state.error !== null,
  };
}
