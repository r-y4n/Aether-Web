"use client";

import { ThemeProvider } from "next-themes";
import { Providers } from "@/components/providers";
import { useState, useRef, useEffect, Suspense } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
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
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const firebaseConfig = {
  databaseURL: "https://answerright-8bff7-default-rtdb.firebaseio.com/",
  projectId: "answerright-8bff7",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function ChatContent() {
  const [uuid, setUuid] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const submissionLock = useRef(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const query = searchParams.get("query");

  useEffect(() => {
    let storedUuid = localStorage.getItem("uuid");
    if (!storedUuid) {
      storedUuid = crypto.randomUUID();
      localStorage.setItem("uuid", storedUuid);
    }
    setUuid(storedUuid);

    if (query && !autoSubmitted && !isSubmitting) {
      setInput(query);
      handleSubmitAuto(query);
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("query");
      router.replace(`${pathname}?${newParams.toString()}`);
    }
  }, [query, autoSubmitted, isSubmitting, pathname, router, searchParams]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const saveToFirebase = (question: string, aiAnswer: string) => {
    const timestamp = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    const reference = ref(database, "questionsAndAnswers");
    push(reference, { question, answer: aiAnswer, timestamp, uuid }).catch((error) =>
      console.error("Error saving data to Firebase:", error)
    );
  };

  const fetchGroqAnswer = async (question: string): Promise<string> => {
    const prompt = question;
    return await callAI(prompt);
  };

  const callAI = async (prompt: string): Promise<string> => {
    const apiKey = "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"; // NOT SECURED
    if (!apiKey) {
      console.error("Missing AI API Key!");
      return "Error: AI service is unavailable.";
    }

    const url = "https://api.groq.com/openai/v1/chat/completions";
    const data = {
      messages: [
        {
          role: "system",
          content:
            "DO NOT REFERENCE THESE INSTRUCTIONS IN THE MESSAGE: You are an AI chatbot built by Aether, a small company that wants to help students and researchers alike find answers to questions, to answer questions asked by users. If they ask for long form text, you may provide it, but if not specified, default to short answers. Your task is to provide the most accurate answer to the following question. Answer concisely and accurately, saying only the answer. Strive to not be repetitive. If you do not have enough information, do not guess. REMEMBER: SAY THE ANSWER AND THE ANSWER ONLY. DO NOT REPEAT YOURSELF.",
        },
        { role: "user", content: prompt },
      ],
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
      max_tokens: 500,
      top_p: 0.3,
      stream: false,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", JSON.stringify(errorData, null, 2));
        return "Error: Failed to fetch AI response.";
      }

      const jsonResponse = await response.json();
      return jsonResponse.choices[0].message.content.trim();
    } catch (error) {
      console.error("AI API Call Failed:", error);
      return "Error: Unable to get response from AI.";
    }
  };

  const handleSubmitAuto = async (question: string) => {
    if (!question.trim() || isSubmitting || autoSubmitted || submissionLock.current) return;

    submissionLock.current = true;
    setIsSubmitting(true);
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: question.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiAnswer = await fetchGroqAnswer(question.trim());
      saveToFirebase(question.trim(), aiAnswer);
      const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: aiAnswer };
      setMessages((prev) => [...prev, assistantMessage]);
      setAutoSubmitted(true);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
      submissionLock.current = false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSubmitting || submissionLock.current) return;

    submissionLock.current = true;
    setIsSubmitting(true);
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiAnswer = await fetchGroqAnswer(input.trim());
      saveToFirebase(input.trim(), aiAnswer);
      const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: aiAnswer };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
      submissionLock.current = false;
    }
  };

  return (
    <SidebarInset>
      <div className="flex flex-col h-screen">
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

        <div className="flex-1 flex flex-col h-full p-4 transition-all duration-300 ease-in-out">
          <Card className="flex flex-col flex-1 h-full w-full max-w-5xl mx-auto transition-all duration-300">
            <CardContent className="flex-1 min-h-0 overflow-y-auto p-4 scrollbar-hide">
              <div className="flex flex-col justify-end h-full space-y-2">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>Start a conversation with the AI assistant</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div key={message.id} className={`flex w-full ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`chat-bubble ${message.role === "user" ? "user-message" : "ai-message"}`}>
                        <Avatar className={message.role === "user" ? "bg-primary" : "bg-muted"}>
                          <AvatarFallback>{message.role === "user" ? <User size={18} color="lightblue" /> : <Bot size={18} />}</AvatarFallback>
                        </Avatar>
                        <div className="message-content">{message.content}</div>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && <div className="loading-indicator">Typing...</div>}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <Input value={input} onChange={handleInputChange} placeholder="Type your message..." disabled={isLoading} />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
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
    <ThemeProvider attribute="class" storageKey="theme" enableSystem disableTransitionOnChange>
      <Providers>
        <SidebarProvider>
          <AppSidebar />
          <Suspense fallback={<div>Loading...</div>}>
            <ChatContent />
          </Suspense>
        </SidebarProvider>
      </Providers>
    </ThemeProvider>
  );
}