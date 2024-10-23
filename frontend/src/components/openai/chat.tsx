"use client";

import { postChatMessageService } from "@/services/openai/chatService";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UserIcon, BotMessageSquare } from "lucide-react";

// Componente para renderizar los mensajes
const ChatMessage = ({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) => {
  return (
    <div
      className={`flex ${
        role === "user" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`flex items-start gap-2.5 ${
          role === "user" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {role === "user" ? <UserIcon /> : <BotMessageSquare />}
        <div
          className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 ${
            role === "user"
              ? "bg-muted text-primary-foreground rounded-s-xl"
              : " bg-primary rounded-se-xl "
          } rounded-b-xl`}
        >
          {role === "assistant" ? (
            // Renderizamos el HTML del asistente usando dangerouslySetInnerHTML
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            // Mensaje del usuario, simplemente renderizamos el texto
            <span>{content}</span>
          )}
        </div>
      </div>
    </div>
  );
};

type ChatLogType = {
  role: "user" | "assistant";
  content: string;
}[];

// Define las props para el componente
interface ChatComponentProps {
  chatLog: ChatLogType;
  setChatLog: Dispatch<SetStateAction<ChatLogType>>;
}

export default function ChatComponent({ chatLog, setChatLog }: ChatComponentProps) {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage: { role: "user" | "assistant"; content: string } = {
      role: "user",
      content: message,
    };

    // Agregar el nuevo mensaje al historial
    setChatLog((prev) => [...prev, newMessage]);

    try {
      setLoading(true);
      const response = await postChatMessageService({
        conversation: chatLog,
        message,
      });

      // Aseguramos que la respuesta del asistente esté correctamente formateada
      setChatLog((prev) => [
        ...prev,
        { role: "assistant", content: response.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    console.log(chatLog);
  }, [chatLog]);

  return (
    <Card className="flex justify-between w-full border-none">
      <CardHeader>
        <CardTitle>Asistente virtual de GPI360</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[50dvh]">
          {chatLog.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
          <div ref={messagesEndRef} />
          <ScrollBar className="block" orientation={"vertical"}/>
        </ScrollArea>
      </CardContent>
      <CardFooter >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
            setMessage("");
          }}
          className="flex w-full gap-2"
        >
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-grow"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
