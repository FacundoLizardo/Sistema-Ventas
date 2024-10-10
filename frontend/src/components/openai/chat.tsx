'use client'

import { postChatMessageService } from "@/services/openai/chatService"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserIcon, BotMessageSquare } from "lucide-react"


export default function ChatComponent() {
  const [message, setMessage] = useState<string>("")
  const [chatLog, setChatLog] = useState<{ role: string; content: string }[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const sendMessage = async () => {
    if (!message.trim()) return

    const newMessage = { role: "user", content: message }
    setChatLog((prev) => [...prev, newMessage])

    try {
      setLoading(true)
      const response = await postChatMessageService({ message })
      setChatLog((prev) => [...prev, { role: "assistant", content: response.response }])
      setMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [chatLog])

  return (
    <Card className="w-full max-w-2xl mx-auto mb-60">
      <CardHeader>
        <CardTitle>Asistente virtual de GPI360</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea ref={scrollAreaRef} className="h-[400px] pr-4 overflow-y-auto">
          {chatLog.map((msg: { role: string; content: string }, index: number) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
              <div className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {msg.role === "user" ? 
                <UserIcon /> 
                : 
                <BotMessageSquare />}
               
                <div className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 ${msg.role === "user" ? "bg-muted text-primary-foreground rounded-s-xl" : " bg-primary rounded-se-xl "} rounded-b-xl `}>
                  <p className="text-sm font-normal">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex w-full gap-2">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}