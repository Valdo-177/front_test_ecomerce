"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/context/useAuthStore";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LogoutButton = () => {
  const { user, logout } = useAuthStore();
  const { push } = useRouter();

  const role = user?.role;
  const fullName = user?.profile.fullName;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex text-white items-center gap-1 cursor-pointer">
          <User strokeWidth={1.4} />
          <span className="inline-block max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis">
            {fullName}
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {role === "ADMIN" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/admin/users">Users</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/orders">Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/products">Products</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {role === "SELLER" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/seller/orders">My Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/seller/product">My Products</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {role === "CUSTOMER" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/orders">My Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem
          onClick={() => {
            logout();
            push("/");
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LogoutButton;
