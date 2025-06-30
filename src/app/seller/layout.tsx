"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { WithRole } from "@/components/layout/WithRole";
import {
  ShoppingBag,
  Package,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const SidebarLink = ({ href, label, icon, badge }: SidebarLinkProps) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "group flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 relative",
        active
          ? "bg-[#9C6644] text-white shadow-lg"
          : "text-gray-600 hover:bg-[#824f3b] hover:text-white hover:shadow-md"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={clsx(
            "transition-colors",
            active ? "text-white" : "text-gray-500 group-hover:text-white"
          )}
        >
          {icon}
        </div>
        <span className="font-medium">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        {badge && badge > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
            {badge > 99 ? "99+" : badge}
          </span>
        )}
        <ChevronRight
          className={clsx(
            "w-4 h-4 transition-all duration-200",
            active
              ? "text-white rotate-90"
              : "text-gray-400 group-hover:text-white group-hover:translate-x-1"
          )}
        />
      </div>
    </Link>
  );
};

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-72 bg-white border-r border-gray-200 shadow-sm">
        <nav className="p-4 space-y-2">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
              Panel de Vendedor
            </h3>
            <div className="space-y-1">
              <SidebarLink
                href="/seller/orders"
                label="Mis Órdenes"
                icon={<ShoppingBag className="w-5 h-5" />}
              />
              <SidebarLink
                href="/seller/product"
                label="Mis Productos"
                icon={<Package className="w-5 h-5" />}
              />
              {/* Si quieres agregar ajustes del perfil u otras opciones */}
              {/* <SidebarLink
                href="/seller/settings"
                label="Configuración"
                icon={<Settings className="w-5 h-5" />}
              /> */}
            </div>
          </div>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <WithRole allowedRoles={"SELLER"}>{children}</WithRole>
        </div>
      </main>
    </div>
  );
};

export default SellerLayout;
