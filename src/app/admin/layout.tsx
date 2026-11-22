
import Link from "next/link";

const adminLinks = [
  { name: "Dashboard", href: "/admin", icon: "▦" },
  { name: "Analytics", href: "/admin/analytics", icon: "▥" },
  { name: "Products", href: "/admin/products", icon: "◇" },
  { name: "Orders", href: "/admin/orders", icon: "▤" },
  { name: "Customers", href: "/admin/customers", icon: "♙" },
  { name: "Inventory", href: "/admin/inventory", icon: "▣" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f8f7f3] text-[#171717]">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-black/10 bg-white p-6 md:block">
        <Link href="/admin" className="text-xl font-black tracking-tight">
          FASHION<span className="text-[#8b9275]">.</span>CART
        </Link>

        <p className="mb-8 mt-2 text-[10px] font-semibold tracking-[3px] text-gray-400">
          ADMIN PANEL
        </p>

        <nav className="space-y-2">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#f1f1eb] hover:text-black"
            >
              <span className="text-lg">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mt-12 border-t border-black/10 pt-6">
          <Link
            href="/"
            className="text-xs font-semibold tracking-wider text-gray-500 hover:text-black"
          >
            ← BACK TO STORE
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-black/10 bg-white px-6">
          <p className="text-xs font-semibold tracking-[2px]">
            STORE MANAGEMENT
          </p>
          <span className="text-xs text-gray-500">Administrator</span>
        </header>

        <main className="p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
