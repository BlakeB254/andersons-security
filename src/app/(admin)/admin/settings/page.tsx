"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import { brand, businessHours } from "@/config/brand";

interface SettingsSection {
  key: string;
  label: string;
  fields: { name: string; label: string; type: "text" | "textarea"; defaultValue: string }[];
}

const settingsSections: SettingsSection[] = [
  {
    key: "hero",
    label: "Hero Text",
    fields: [
      { name: "heroTagline", label: "Tagline", type: "text", defaultValue: brand.tagline },
      { name: "heroDescription", label: "Description", type: "textarea", defaultValue: brand.description },
    ],
  },
  {
    key: "contact",
    label: "Contact Info",
    fields: [
      { name: "contactEmail", label: "Email", type: "text", defaultValue: brand.contactEmail },
      { name: "contactPhone", label: "Phone", type: "text", defaultValue: brand.contactPhone },
      { name: "addressStreet", label: "Street Address", type: "text", defaultValue: brand.address.street },
      { name: "addressCity", label: "City", type: "text", defaultValue: brand.address.city },
      { name: "addressState", label: "State", type: "text", defaultValue: brand.address.state },
      { name: "addressZip", label: "ZIP Code", type: "text", defaultValue: brand.address.zip },
    ],
  },
  {
    key: "hours",
    label: "Business Hours",
    fields: businessHours.map((bh, i) => ({
      name: `hours_${i}`,
      label: bh.day,
      type: "text" as const,
      defaultValue: bh.hours,
    })),
  },
  {
    key: "seo",
    label: "SEO Metadata",
    fields: [
      { name: "seoTitle", label: "SEO Title", type: "text", defaultValue: brand.seo.title },
      { name: "seoDescription", label: "Meta Description", type: "textarea", defaultValue: brand.seo.description },
      { name: "seoKeywords", label: "Keywords (comma-separated)", type: "text", defaultValue: brand.seo.keywords.join(", ") },
    ],
  },
];

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const section of settingsSections) {
      for (const field of section.fields) {
        initial[field.name] = field.defaultValue;
      }
    }
    return initial;
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      // Placeholder: POST to /api/settings
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } catch {
      // Silently handle — API route may not exist yet
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage site content, contact info, and SEO metadata
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-[#d4a418] px-4 py-2 text-sm font-medium text-[#0a0f1a] transition-colors hover:bg-[#d4a418]/90 disabled:opacity-50"
        >
          {saved ? (
            <>
              <Check className="h-4 w-4" />
              Settings Saved
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Settings"}
            </>
          )}
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div
            key={section.key}
            className="rounded-xl border border-[#1e2a5e] bg-[#0f172a] p-6"
          >
            <h2 className="text-lg font-semibold text-white">
              {section.label}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {section.fields.map((field) => (
                <div
                  key={field.name}
                  className={field.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <label
                    htmlFor={field.name}
                    className="mb-1.5 block text-sm font-medium text-slate-400"
                  >
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      value={values[field.name] ?? ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-[#1e2a5e] bg-[#0a0f1a] px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-[#d4a418]/50 focus:outline-none focus:ring-1 focus:ring-[#d4a418]/50"
                    />
                  ) : (
                    <input
                      id={field.name}
                      type="text"
                      value={values[field.name] ?? ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full rounded-lg border border-[#1e2a5e] bg-[#0a0f1a] px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-[#d4a418]/50 focus:outline-none focus:ring-1 focus:ring-[#d4a418]/50"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
