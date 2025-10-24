"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Package, ShoppingCart, LayoutDashboard } from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-card border-r">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Logo */}
        <div className="flex items-center h-16 flex-shrink-0 px-6 border-b bg-gradient-to-r from-[#f1765b]/5 to-[#f1638c]/5">
          <Link href="/dashboard" className="flex items-center group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f1765b] to-[#f1638c] flex items-center justify-center mr-3 shadow-md group-hover:shadow-lg transition-shadow">
              <LayoutDashboard className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#f1765b] to-[#f1638c] bg-clip-text text-transparent">
              Dashboard
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-[#f1765b] to-[#f1638c] text-white shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0 transition-transform duration-200",
                  isActive ? "scale-110" : "group-hover:scale-105"
                )} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex-shrink-0 p-4 border-t">
          <div className="text-xs text-muted-foreground text-center">
            © 2025 Dashboard
          </div>
        </div>
      </div>
    </aside>
  );
}