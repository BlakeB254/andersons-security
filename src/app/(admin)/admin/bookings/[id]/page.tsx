import Link from "next/link";
import { ArrowLeft, CalendarCheck, MapPin, Clock, DollarSign, User, FileText } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface BookingDetailPageProps {
  params: Promise<{ id: string }>;
}

function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

// Placeholder — will be replaced with actual DB query
async function getBooking(id: string) {
  // In the future: query DB with drizzle
  // const booking = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
  void id;
  return null;
}

export default async function BookingDetailPage({ params }: BookingDetailPageProps) {
  const { id } = await params;
  const booking = await getBooking(id);

  if (!booking) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-[#d4a418]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Bookings
        </Link>

        <div className="rounded-xl border border-[#1e2a5e] bg-[#0f172a] p-12 text-center">
          <CalendarCheck className="mx-auto h-10 w-10 text-slate-600" />
          <h2 className="mt-4 text-lg font-semibold text-white">
            Booking not found
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            The booking with ID &quot;{id}&quot; could not be found.
            It may not exist yet or the database has not been seeded.
          </p>
          <Link
            href="/admin/bookings"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#d4a418] px-4 py-2 text-sm font-medium text-[#0a0f1a] transition-colors hover:bg-[#d4a418]/90"
          >
            View All Bookings
          </Link>
        </div>
      </div>
    );
  }

  // This section renders when booking data exists (future DB integration)
  const b = booking as Record<string, unknown>;

  return (
    <div className="space-y-6">
      <Link
        href="/admin/bookings"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-[#d4a418]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Bookings
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">
              {b.bookingNumber as string}
            </h1>
            <StatusBadge status={b.status as string} />
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Created {new Date(b.createdAt as string).toLocaleDateString()}
          </p>
        </div>
        <button className="rounded-lg border border-[#1e2a5e] px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5">
          Edit Booking
        </button>
      </div>

      {/* Detail Sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Customer Info */}
        <section className="rounded-xl border border-[#1e2a5e] bg-[#0f172a] p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            <User className="h-4 w-4" />
            Customer Info
          </h3>
          <dl className="mt-4 space-y-3">
            <div>
              <dt className="text-xs text-slate-500">Name</dt>
              <dd className="text-sm text-white">{b.customerName as string}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Email</dt>
              <dd className="text-sm text-white">{b.customerEmail as string}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Phone</dt>
              <dd className="text-sm text-white">{(b.customerPhone as string) || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Company</dt>
              <dd className="text-sm text-white">{(b.company as string) || "—"}</dd>
            </div>
          </dl>
        </section>

        {/* Event Details */}
        <section className="rounded-xl border border-[#1e2a5e] bg-[#0f172a] p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            <CalendarCheck className="h-4 w-4" />
            Event Details
          </h3>
          <dl className="mt-4 space-y-3">
            <div>
              <dt className="text-xs text-slate-500">Category</dt>
              <dd className="text-sm text-white">{b.eventCategory as string}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Type</dt>
              <dd className="text-sm text-white capitalize">{(b.serviceType as string).replace(/_/g, " ")}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Guards</dt>
              <dd className="text-sm text-white">{b.numberOfGuards as number}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Armed</dt>
              <dd className="text-sm text-white">{b.isArmed ? "Yes" : "No"}</dd>
            </div>
          </dl>
        </section>

        {/* Location */}
        <section className="rounded-xl border border-[#1e2a5e] bg-[#0f172a] p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            <MapPin className="h-4 w-4" />
            Location
          </h3>
          <dl className="mt-4 space-y-3">
            <div>
              <dt className="text-xs text-slate-500">Site</dt>
              <dd className="text-sm text-white">{(b.siteName as string) || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Address</dt>
              <dd className="text-sm text-white">
                {b.address as string}, {b.city as string}, {b.state as string} {b.zipCode as string}
              </dd>
            </div>
          </dl>
        </section>

        {/* Schedule */}
        <section className="rounded-xl border border-[#1e2a5e] bg-[#0f172a] p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            <Clock className="h-4 w-4" />
            Schedule
          </h3>
          <dl className="mt-4 space-y-3">
            <div>
              <dt className="text-xs text-slate-500">Service Date</dt>
              <dd className="text-sm text-white">
                {new Date(b.serviceDate as string).toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Time</dt>
              <dd className="text-sm text-white">
                {b.startTime as string} - {b.endTime as string}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Multi-Day</dt>
              <dd className="text-sm text-white">{b.isMultiDay ? "Yes" : "No"}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Rush Booking</dt>
              <dd className="text-sm text-white">{b.isRushBooking ? "Yes" : "No"}</dd>
            </div>
          </dl>
        </section>

        {/* Pricing */}
        <section className="rounded-xl border border-[#1e2a5e] bg-[#0f172a] p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            <DollarSign className="h-4 w-4" />
            Pricing
          </h3>
          <dl className="mt-4 space-y-3">
            <div>
              <dt className="text-xs text-slate-500">Total</dt>
              <dd className="text-lg font-bold text-[#d4a418]">
                {formatCents(b.total as number)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Payment Status</dt>
              <dd>
                <StatusBadge status={b.paymentStatus as string} />
              </dd>
            </div>
          </dl>
        </section>

        {/* Internal Notes */}
        <section className="rounded-xl border border-[#1e2a5e] bg-[#0f172a] p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            <FileText className="h-4 w-4" />
            Internal Notes
          </h3>
          <div className="mt-4">
            <p className="text-sm text-slate-300 whitespace-pre-wrap">
              {(b.internalNotes as string) || "No notes added."}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
