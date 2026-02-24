"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, FileText } from "lucide-react";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { cn } from "@/lib/utils";

interface PostRow {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  [key: string]: unknown;
}

const statusTabs = [
  { label: "All", value: "" },
  { label: "Draft", value: "draft" },
  { label: "Published", value: "published" },
];

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const columns: Column<PostRow>[] = [
  {
    key: "title",
    label: "Title",
    render: (item) => (
      <span className="font-medium text-white">{item.title}</span>
    ),
  },
  {
    key: "slug",
    label: "Slug",
    render: (item) => (
      <span className="font-mono text-xs text-slate-400">{item.slug}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (item) => <StatusBadge status={item.status} />,
  },
  {
    key: "publishedAt",
    label: "Published",
    render: (item) => formatDate(item.publishedAt),
  },
  {
    key: "createdAt",
    label: "Created",
    render: (item) => formatDate(item.createdAt),
  },
];

export default function PostsPage() {
  const [activeStatus, setActiveStatus] = useState("");
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 20;

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (activeStatus) params.set("status", activeStatus);

      const res = await fetch(`/api/posts?${params}`);
      if (res.ok) {
        const json = await res.json();
        setPosts(json.data ?? []);
        setTotal(json.pagination?.total ?? 0);
      } else {
        setPosts([]);
        setTotal(0);
      }
    } catch {
      setPosts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, activeStatus]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Posts</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage blog posts and news articles
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[#d4a418] px-4 py-2 text-sm font-medium text-[#0a0f1a] transition-colors hover:bg-[#d4a418]/90">
          <Plus className="h-4 w-4" />
          New Post
        </button>
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
            <FileText className="h-5 w-5 animate-pulse" />
            <span>Loading posts...</span>
          </div>
        </div>
      ) : (
        <DataTable<PostRow>
          columns={columns}
          data={posts}
          total={total}
          page={page}
          limit={limit}
          onPageChange={setPage}
          emptyMessage="No posts yet. Create your first blog post."
        />
      )}
    </div>
  );
}
