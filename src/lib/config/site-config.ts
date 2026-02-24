import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteConfig } from "@/lib/db/schema";

// ---------------------------------------------------------------------------
// In-memory cache with TTL
// ---------------------------------------------------------------------------

const TTL_MS =
  process.env.NODE_ENV === "production" ? 60_000 : 0; // 60s prod, no cache in dev

interface CacheEntry {
  value: unknown;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();

function getCached(key: string): unknown | undefined {
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (TTL_MS > 0 && Date.now() > entry.expiresAt) {
    cache.delete(key);
    return undefined;
  }
  return entry.value;
}

function setCached(key: string, value: unknown) {
  if (TTL_MS <= 0) return;
  cache.set(key, { value, expiresAt: Date.now() + TTL_MS });
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getSiteConfig<T = unknown>(
  key: string
): Promise<T | null> {
  // Check cache first
  const cached = getCached(key);
  if (cached !== undefined) return cached as T;

  // Read from DB
  const row = await db
    .select()
    .from(siteConfig)
    .where(eq(siteConfig.key, key))
    .limit(1);

  if (row.length === 0) return null;

  const value = row[0].value as T;
  setCached(key, value);
  return value;
}

export async function updateSiteConfig(
  key: string,
  value: unknown
): Promise<void> {
  await db
    .insert(siteConfig)
    .values({ key, value })
    .onConflictDoUpdate({
      target: siteConfig.key,
      set: { value, updatedAt: new Date() },
    });

  // Invalidate cache for this key
  cache.delete(key);
}

export function invalidateCache(key?: string): void {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
}
