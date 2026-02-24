import { pricing } from "@/config/brand";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PricingInput {
  serviceType: "standard" | "transport";
  isArmed: boolean;
  numberOfGuards: number;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  days: number;
  isRushBooking: boolean;
  sopAddOn: boolean;
}

export interface PricingBreakdown {
  baseRate: number; // cents per hour per guard
  armedUpcharge: number;
  overnightUpcharge: number;
  regularHours: number;
  overnightHours: number;
  totalHours: number;
  subtotal: number; // cents
  rushFee: number; // cents
  sopFee: number; // cents
  total: number; // cents
}

// ---------------------------------------------------------------------------
// Hour breakdown — regular (6am-11pm) vs overnight (11pm-6am)
// ---------------------------------------------------------------------------

function parseTime(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h + m / 60;
}

/**
 * Calculate the number of regular (06:00-23:00) and overnight (23:00-06:00)
 * hours between startTime and endTime.
 *
 * If endTime <= startTime the shift is assumed to cross midnight.
 */
function splitHours(startTime: string, endTime: string): { regular: number; overnight: number } {
  const DAY_START = 6; // 06:00
  const DAY_END = 23; // 23:00

  let start = parseTime(startTime);
  let end = parseTime(endTime);

  // Handle overnight shifts (e.g. 22:00 -> 06:00)
  if (end <= start) {
    end += 24;
  }

  const totalHours = end - start;

  // Walk through each hour slot and classify
  let regular = 0;
  let overnight = 0;

  for (let h = start; h < end; h += 1) {
    const chunk = Math.min(1, end - h);
    // Normalize hour to 0-24 range
    const normalizedHour = ((h % 24) + 24) % 24;

    if (normalizedHour >= DAY_START && normalizedHour < DAY_END) {
      regular += chunk;
    } else {
      overnight += chunk;
    }
  }

  // Round to avoid floating point issues
  regular = Math.round(regular * 100) / 100;
  overnight = Math.round(overnight * 100) / 100;

  // Ensure total adds up
  const diff = Math.round(totalHours * 100) / 100 - (regular + overnight);
  if (Math.abs(diff) > 0.01) {
    regular += diff;
  }

  return { regular, overnight };
}

// ---------------------------------------------------------------------------
// Main pricing calculation
// ---------------------------------------------------------------------------

export function calculatePricing(input: PricingInput): PricingBreakdown {
  const {
    serviceType,
    isArmed,
    numberOfGuards,
    startTime,
    endTime,
    days,
    isRushBooking: rush,
    sopAddOn,
  } = input;

  const config = pricing[serviceType];

  const baseRate = config.baseRate;
  const armedUpcharge = isArmed ? config.armedUpcharge : 0;
  const overnightUpcharge = config.overnightUpcharge;

  const { regular: regularHours, overnight: overnightHours } = splitHours(startTime, endTime);
  const totalHours = regularHours + overnightHours;

  const effectiveRate = baseRate + armedUpcharge;
  const overnightRate = effectiveRate + overnightUpcharge;

  const subtotal =
    Math.round(
      (regularHours * effectiveRate + overnightHours * overnightRate) * numberOfGuards * days
    );

  const rushFee = rush ? config.rushFee : 0;
  const sopFee = sopAddOn ? config.sopFee : 0;
  const total = subtotal + rushFee + sopFee;

  return {
    baseRate,
    armedUpcharge,
    overnightUpcharge,
    regularHours,
    overnightHours,
    totalHours,
    subtotal,
    rushFee,
    sopFee,
    total,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returns true if the service date is within 72 hours from now.
 */
export function isRushBooking(serviceDate: Date): boolean {
  const now = new Date();
  const diffMs = serviceDate.getTime() - now.getTime();
  const thresholdMs = pricing.rushThresholdHours * 60 * 60 * 1000;
  return diffMs >= 0 && diffMs < thresholdMs;
}

/**
 * Format a cent amount as "$XX.XX".
 */
export function formatCents(cents: number): string {
  const dollars = (cents / 100).toFixed(2);
  return `$${dollars}`;
}
