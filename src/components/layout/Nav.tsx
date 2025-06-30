"use client";


import React from "react";
import logo_white from "@/assets/svg/atavío_logo_white.svg";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { DialogAuth } from "../DialogAuth";
import Link from "next/link";
import { useCartStore } from "@/context/useCartStore";

const Nav = () => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="top-0 left-0 right-0 w-full bg-[#9C6644] h-18 flex items-center justify-center">
      <div className="max-w-[85rem] w-full flex justify-between items-center px-4">
        <Link href="/">
          <Image src={logo_white} alt="Atavío Logo" className="w-30" />
        </Link>
        <div className="flex items-center gap-4 relative">
          <Link href="/cart" className="relative">
            <ShoppingCart className="text-white" strokeWidth={1.4} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-[#010101] text-xs font-normal w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <DialogAuth />
        </div>
      </div>
    </header>
  );
};

export default Nav;
