"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NotificationItem {
  id: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  readAt?: string;
  createdAt: string;
}

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w ago`;
}

function getLocalePrefix(path: string) {
  const match = path.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)(\/|$)/);
  return match ? `/${match[1]}` : "";
}

export default function NotificationsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const localePrefix = useMemo(() => getLocalePrefix(pathname || ""), [pathname]);
  const withLocale = (href: string) => {
    if (!localePrefix) return href;
    if (href.startsWith(localePrefix + "/")) return href;
    if (href.startsWith("/")) return `${localePrefix}${href}`;
    return `${localePrefix}/${href}`;
  };

  const getHref = (n: NotificationItem) => {
    const rawHref = typeof n.data?.href === "string" ? n.data.href : "";
    if (rawHref) return withLocale(rawHref);

    switch (n.type) {
      case "AUDIT_COMPLETED":
      case "AUDIT_FAILED":
      case "CRITICAL_ISSUE":
        return withLocale("/dashboard/audit");
      case "NEW_BACKLINK":
      case "LOST_BACKLINK":
        return withLocale("/dashboard/backlinks");
      case "KEYWORD_RANK_CHANGE":
      case "REPORT_READY":
        return withLocale("/dashboard/keywords");
      default:
        return withLocale("/dashboard");
    }
  };

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notifications?limit=50", { cache: "no-store" });
      const data = await res.json();
      if (data?.success) {
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const markAllAsRead = async () => {
    const res = await fetch("/api/notifications/mark-all-read", { method: "POST" });
    if (res.ok) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true, readAt: new Date().toISOString() })));
      setUnreadCount(0);
    }
  };

  const markAsRead = async (id: string) => {
    const res = await fetch(`/api/notifications/${id}`, { method: "PATCH" });
    if (res.ok) {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  };

  const deleteNotification = async (id: string) => {
    const res = await fetch(`/api/notifications/${id}`, { method: "DELETE" });
    if (res.ok) {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const handleClick = async (n: NotificationItem) => {
    if (!n.read) await markAsRead(n.id);
    router.push(getHref(n));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</h1>
          <p className="text-slate-600 dark:text-slate-400">Your latest updates and alerts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load}>
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark all read
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-10 text-center text-slate-500">Loading…</div>
          ) : notifications.length === 0 ? (
            <div className="py-10 text-center text-slate-500">No notifications yet.</div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 ${
                    !n.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                  }`}
                  onClick={() => handleClick(n)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-slate-900 dark:text-white break-words">
                          {n.title}
                        </p>
                        {!n.read && <Badge variant="secondary" className="text-xs">Unread</Badge>}
                      </div>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 break-words">{n.message}</p>
                      <p className="mt-2 text-xs text-slate-500">{timeAgo(n.createdAt)}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {!n.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(n.id);
                          }}
                        >
                          Mark read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(n.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
