import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  robots: { index: false },
  title: "Admin | Anderson's Security",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0a0f1a]">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-64">{children}</main>
    </div>
  );
}
