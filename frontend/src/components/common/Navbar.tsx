"use client";
import { useState } from "react";
import Link from "next/link";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">GPI 360</Link>
        <button
          className="lg:hidden text-white"
          onClick={toggleMenu}
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
        <div className={`lg:flex lg:items-center lg:space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
          <Link href="/" className="block py-2 px-4 hover:bg-gray-700">Home</Link>
          <Link href="/products" className="block py-2 px-4 hover:bg-gray-700">Products</Link>
          <Link href="/about" className="block py-2 px-4 hover:bg-gray-700">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
