"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function Header({
  params,
  isAdmin,
}: {
  params: { locale: string; companyId: string };
  isAdmin: boolean;
}) {
  const pathName = usePathname();
  const isHidden = pathName.includes("/sales/confirmation");

  return (
    <>
      {!isHidden && (
        <header className="w-full">
          <Navbar params={params} isAdmin={isAdmin} />
        </header>
      )}
    </>
  );
}
