export const RATE_LIMIT_MAX = 3;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
export const MIN_SUBMIT_MS = 2000;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const RATE_LIMIT_MAX_ENTRIES = 5000;

// Best-effort, per process. This is not a distributed/serverless global quota.
const rateLimitMap = new Map<string, number[]>();

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-real-ip") ??
    headers.get("x-vercel-forwarded-for") ??
    headers.get("x-forwarded-for")?.split(",").pop()?.trim() ??
    "unknown"
  );
}

export function isRateLimited(
  ip: string,
  now: number = Date.now(),
  store: Map<string, number[]> = rateLimitMap
): boolean {
  // Bound memory and remove expired clients, not just the current client's hits.
  for (const [key, hits] of store) {
    if (!hits.some((t) => now - t < RATE_LIMIT_WINDOW_MS)) store.delete(key);
  }
  const timestamps = (store.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  // Fail closed for new clients at capacity; don't evict active quotas.
  if (!store.has(ip) && store.size >= RATE_LIMIT_MAX_ENTRIES) return true;
  store.set(ip, [...timestamps, now]);
  return false;
}

export function allowedOrigins(options: {
  baseUrl: string;
  vercelUrl?: string;
  nodeEnv?: string;
}): Set<string> {
  const origins = new Set<string>([options.baseUrl]);
  if (options.vercelUrl) {
    origins.add(`https://${options.vercelUrl.replace(/\/$/, "")}`);
  }
  if (options.nodeEnv !== "production") {
    origins.add("http://localhost:3000");
    origins.add("http://127.0.0.1:3000");
  }
  return origins;
}

export function isAllowedOrigin(
  origin: string | null,
  options: { baseUrl: string; vercelUrl?: string; nodeEnv?: string }
): boolean {
  if (!origin) return false;
  return allowedOrigins(options).has(origin);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n\0]+/g, " ").trim();
}

export function isHoneypot(company: unknown): boolean {
  return String(company ?? "").trim().length > 0;
}

export function isTooFast(startedAt: unknown, now: number = Date.now()): boolean {
  const t = Number(startedAt);
  return !Number.isFinite(t) || now - t < MIN_SUBMIT_MS;
}
