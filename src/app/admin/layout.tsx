"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-midnight text-cream">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-midnight text-cream">
      <AdminSidebar />
      <main className="flex-1 overflow-x-auto p-8">{children}</main>
    </div>
  );
}
