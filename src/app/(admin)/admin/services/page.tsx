import { Plus, Shield, Star } from "lucide-react";
import { services as defaultServices } from "@/config/brand";

function formatRate(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents);
}

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your security service offerings
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[#d4a418] px-4 py-2 text-sm font-medium text-[#0a0f1a] transition-colors hover:bg-[#d4a418]/90">
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>

      {/* Services Table */}
      <div className="rounded-xl border border-[#1e2a5e] bg-[#0f172a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e2a5e]">
                <th className="px-4 py-3 text-left font-medium text-slate-400">
                  Title
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-400">
                  Base Rate
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-400">
                  Featured
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-400">
                  Sort Order
                </th>
                <th className="px-4 py-3 text-right font-medium text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {defaultServices.map((service, index) => (
                <tr
                  key={service.id}
                  className="border-b border-[#1e2a5e]/50 transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-[#d4a418]/10 p-2">
                        <Shield className="h-4 w-4 text-[#d4a418]" />
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {service.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          {service.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {formatRate(service.baseRate)}/hr
                  </td>
                  <td className="px-4 py-3">
                    {service.featured ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#d4a418]/10 px-2.5 py-0.5 text-xs font-medium text-[#d4a418]">
                        <Star className="h-3 w-3" />
                        Featured
                      </span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-400">{index}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded-md px-3 py-1 text-xs font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
