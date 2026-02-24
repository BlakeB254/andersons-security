import { NextRequest } from "next/server";
import { z } from "zod";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { apiSuccess, apiError, safeValidateBody, generateBookingNumber } from "@/lib/api/utils";
import { calculatePricing, isRushBooking } from "@/lib/pricing";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const createIntentSchema = z.object({
  // Service details
  serviceType: z.enum(["standard", "transport"]),
  isArmed: z.boolean(),
  numberOfGuards: z.number().int().min(1).max(10),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
  days: z.number().int().min(1).max(30),
  serviceDate: z.string(),
  endDate: z.string().optional(),
  sopAddOn: z.boolean(),

  // Event details
  eventCategory: z.string().min(1),
  eventType: z.string().optional(),
  siteName: z.string().optional(),
  siteType: z.string().optional(),

  // Location
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),

  // Customer
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  company: z.string().optional(),

  // SOP
  hasExistingSOP: z.boolean().optional(),
});

// ---------------------------------------------------------------------------
// POST /api/bookings/stripe/create-intent
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const parsed = await safeValidateBody(request, createIntentSchema);
  if (parsed.error) return parsed.error;

  const data = parsed.data;

  // Check for Stripe key
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    console.error("[stripe] STRIPE_SECRET_KEY not configured");
    return apiError("Payment processing is not configured", 503);
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2025-02-24.acacia" });

  // Calculate pricing
  const rush = isRushBooking(new Date(data.serviceDate));
  const breakdown = calculatePricing({
    serviceType: data.serviceType,
    isArmed: data.isArmed,
    numberOfGuards: data.numberOfGuards,
    startTime: data.startTime,
    endTime: data.endTime,
    days: data.days,
    isRushBooking: rush,
    sopAddOn: data.sopAddOn,
  });

  const bookingNumber = generateBookingNumber();

  try {
    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: breakdown.total,
      currency: "usd",
      metadata: {
        bookingNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        serviceType: data.serviceType,
      },
      receipt_email: data.customerEmail,
    });

    // Create booking record in DB
    await db.insert(bookings).values({
      bookingNumber,
      status: "pending_payment",
      serviceType: data.serviceType,
      isArmed: data.isArmed,
      numberOfGuards: data.numberOfGuards,

      eventCategory: data.eventCategory,
      eventType: data.eventType ?? null,
      siteName: data.siteName ?? null,
      siteType: data.siteType ?? null,

      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,

      serviceDate: new Date(data.serviceDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      startTime: data.startTime,
      endTime: data.endTime,
      isMultiDay: data.days > 1,
      isRushBooking: rush,

      hasExistingSOP: data.hasExistingSOP ?? false,
      sopAddOn: data.sopAddOn,

      pricing: breakdown,
      total: breakdown.total,

      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone ?? null,
      company: data.company ?? null,

      paymentStatus: "pending",
      stripePaymentIntentId: paymentIntent.id,
    });

    return apiSuccess({
      clientSecret: paymentIntent.client_secret,
      bookingNumber,
    });
  } catch (err) {
    console.error("[stripe] create-intent error:", err);
    return apiError("Failed to create payment intent", 500);
  }
}
