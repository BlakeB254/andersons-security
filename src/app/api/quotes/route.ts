import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { quoteRequests } from "@/lib/db/schema";
import { apiSuccess, apiError, apiPaginated, safeValidateBody, parsePagination } from "@/lib/api/utils";
import { eq, desc, and, count, type SQL } from "drizzle-orm";
import { pricing } from "@/config/brand";

// ---------------------------------------------------------------------------
// GET /api/quotes — list quote requests
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit, offset } = parsePagination(searchParams);

    const status = searchParams.get("status");

    const conditions: SQL[] = [];
    if (status) conditions.push(eq(quoteRequests.status, status));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [rows, totalResult] = await Promise.all([
      db
        .select()
        .from(quoteRequests)
        .where(where)
        .orderBy(desc(quoteRequests.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ value: count() })
        .from(quoteRequests)
        .where(where),
    ]);

    const total = totalResult[0]?.value ?? 0;

    return apiPaginated(rows, { page, limit, total });
  } catch (err) {
    console.error("[quotes] GET error:", err);
    return apiError("Failed to fetch quote requests", 500);
  }
}

// ---------------------------------------------------------------------------
// POST /api/quotes — create quote request
// ---------------------------------------------------------------------------

const quoteSchema = z.object({
  serviceType: z.string().min(1, "Service type is required"),

  // Service details
  numberOfGuards: z.number().int().min(1).optional(),
  hoursPerDay: z.number().int().min(1).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  recurring: z.boolean().optional(),

  // Site
  siteName: z.string().optional(),
  siteType: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  specialInstructions: z.string().optional(),

  // Contact
  contactName: z.string().min(1, "Contact name is required"),
  company: z.string().optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  preferredContact: z.enum(["email", "phone", "text"]).optional(),
});

export async function POST(request: NextRequest) {
  const parsed = await safeValidateBody(request, quoteSchema);
  if (parsed.error) return parsed.error;

  const data = parsed.data;

  // Simple estimated total: numberOfGuards * hoursPerDay * standard baseRate
  let estimatedTotal: number | null = null;
  if (data.numberOfGuards && data.hoursPerDay) {
    estimatedTotal = data.numberOfGuards * data.hoursPerDay * pricing.standard.baseRate;
  }

  try {
    const [created] = await db
      .insert(quoteRequests)
      .values({
        serviceType: data.serviceType,
        status: "new",

        numberOfGuards: data.numberOfGuards ?? null,
        hoursPerDay: data.hoursPerDay ?? null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        recurring: data.recurring ?? false,

        siteName: data.siteName ?? null,
        siteType: data.siteType ?? null,
        address: data.address ?? null,
        city: data.city ?? null,
        state: data.state ?? null,
        zipCode: data.zipCode ?? null,
        specialInstructions: data.specialInstructions ?? null,

        contactName: data.contactName,
        company: data.company ?? null,
        email: data.email,
        phone: data.phone ?? null,
        preferredContact: data.preferredContact ?? "email",

        estimatedTotal,
      })
      .returning();

    return apiSuccess(created, 201);
  } catch (err) {
    console.error("[quotes] POST error:", err);
    return apiError("Failed to create quote request", 500);
  }
}
