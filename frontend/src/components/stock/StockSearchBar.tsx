"use client";

import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

export default function SaleSeachBar() {

  return (
    <div className={`flex flex-col bg-card-foreground text-black rounded-md`}>
      <div className="flex flex-row items-center gap-2 px-2">
        <Input
          type="text"
          className="text-black"
          placeholder="Buscar pproducto..."
        />
        <SearchIcon className="text-gray-600 mx-2" />
      </div>
    </div>
  );
}
