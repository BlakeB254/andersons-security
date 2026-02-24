"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { Upload, Image as ImageIcon, Trash2, X } from "lucide-react";

interface MediaItem {
  id: string;
  filename: string;
  mimeType: string;
  url: string;
  alt: string | null;
  width: number | null;
  height: number | null;
  size: number | null;
  createdAt: string;
}

function formatBytes(bytes: number | null): string {
  if (bytes == null) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      if (res.ok) {
        const json = await res.json();
        setItems(json.data ?? []);
      } else {
        setItems([]);
      }
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    // Upload handling will be wired later
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleUpload(files);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUpload(files);
    }
  }

  async function handleUpload(files: FileList) {
    // Placeholder upload logic — will be wired to /api/media POST
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/media", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          fetchMedia();
        }
      } catch {
        // API may not exist yet
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Media Library</h1>
          <p className="mt-1 text-sm text-slate-400">
            Upload and manage images and files
          </p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg bg-[#d4a418] px-4 py-2 text-sm font-medium text-[#0a0f1a] transition-colors hover:bg-[#d4a418]/90"
        >
          <Upload className="h-4 w-4" />
          Upload
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-colors ${
          dragOver
            ? "border-[#d4a418] bg-[#d4a418]/5"
            : "border-[#1e2a5e] bg-[#0f172a]/50"
        }`}
      >
        <Upload
          className={`h-10 w-10 ${
            dragOver ? "text-[#d4a418]" : "text-slate-600"
          }`}
        />
        <p className="mt-4 text-sm text-slate-400">
          {dragOver
            ? "Drop files here to upload"
            : "Drag and drop files here, or click Upload"}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Supports JPG, PNG, WebP, GIF, SVG
        </p>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex items-center justify-center rounded-xl border border-[#1e2a5e] bg-[#0f172a] p-12">
          <div className="flex items-center gap-3 text-slate-400">
            <ImageIcon className="h-5 w-5 animate-pulse" />
            <span>Loading media...</span>
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-[#1e2a5e] bg-[#0f172a] p-12 text-center">
          <ImageIcon className="mx-auto h-10 w-10 text-slate-600" />
          <p className="mt-4 text-sm text-slate-400">
            No media uploaded yet
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Upload images to use across your site
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-[#1e2a5e] bg-[#0f172a] transition-colors hover:border-[#1e2a5e]/80"
            >
              <div className="aspect-square overflow-hidden">
                {item.mimeType.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt={item.alt ?? item.filename}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#0a0f1a]">
                    <ImageIcon className="h-8 w-8 text-slate-600" />
                  </div>
                )}
              </div>
              <div className="p-2">
                <p className="truncate text-xs text-slate-300">
                  {item.filename}
                </p>
                <p className="text-xs text-slate-500">
                  {formatBytes(item.size)}
                </p>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                <button className="rounded-lg bg-red-500/20 p-2 text-red-400 transition-colors hover:bg-red-500/30">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
