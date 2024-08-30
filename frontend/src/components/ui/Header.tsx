import Link from "next/link";
import { GlobeIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn/dropdownMenu";
import { Button } from "../shadcn/button";
import Logo from "../common/Logo";

export default function Header() {
  return (
    <header className="w-full py-4 md:py-6 h-auto">
      <nav className="flex items-center justify-between max-w-5xl m-auto">
       El nav
      </nav>
    </header>
  );
}
