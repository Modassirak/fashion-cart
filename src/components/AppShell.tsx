"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Checkout from "@/components/Checkout";
import CartDrawer from "@/components/CartDrawer";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && (
        <>
          <Navbar />
          <CartDrawer />
          <Checkout />
        </>
      )}

      {children}
    </>
  );
}