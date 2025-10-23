"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Package, ShoppingCart, LayoutDashboard } from "lucide-react";
import Image from "next/image";

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
        <div className="flex items-center h-16 flex-shrink-0 px-6 border-b">
          <Link href="/dashboard" className="flex items-center ">
            {/* <div className="w-24 h-24 flex items-center justify-center">
          
              <Image src="https://i.ibb.co.com/cSXCsRyc/Gemini-Generated-Image-8r951b8r951b8r95.png" alt="Logo" width={100} height={100} />
            </div> */}
          <span className="text-xl font-bold bg-gradient-to-r from-[#f1765b] to-[#f1638c] bg-clip-text text-transparent">
  Dashboard
</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
            "";
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.title}
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