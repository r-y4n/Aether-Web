"use client";

import { useState, useRef, useEffect } from "react";

import { Send, User, Bot } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Message type definition
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function ChatContent() {
  const { state } = useSidebar();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `This is a placeholder response. Replace this with your AI implementation.`,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <SidebarInset>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/chat">Chat</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col h-full p-4 transition-all duration-300 ease-in-out">
          <Card className="flex flex-col flex-1 h-full w-full max-w-5xl mx-auto transition-all duration-300">
            {/* Chat Messages */}
            <CardContent className="flex-1 min-h-0 overflow-y-auto p-4 scrollbar-hide">
              <div className="flex flex-col justify-end h-full space-y-2">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>Start a conversation with the AI assistant</p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex w-full ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`chat-bubble ${
                          message.role === "user" ? "user-message" : "ai-message"
                        }`}
                      >
                        <Avatar className={message.role === "user" ? "bg-primary" : "bg-muted"}>
                          <AvatarFallback>
                            {message.role === "user" ? <User size={18} /> : <Bot size={18} />}
                          </AvatarFallback>
                        </Avatar>
                        <div className="message-content">{message.content}</div>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="chat-bubble ai-message">
                      <Avatar className="bg-muted">
                        <AvatarFallback>
                          <Bot size={18} />
                        </AvatarFallback>
                      </Avatar>
                      <div className="message-content">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-foreground/60 rounded-full animate-bounce" />
                          <div className="h-2 w-2 bg-foreground/60 rounded-full animate-bounce delay-75" />
                          <div className="h-2 w-2 bg-foreground/60 rounded-full animate-bounce delay-150" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Chat Input */}
            <CardFooter className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input.trim()} className="shrink-0">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}

export default function Chat() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <ChatContent />
    </SidebarProvider>
  );
}