"use client";

import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function SaleSeachBar() {
  const [open, setOpen] = useState(false);
  const tags = Array.from({ length: 12 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
  return (
    <div className={`relative flex flex-col bg-card-foreground ${open? 'rounded-t-md' : 'rounded-md'} text-black`}>
      <div
        className="flex flex-row items-center gap-2 px-2"
        onClick={() => setOpen(!open)}
      >
        <Input
          type="text"
          className="text-black"
          placeholder="Buscar pproducto..."
        />
        <SearchIcon className="text-gray-600 mx-2" />
      </div>
      {open && ( 
        <div className="absolute top-10 h-fit w-full bg-card-foreground rounded-b-md ">
        <ScrollArea className="flex flex-col max-h-[250px] pl-2">
          <div className="p-4">
            {tags.map((tag) => (
              <>
                <div key={tag} className="text-sm">
                  {tag}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
          <ScrollBar/>
        </ScrollArea>
        </div>
      )}
    </div>
  );
}