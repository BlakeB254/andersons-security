import { NextResponse } from "next/server";
import { z, type ZodSchema } from "zod";

// ---------------------------------------------------------------------------
// Success responses
// ---------------------------------------------------------------------------

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiPaginated<T>(
  data: T[],
  pagination: { page: number; limit: number; total: number }
) {
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages: Math.ceil(pagination.total / pagination.limit),
    },
  });
}

// ---------------------------------------------------------------------------
// Error responses
// ---------------------------------------------------------------------------

export function apiError(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    { success: false, error: message, ...(details !== undefined && { details }) },
    { status }
  );
}

export function apiNotFound(resource = "Resource") {
  return apiError(`${resource} not found`, 404);
}

export function apiUnauthorized(message = "Unauthorized") {
  return apiError(message, 401);
}

// ---------------------------------------------------------------------------
// Body validation
// ---------------------------------------------------------------------------

export async function safeValidateBody<T>(
  request: Request,
  schema: ZodSchema<T>
): Promise<{ data: T; error?: never } | { data?: never; error: NextResponse }> {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);
    if (!result.success) {
      return {
        error: apiError("Validation failed", 400, result.error.flatten()),
      };
    }
    return { data: result.data };
  } catch {
    return { error: apiError("Invalid JSON body", 400) };
  }
}

// ---------------------------------------------------------------------------
// Pagination helpers
// ---------------------------------------------------------------------------

export function parsePagination(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("limit") || "20", 10))
  );
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

// ---------------------------------------------------------------------------
// Slug & booking number generation
// ---------------------------------------------------------------------------

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateBookingNumber(): string {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `BK-${date}-${rand}`;
}
