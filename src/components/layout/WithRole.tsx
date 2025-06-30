'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/context/useAuthStore';
import { ReactNode } from 'react';

interface Props {
  allowedRoles: "ADMIN" | "SELLER" | "CUSTOMER";
  children: ReactNode;
}

export const WithRole = ({ allowedRoles, children }: Props) => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.role)) {
      router.replace('/');
    }
  }, [user, allowedRoles, router]);

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};
