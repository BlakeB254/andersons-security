import { NextRequest } from "next/server";
import { z } from "zod";
import { apiSuccess, safeValidateBody } from "@/lib/api/utils";
import { calculatePricing, isRushBooking } from "@/lib/pricing";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const calculateSchema = z.object({
  serviceType: z.enum(["standard", "transport"]),
  isArmed: z.boolean(),
  numberOfGuards: z.number().int().min(1).max(10),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Must be HH:mm format"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Must be HH:mm format"),
  days: z.number().int().min(1).max(30),
  serviceDate: z.string().datetime({ offset: true }).or(z.string().datetime()),
  sopAddOn: z.boolean(),
});

// ---------------------------------------------------------------------------
// POST /api/bookings/calculate
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const parsed = await safeValidateBody(request, calculateSchema);
  if (parsed.error) return parsed.error;

  const { serviceType, isArmed, numberOfGuards, startTime, endTime, days, serviceDate, sopAddOn } =
    parsed.data;

  const rush = isRushBooking(new Date(serviceDate));

  const breakdown = calculatePricing({
    serviceType,
    isArmed,
    numberOfGuards,
    startTime,
    endTime,
    days,
    isRushBooking: rush,
    sopAddOn,
  });

  return apiSuccess({ ...breakdown, isRushBooking: rush });
}
