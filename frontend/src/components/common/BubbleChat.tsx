"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChatComponent from "../openai/chat";
import { BotMessageSquare, CrossIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

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
  const [showInitialDialog, setShowInitialDialog] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false); // Para controlar la animación de opacidad

  // Mostrar el cuadro de diálogo solo si el usuario no ha abierto el chat antes
  useEffect(() => {
    const hasOpenedChat = localStorage.getItem("hasOpenedChat");
    if (!hasOpenedChat) {
      setTimeout(() => {
        setShowInitialDialog(true);
        setTimeout(() => setIsDialogVisible(true), 10); // Activar animación después de mostrar el cuadro
      }, 2500); // 5 segundos de retraso
    }
  }, []);

  // Marcar el chat como abierto en localStorage y cerrar el cuadro de diálogo
  const handleOpenChange = (open: boolean) => {
    setIsPopoverOpen(open);
    if (open) {
      localStorage.setItem("hasOpenedChat", "true");
      setShowInitialDialog(false);
    }
  };

  return (
    <div>
      {showInitialDialog && (
        <div
          className={`fixed flex flex-row justufy-between items-center bottom-20 right-14 sm:bottom-[136px] sm:right-[120px] bg-primary text-primary-foreground p-3 rounded-md z-20 transition-opacity duration-500 ${
            isDialogVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Hola! Soy el asistente virtual de GPI360. ¿En qué te puedo ayudar?
          <button
            className="flex "
            onClick={() => {setIsDialogVisible(false); setShowInitialDialog(false)}}
          >
                <XIcon className="w-4 h-4 ml-4" />
          </button>
        </div>
      )}

      {isPopoverOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10"></div>
      )}

      <Popover onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button className="fixed z-20 bottom-4 right-4 sm:bottom-14 sm:right-14 rounded-full flex h-16 w-16 sm:h-20 sm:w-20 bg-muted justify-center items-center shadow-lg hover:scale-110 transition-all">
            <BotMessageSquare className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-full max-w-[290px] sm:max-w-md min-h-[60dvh] sm:min-h-[50dvh] mb-4 rounded-lg overflow-hidden"
          align="end"
          sideOffset={10}
        >
          <ChatComponent chatLog={chatLog} setChatLog={setChatLog} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
