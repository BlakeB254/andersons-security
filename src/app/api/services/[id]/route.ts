import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { apiSuccess, apiError, apiNotFound, safeValidateBody } from "@/lib/api/utils";
import { eq } from "drizzle-orm";

type RouteContext = { params: Promise<{ id: string }> };

// ---------------------------------------------------------------------------
// GET /api/services/[id]
// ---------------------------------------------------------------------------

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  try {
    const [service] = await db
      .select()
      .from(services)
      .where(eq(services.id, id))
      .limit(1);

    if (!service) return apiNotFound("Service");

    return apiSuccess(service);
  } catch (err) {
    console.error("[services] GET by id error:", err);
    return apiError("Failed to fetch service", 500);
  }
}

// ---------------------------------------------------------------------------
// PATCH /api/services/[id]
// ---------------------------------------------------------------------------

const updateServiceSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().optional(),
  icon: z.string().optional(),
  tagline: z.string().optional(),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  baseRate: z.number().int().optional(),
  features: z.array(z.any()).optional(),
  benefits: z.array(z.string()).optional(),
  idealFor: z.array(z.string()).optional(),
  imageUrl: z.string().url().optional().nullable(),
  featured: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  const parsed = await safeValidateBody(request, updateServiceSchema);
  if (parsed.error) return parsed.error;

  try {
    const [updated] = await db
      .update(services)
      .set(parsed.data)
      .where(eq(services.id, id))
      .returning();

    if (!updated) return apiNotFound("Service");

    return apiSuccess(updated);
  } catch (err) {
    console.error("[services] PATCH error:", err);
    return apiError("Failed to update service", 500);
  }
}

// ---------------------------------------------------------------------------
// DELETE /api/services/[id]
// ---------------------------------------------------------------------------

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  try {
    const [deleted] = await db
      .delete(services)
      .where(eq(services.id, id))
      .returning();

    if (!deleted) return apiNotFound("Service");

    return apiSuccess({ message: "Service deleted" });
  } catch (err) {
    console.error("[services] DELETE error:", err);
    return apiError("Failed to delete service", 500);
  }
}
