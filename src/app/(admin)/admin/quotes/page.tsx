"use client";

import { useCallback, useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { cn } from "@/lib/utils";

interface QuoteRow {
  id: string;
  contactName: string;
  email: string;
  serviceType: string;
  status: string;
  estimatedTotal: number | null;
  createdAt: string;
  [key: string]: unknown;
}

const statusTabs = [
  { label: "All", value: "" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Quoted", value: "quoted" },
  { label: "Won", value: "won" },
  { label: "Lost", value: "lost" },
];

function formatCents(cents: number | null): string {
  if (cents == null) return "—";
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

const columns: Column<QuoteRow>[] = [
  { key: "contactName", label: "Contact Name" },
  {
    key: "email",
    label: "Email",
    render: (item) => (
      <a
        href={`mailto:${item.email}`}
        className="text-[#d4a418] hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        {item.email}
      </a>
    ),
  },
  {
    key: "serviceType",
    label: "Service Type",
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
    key: "estimatedTotal",
    label: "Est. Total",
    render: (item) => formatCents(item.estimatedTotal),
  },
  {
    key: "createdAt",
    label: "Date",
    render: (item) => formatDate(item.createdAt),
  },
];

export default function QuotesPage() {
  const [activeStatus, setActiveStatus] = useState("");
  const [page, setPage] = useState(1);
  const [quotes, setQuotes] = useState<QuoteRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 20;

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (activeStatus) params.set("status", activeStatus);

      const res = await fetch(`/api/quotes?${params}`);
      if (res.ok) {
        const json = await res.json();
        setQuotes(json.data ?? []);
        setTotal(json.pagination?.total ?? 0);
      } else {
        setQuotes([]);
        setTotal(0);
      }
    } catch {
      setQuotes([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, activeStatus]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Quote Requests</h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage incoming quote and consultation requests
        </p>
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
            <MessageSquare className="h-5 w-5 animate-pulse" />
            <span>Loading quotes...</span>
          </div>
        </div>
      ) : (
        <DataTable<QuoteRow>
          columns={columns}
          data={quotes}
          total={total}
          page={page}
          limit={limit}
          onPageChange={setPage}
          emptyMessage="No quote requests yet"
        />
      )}
    </div>
  );
}
