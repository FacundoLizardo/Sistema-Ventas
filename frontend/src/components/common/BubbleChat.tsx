"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChatComponent from "../openai/chat";
import { BotMessageSquare } from "lucide-react";
import { useState } from "react";

export function BubbleChat() {
  const [chatLog, setChatLog] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Hola! Soy el asistente virtual de GPI360. ¿En qué te puedo ayudar?",
    },
  ]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className="relative flex justify-end">
      {isPopoverOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10"></div>
      )}

      <Popover onOpenChange={(open) => setIsPopoverOpen(open)}>
        <PopoverTrigger asChild className="absolute z-20 bottom-1">
          <button className="rounded-full flex h-20 w-20 bg-muted justify-center items-center">
            <BotMessageSquare />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-full sm:w-[34dvw] min-h-[60dvh] mb-4"
          align="end"
          hideWhenDetached={true}
        >
          <ChatComponent chatLog={chatLog} setChatLog={setChatLog} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
