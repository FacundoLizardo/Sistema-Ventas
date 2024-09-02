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

// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { SearchIcon } from "lucide-react"

// export default function SaleSeachBar() {
//   return (
//     <div className="relative w-full max-w-md">
//       <div className="relative">
//         <Input
//           type="text"
//           placeholder="Search..."
//           className="w-full rounded-lg bg-background pl-8 pr-12 focus:ring-2 focus:ring-primary"
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//             }
//           }}
//         />
//         <Button
//           type="button"
//           variant="ghost"
//           className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 hover:bg-muted/50"
//           onClick={() => {}}
//         >
//           <SearchIcon className="h-5 w-5" />
//         </Button>
//       </div>
//       <div className="absolute z-10 w-full mt-2 overflow-auto bg-background border rounded-lg shadow-lg max-h-[300px]">
//         <ul className="py-1">
//           <li className="px-4 py-2 text-sm hover:bg-muted/50 cursor-pointer">Result 1</li>
//           <li className="px-4 py-2 text-sm hover:bg-muted/50 cursor-pointer">Result 2</li>
//           <li className="px-4 py-2 text-sm hover:bg-muted/50 cursor-pointer">Result 3</li>
//           <li className="px-4 py-2 text-sm hover:bg-muted/50 cursor-pointer">Result 4</li>
//           <li className="px-4 py-2 text-sm hover:bg-muted/50 cursor-pointer">Result 5</li>
//         </ul>
//       </div>
//     </div>
//   )
// }
