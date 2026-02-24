import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { apiSuccess, apiError, safeValidateBody, generateSlug } from "@/lib/api/utils";
import { asc } from "drizzle-orm";

// ---------------------------------------------------------------------------
// GET /api/services — list all services ordered by sortOrder
// ---------------------------------------------------------------------------

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(services)
      .orderBy(asc(services.sortOrder));

    return apiSuccess(rows);
  } catch (err) {
    console.error("[services] GET error:", err);
    return apiError("Failed to fetch services", 500);
  }
}

// ---------------------------------------------------------------------------
// POST /api/services — create service
// ---------------------------------------------------------------------------

const createServiceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  icon: z.string().optional(),
  tagline: z.string().optional(),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  baseRate: z.number().int().optional(),
  features: z.array(z.any()).optional(),
  benefits: z.array(z.string()).optional(),
  idealFor: z.array(z.string()).optional(),
  imageUrl: z.string().url().optional(),
  featured: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export async function POST(request: NextRequest) {
  const parsed = await safeValidateBody(request, createServiceSchema);
  if (parsed.error) return parsed.error;

  const data = parsed.data;
  const slug = data.slug || generateSlug(data.title);

  try {
    const [created] = await db
      .insert(services)
      .values({
        title: data.title,
        slug,
        icon: data.icon ?? null,
        tagline: data.tagline ?? null,
        shortDescription: data.shortDescription ?? null,
        fullDescription: data.fullDescription ?? null,
        baseRate: data.baseRate ?? null,
        features: data.features ?? null,
        benefits: data.benefits ?? null,
        idealFor: data.idealFor ?? null,
        imageUrl: data.imageUrl ?? null,
        featured: data.featured ?? false,
        sortOrder: data.sortOrder ?? 0,
      })
      .returning();

    return apiSuccess(created, 201);
  } catch (err) {
    console.error("[services] POST error:", err);
    return apiError("Failed to create service", 500);
  }
}
