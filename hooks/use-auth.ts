import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export interface AuthRequiredOptions {
  redirectTo?: string;
  redirectIfAuthenticated?: string;
  requiredRole?: string;
  onAuthenticated?: (user: any) => void;
  onUnauthenticated?: () => void;
}

export function useAuthRequired(options: AuthRequiredOptions = {}) {
  const {
    redirectTo = "/login",
    redirectIfAuthenticated,
    requiredRole,
    onAuthenticated,
    onUnauthenticated,
  } = options;

  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    const isAuthenticated = !!session?.user;

    // If user should be redirected when authenticated
    if (isAuthenticated && redirectIfAuthenticated) {
      router.push(redirectIfAuthenticated);
      return;
    }

    // If authentication is required but user is not authenticated
    if (!isAuthenticated) {
      setHasAccess(false);
      setIsLoading(false);
      onUnauthenticated?.();

      // Redirect to login with return URL
      const currentPath = window.location.pathname + window.location.search;
      const loginUrl = `${redirectTo}?returnUrl=${encodeURIComponent(currentPath)}`;
      router.push(loginUrl);
      return;
    }

    // Check role requirements
    if (requiredRole && !hasRequiredRole(session.user, requiredRole)) {
      setHasAccess(false);
      setIsLoading(false);
      router.push("/unauthorized");
      return;
    }

    // User has access
    setHasAccess(true);
    setIsLoading(false);
    onAuthenticated?.(session.user);
  }, [
    session,
    status,
    router,
    redirectTo,
    redirectIfAuthenticated,
    requiredRole,
    onAuthenticated,
    onUnauthenticated,
  ]);

  return {
    user: session?.user || null,
    session,
    isLoading: status === "loading" || isLoading,
    isAuthenticated: !!session?.user,
    hasAccess,
  };
}

// Check if user has required role
function hasRequiredRole(user: any, requiredRole: string): boolean {
  // Implement role checking logic based on your user model
  return user?.role === requiredRole || user?.roles?.includes(requiredRole);
}

// Hook for optional authentication (doesn't redirect)
export function useOptionalAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user || null,
    session,
    isLoading: status === "loading",
    isAuthenticated: !!session?.user,
  };
}

// Hook for protecting specific features
export function useFeatureAccess(featureName: string) {
  const { user, isAuthenticated, isLoading } = useOptionalAuth();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    // Check if feature requires authentication
    const publicFeatures = ["seo-audit", "site-crawler"]; // Features that work without login
    const isPublicFeature = publicFeatures.includes(featureName);

    if (isPublicFeature) {
      setHasAccess(true);
      return;
    }

    // Check if user is authenticated for protected features
    if (!isAuthenticated) {
      setHasAccess(false);
      return;
    }

    // Check specific feature permissions
    const hasFeatureAccess = checkFeaturePermission(user, featureName);
    setHasAccess(hasFeatureAccess);
  }, [user, isAuthenticated, isLoading, featureName]);

  return {
    hasAccess,
    isLoading,
    requiresAuth: !hasAccess && !isLoading,
    user,
  };
}

// Check feature-specific permissions
function checkFeaturePermission(user: any, featureName: string): boolean {
  const featurePermissions: Record<string, (user: any) => boolean> = {
    "competitor-analysis": (user) => user?.plan !== "free",
    "keyword-tracking": (user) => user?.plan !== "free",
    "ai-assistant": (user) => user?.plan === "premium",
    "advanced-crawling": (user) => user?.plan !== "free",
  };

  const permissionCheck = featurePermissions[featureName];
  return permissionCheck ? permissionCheck(user) : true;
}

// Hook for login/logout actions
export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = (returnUrl?: string) => {
    const url = returnUrl ? `/login?returnUrl=${encodeURIComponent(returnUrl)}` : "/login";
    router.push(url);
  };

  const logout = async () => {
    // Clear any local storage or cache
    if (typeof window !== "undefined") {
      localStorage.removeItem("user-profile");
      localStorage.removeItem("projects");
    }

    // Redirect to home after logout
    router.push("/");
  };

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  return {
    user: session?.user || null,
    session,
    isLoading: status === "loading",
    isAuthenticated: !!session?.user,
    login,
    logout,
    goToDashboard,
  };
}
