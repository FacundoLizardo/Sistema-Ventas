"use client";
import Link from "next/link";
import { Button } from "../ui/button";

import { usePathname } from "next/navigation";
import {
  DASHBOARD_PAGE_URL,
  SALES_PAGE_URL,
  STOCK_PAGE_URL,
} from "@/lib/navigationConstants";

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-between max-w-5xl m-auto">
      <Link href={SALES_PAGE_URL}>
        <Button
          className={`${
            pathname === SALES_PAGE_URL && "bg-purple-500 text-purple-700"
          }`}
        >
          Ventas
        </Button>
      </Link>
      <Link href={STOCK_PAGE_URL}>
        <Button>Stock</Button>
      </Link>
      <Link href={DASHBOARD_PAGE_URL}>
        <Button>Dashboard</Button>
      </Link>
    </nav>
  );
}
