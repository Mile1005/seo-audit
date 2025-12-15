import { useEffect, useRef, useCallback, useState } from "react";

// WebSocket connection states
export type ConnectionState = "connecting" | "connected" | "disconnected" | "error";

// WebSocket message types
export interface WebSocketMessage {
  type: string;
  data: any;
  timestamp?: number;
}

// WebSocket client configuration
interface WebSocketConfig {
  url: string;
  protocols?: string | string[];
  reconnectAttempts?: number;
  reconnectInterval?: number;
  heartbeatInterval?: number;
}

// Real-time update types
export interface CrawlUpdate {
  crawlId: string;
  status: "processing" | "completed" | "failed";
  progress?: number;
  currentUrl?: string;
  pagesDiscovered?: number;
  pagesProcessed?: number;
  error?: string;
}

export interface AuditUpdate {
  auditId: string;
  status: "queued" | "running" | "completed" | "failed";
  progress?: number;
  currentCheck?: string;
  checksCompleted?: number;
  totalChecks?: number;
  error?: string;
}

export interface JobUpdate {
  jobId: string;
  type: "crawl" | "audit" | "competitor" | "keywords";
  status: string;
  progress?: number;
  data?: any;
  error?: string;
}

class WebSocketClient {
  private ws: WebSocket | null = null;
  private config: WebSocketConfig;
  private reconnectCount = 0;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private messageHandlers: Map<string, Set<(data: any) => void>> = new Map();
  private connectionState: ConnectionState = "disconnected";
  private stateHandlers: Set<(state: ConnectionState) => void> = new Set();

  constructor(config: WebSocketConfig) {
    this.config = {
      reconnectAttempts: 5,
      reconnectInterval: 3000,
      heartbeatInterval: 30000,
      ...config,
    };
  }

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.updateConnectionState("connecting");

    try {
      this.ws = new WebSocket(this.config.url, this.config.protocols);
      this.setupEventHandlers();
    } catch (error) {
      console.error("WebSocket connection failed:", error);
      this.updateConnectionState("error");
      this.attemptReconnect();
    }
  }

  disconnect(): void {
    this.clearTimers();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.updateConnectionState("disconnected");
  }

  send(message: WebSocketMessage): boolean {
    if (this.ws?.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(
          JSON.stringify({
            ...message,
            timestamp: Date.now(),
          })
        );
        return true;
      } catch (error) {
        console.error("Failed to send WebSocket message:", error);
        return false;
      }
    }
    return false;
  }

  // Subscribe to specific message types
  subscribe(messageType: string, handler: (data: any) => void): () => void {
    if (!this.messageHandlers.has(messageType)) {
      this.messageHandlers.set(messageType, new Set());
    }
    this.messageHandlers.get(messageType)!.add(handler);

    // Return unsubscribe function
    return () => {
      const handlers = this.messageHandlers.get(messageType);
      if (handlers) {
        handlers.delete(handler);
        if (handlers.size === 0) {
          this.messageHandlers.delete(messageType);
        }
      }
    };
  }

  // Subscribe to connection state changes
  onStateChange(handler: (state: ConnectionState) => void): () => void {
    this.stateHandlers.add(handler);
    return () => this.stateHandlers.delete(handler);
  }

  get state(): ConnectionState {
    return this.connectionState;
  }

  get isConnected(): boolean {
    return this.connectionState === "connected";
  }

  private setupEventHandlers(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log("WebSocket connected");
      this.updateConnectionState("connected");
      this.reconnectCount = 0;
      this.startHeartbeat();
    };

    this.ws.onclose = (event) => {
      console.log("WebSocket closed:", event.code, event.reason);
      this.updateConnectionState("disconnected");
      this.clearTimers();
      if (!event.wasClean) {
        this.attemptReconnect();
      }
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.updateConnectionState("error");
    };

    this.ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };
  }

  private handleMessage(message: WebSocketMessage): void {
    const handlers = this.messageHandlers.get(message.type);
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(message.data);
        } catch (error) {
          console.error("Message handler error:", error);
        }
      });
    }
  }

  private updateConnectionState(state: ConnectionState): void {
    if (this.connectionState !== state) {
      this.connectionState = state;
      this.stateHandlers.forEach((handler) => {
        try {
          handler(state);
        } catch (error) {
          console.error("State handler error:", error);
        }
      });
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectCount >= (this.config.reconnectAttempts || 5)) {
      console.log("Max reconnection attempts reached");
      return;
    }

    this.reconnectCount++;
    const delay = this.config.reconnectInterval! * Math.pow(2, this.reconnectCount - 1); // Exponential backoff

    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectCount})`);

    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, delay);
  }

  private startHeartbeat(): void {
    if (this.config.heartbeatInterval) {
      this.heartbeatTimer = setInterval(() => {
        this.send({ type: "ping", data: {} });
      }, this.config.heartbeatInterval);
    }
  }

  private clearTimers(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
}

// Create WebSocket client instance
let wsClient: WebSocketClient | null = null;

export function getWebSocketClient(): WebSocketClient {
  if (!wsClient) {
    const wsUrl =
      process.env.NEXT_PUBLIC_WS_URL ||
      (typeof window !== "undefined"
        ? `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${window.location.host}/api/ws`
        : `ws://localhost:${process.env.PORT || 3000}/api/ws`);

    wsClient = new WebSocketClient({
      url: wsUrl,
      reconnectAttempts: 5,
      reconnectInterval: 3000,
      heartbeatInterval: 30000,
    });
  }
  return wsClient;
}

// React hook for WebSocket connection
export function useWebSocket() {
  const client = useRef<WebSocketClient>();
  const [connectionState, setConnectionState] = useState<ConnectionState>("disconnected");

  useEffect(() => {
    client.current = getWebSocketClient();

    const unsubscribe = client.current.onStateChange(setConnectionState);
    setConnectionState(client.current.state);

    // Auto-connect
    if (client.current.state === "disconnected") {
      client.current.connect();
    }

    return () => {
      unsubscribe();
    };
  }, []);

  const subscribe = useCallback((messageType: string, handler: (data: any) => void) => {
    return client.current?.subscribe(messageType, handler) || (() => {});
  }, []);

  const send = useCallback((message: WebSocketMessage) => {
    return client.current?.send(message) || false;
  }, []);

  const connect = useCallback(() => {
    client.current?.connect();
  }, []);

  const disconnect = useCallback(() => {
    client.current?.disconnect();
  }, []);

  return {
    connectionState,
    isConnected: connectionState === "connected",
    subscribe,
    send,
    connect,
    disconnect,
  };
}

// Hook for crawl progress updates
export function useCrawlProgress(crawlId: string | null) {
  const [progress, setProgress] = useState<CrawlUpdate | null>(null);
  const { subscribe } = useWebSocket();

  useEffect(() => {
    if (!crawlId) return;

    const unsubscribe = subscribe("crawl_update", (data: CrawlUpdate) => {
      if (data.crawlId === crawlId) {
        setProgress(data);
      }
    });

    return unsubscribe;
  }, [crawlId, subscribe]);

  return progress;
}

// Hook for audit progress updates
export function useAuditProgress(auditId: string | null) {
  const [progress, setProgress] = useState<AuditUpdate | null>(null);
  const { subscribe } = useWebSocket();

  useEffect(() => {
    if (!auditId) return;

    const unsubscribe = subscribe("audit_update", (data: AuditUpdate) => {
      if (data.auditId === auditId) {
        setProgress(data);
      }
    });

    return unsubscribe;
  }, [auditId, subscribe]);

  return progress;
}

// Hook for general job updates
export function useJobProgress(jobId: string | null, jobType?: string) {
  const [progress, setProgress] = useState<JobUpdate | null>(null);
  const { subscribe } = useWebSocket();

  useEffect(() => {
    if (!jobId) return;

    const unsubscribe = subscribe("job_update", (data: JobUpdate) => {
      if (data.jobId === jobId && (!jobType || data.type === jobType)) {
        setProgress(data);
      }
    });

    return unsubscribe;
  }, [jobId, jobType, subscribe]);

  return progress;
}

export default WebSocketClient;
