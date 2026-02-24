import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { apiPaginated, apiError, parsePagination } from "@/lib/api/utils";
import { eq, desc, and, count, type SQL } from "drizzle-orm";

// ---------------------------------------------------------------------------
// GET /api/bookings
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, offset } = parsePagination(searchParams);

    const status = searchParams.get("status");
    const serviceType = searchParams.get("serviceType");

    // Build filters
    const conditions: SQL[] = [];
    if (status) conditions.push(eq(bookings.status, status));
    if (serviceType) conditions.push(eq(bookings.serviceType, serviceType));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    // Parallel: fetch rows + count
    const [rows, totalResult] = await Promise.all([
      db
        .select()
        .from(bookings)
        .where(where)
        .orderBy(desc(bookings.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ value: count() })
        .from(bookings)
        .where(where),
    ]);

    const total = totalResult[0]?.value ?? 0;

    return apiPaginated(rows, { page, limit, total });
  } catch (err) {
    console.error("[bookings] GET error:", err);
    return apiError("Failed to fetch bookings", 500);
  }
}
