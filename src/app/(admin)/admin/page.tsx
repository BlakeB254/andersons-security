import {
  CalendarCheck,
  DollarSign,
  MessageSquare,
  Shield,
} from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { StatusBadge } from "@/components/admin/StatusBadge";

const dashboardStats = [
  { icon: CalendarCheck, label: "Total Bookings", value: "0" },
  { icon: DollarSign, label: "Revenue", value: "$0" },
  { icon: MessageSquare, label: "Pending Quotes", value: "0" },
  { icon: Shield, label: "Active Services", value: "3" },
];

// Placeholder data — will be replaced with DB queries
const recentBookings: {
  bookingNumber: string;
  customerName: string;
  serviceDate: string;
  serviceType: string;
  status: string;
  total: number;
}[] = [];

const recentQuotes: {
  contactName: string;
  email: string;
  serviceType: string;
  status: string;
  createdAt: string;
}[] = [];

function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">
          Overview of your security business
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatsCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>

      {/* Recent Tables */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Recent Bookings */}
        <div className="rounded-xl border border-[#1e2a5e] bg-[#0f172a] overflow-hidden">
          <div className="border-b border-[#1e2a5e] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Recent Bookings
            </h2>
          </div>
          {recentBookings.length === 0 ? (
            <div className="p-12 text-center">
              <CalendarCheck className="mx-auto h-8 w-8 text-slate-600" />
              <p className="mt-3 text-sm text-slate-400">No bookings yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e2a5e]">
                    <th className="px-4 py-3 text-left font-medium text-slate-400">
                      Booking #
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-400">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-400">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-slate-400">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr
                      key={booking.bookingNumber}
                      className="border-b border-[#1e2a5e]/50"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-slate-300">
                        {booking.bookingNumber}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {booking.customerName}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        {formatCents(booking.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Quotes */}
        <div className="rounded-xl border border-[#1e2a5e] bg-[#0f172a] overflow-hidden">
          <div className="border-b border-[#1e2a5e] px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Recent Quotes
            </h2>
          </div>
          {recentQuotes.length === 0 ? (
            <div className="p-12 text-center">
              <MessageSquare className="mx-auto h-8 w-8 text-slate-600" />
              <p className="mt-3 text-sm text-slate-400">
                No quote requests yet
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e2a5e]">
                    <th className="px-4 py-3 text-left font-medium text-slate-400">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-400">
                      Service
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-400">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentQuotes.map((quote, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#1e2a5e]/50"
                    >
                      <td className="px-4 py-3 text-slate-300">
                        {quote.contactName}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {quote.serviceType}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={quote.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
