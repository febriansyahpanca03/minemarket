"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-steel/35 bg-navy p-4">
      <div className="pixel mb-8 px-2 text-lg font-bold text-cream">Minestack Admin</div>

      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const active =
            link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-gold/12 text-gold"
                  : "text-cream/75 hover:bg-steel/25 hover:text-cream"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-4 rounded-lg border border-steel/35 px-3 py-2 text-left text-sm font-medium text-cream/60 hover:border-steel/55 hover:text-cream"
      >
        Sign Out
      </button>
    </aside>
  );
}
