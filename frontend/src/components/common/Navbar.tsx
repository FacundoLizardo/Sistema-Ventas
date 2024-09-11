"use client";
import { useState } from "react";
import Link from "next/link";
import { logout } from "@/services/auth/AuthServices";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log("response", response);

      if (response.success === true) {
        router.push(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/`);
        router.refresh();
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          GPI 360
        </Link>
        <button className="lg:hidden text-white" onClick={toggleMenu}>
          {isOpen ? "Close" : "Menu"}
        </button>
        <div
          className={`lg:flex lg:items-center lg:space-x-4 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <Link href="/" className="block py-2 px-4 hover:bg-gray-700">
            Home
          </Link>
          <Link href="/products" className="block py-2 px-4 hover:bg-gray-700">
            Products
          </Link>
          <Link href="/about" className="block py-2 px-4 hover:bg-gray-700">
            About
          </Link>
          <button type="button" onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
