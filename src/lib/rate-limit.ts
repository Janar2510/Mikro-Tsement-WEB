/**
 * Lightweight in-memory rate limiter (sliding window).
 *
 * ⚠️ PRODUCTION NOTE: in-memory state does NOT survive across serverless
 * function instances. For Vercel deployments, swap this for Upstash Redis
 * (@upstash/ratelimit) or Vercel KV. The API surface here is intentionally
 * compatible so the swap is a one-file change.
 */

import type { NextRequest } from "next/server";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Periodically purge old buckets to prevent unbounded memory growth.
let lastCleanup = 0;
function maybeCleanup(now: number) {
  if (now - lastCleanup < 60_000) return;
  lastCleanup = now;
  for (const [key, b] of buckets) {
    if (b.resetAt < now) buckets.delete(key);
  }
}

export function getClientKey(req: NextRequest, scope: string): string {
  const fwd = req.headers.get("x-forwarded-for");
  const real = req.headers.get("x-real-ip");
  const ip = (fwd?.split(",")[0] ?? real ?? "unknown").trim();
  return `${scope}:${ip}`;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfter: number; // seconds
}

/**
 * Allow `max` requests per `windowMs` window per key.
 */
export function rateLimit(
  key: string,
  max: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  maybeCleanup(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: max - 1,
      resetAt: now + windowMs,
      retryAfter: 0,
    };
  }

  if (existing.count >= max) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: max - existing.count,
    resetAt: existing.resetAt,
    retryAfter: 0,
  };
}

export function rateLimitHeaders(r: RateLimitResult): Record<string, string> {
  return {
    "X-RateLimit-Remaining": String(r.remaining),
    "X-RateLimit-Reset": String(Math.ceil(r.resetAt / 1000)),
    ...(r.retryAfter > 0 ? { "Retry-After": String(r.retryAfter) } : {}),
  };
}
