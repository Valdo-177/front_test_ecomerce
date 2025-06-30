import React from "react";
import logo from "@/assets/svg/atavío_logo.svg";
import logo_white from "@/assets/svg/atavío_logo_white.svg";
import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";
import { DialogAuth } from "../DialogAuth";
import Link from "next/link";

const Nav = () => {
  return (
    <header className="top-0 left-0 right-0 w-full bg-[#9C6644] h-18 flex items-center justify-center">
      <div className="max-w-[85rem] w-full flex justify-between items-center">
        <Link href="/">
          <Image src={logo_white} alt="Atavío Logo" className="w-30" />
        </Link>
        <div className="flex items-center gap-2">
          <ShoppingCart className="text-white" strokeWidth={1.4} />
          <DialogAuth />
        </div>
      </div>
    </header>
  );
};

export default Nav;
