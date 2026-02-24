"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarCheck } from "lucide-react";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { cn } from "@/lib/utils";

interface BookingRow {
  id: string;
  bookingNumber: string;
  customerName: string;
  serviceDate: string;
  serviceType: string;
  status: string;
  total: number;
  [key: string]: unknown;
}

const statusTabs = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending_payment" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const columns: Column<BookingRow>[] = [
  {
    key: "bookingNumber",
    label: "Booking #",
    render: (item) => (
      <span className="font-mono text-xs text-[#d4a418]">
        {item.bookingNumber}
      </span>
    ),
  },
  { key: "customerName", label: "Customer" },
  {
    key: "serviceDate",
    label: "Service Date",
    render: (item) => formatDate(item.serviceDate),
  },
  {
    key: "serviceType",
    label: "Type",
    render: (item) => (
      <span className="capitalize">{item.serviceType.replace(/_/g, " ")}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (item) => <StatusBadge status={item.status} />,
  },
  {
    key: "total",
    label: "Total",
    render: (item) => (
      <span className="font-medium">{formatCents(item.total)}</span>
    ),
  },
];

export default function BookingsPage() {
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState("");
  const [page, setPage] = useState(1);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 20;

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (activeStatus) params.set("status", activeStatus);

      const res = await fetch(`/api/bookings?${params}`);
      if (res.ok) {
        const json = await res.json();
        setBookings(json.data ?? []);
        setTotal(json.pagination?.total ?? 0);
      } else {
        setBookings([]);
        setTotal(0);
      }
    } catch {
      setBookings([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, activeStatus]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Bookings</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage security service bookings
          </p>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-1 rounded-lg border border-[#1e2a5e] bg-[#0f172a] p-1 w-fit">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setActiveStatus(tab.value);
              setPage(1);
            }}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              activeStatus === tab.value
                ? "bg-[#d4a418]/15 text-[#d4a418]"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center rounded-xl border border-[#1e2a5e] bg-[#0f172a] p-12">
          <div className="flex items-center gap-3 text-slate-400">
            <CalendarCheck className="h-5 w-5 animate-pulse" />
            <span>Loading bookings...</span>
          </div>
        </div>
      ) : (
        <DataTable<BookingRow>
          columns={columns}
          data={bookings}
          total={total}
          page={page}
          limit={limit}
          onPageChange={setPage}
          emptyMessage="No bookings yet"
          onRowClick={(item) => router.push(`/admin/bookings/${item.id}`)}
        />
      )}
    </div>
  );
}
