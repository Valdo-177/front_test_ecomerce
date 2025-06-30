"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { User } from "lucide-react";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useAuthStore } from "@/context/useAuthStore";
import LogoutButton from "@/components/ui/logoutButton";

export function DialogAuth() {
  const [changeTypeAuth, setChangeTypeAuth] = useState<"signIn" | "signUp">(
    "signIn"
  );
  const { isAuthenticated, openLoginDialog, setOpenLoginDialog } = useAuthStore();

  const handleChangeTypeAuth = () => {
    setChangeTypeAuth((prev) => (prev === "signIn" ? "signUp" : "signIn"));
  };

  const handleClose = () => setOpenLoginDialog(false);

  return (
    <Dialog open={openLoginDialog} onOpenChange={setOpenLoginDialog}>
      {isAuthenticated ? (
        <div className="flex items-center gap-1 cursor-pointer">
          <LogoutButton />
        </div>
      ) : (
        <DialogTrigger asChild>
          <User className="text-white cursor-pointer" strokeWidth={1.4} />
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px] pt-9">
        {changeTypeAuth === "signIn" ? (
          <SignIn onChange={handleChangeTypeAuth} onclose={handleClose} />
        ) : (
          <SignUp onChange={handleChangeTypeAuth} onclose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}
