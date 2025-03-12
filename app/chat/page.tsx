"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useRef, useEffect } from "react";
// Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

// UI & Components
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

// Firebase Config
const firebaseConfig = {
  databaseURL: "https://answerright-8bff7-default-rtdb.firebaseio.com/",
  projectId: "answerright-8bff7",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

// Message Type Definition
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function ChatContent() {
  const [uuid, setUuid] = useState<string>("");

  useEffect(() => {
    let storedUuid = localStorage.getItem("uuid");
    if (!storedUuid) {
      storedUuid = crypto.randomUUID();
      localStorage.setItem("uuid", storedUuid);
    }
    setUuid(storedUuid);
  }, []);

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
    const prompt = `Your task is to provide the most accurate answer to the following question.\nAnswer concisely and accurately, saying only the correct answer.\n\nQuestion: "${question}"`;
    return await callAI(prompt);
  };

  const callAI = async (prompt: string): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
    if (!apiKey) {
      console.error("Missing AI API Key!");
      return "Error: AI service is unavailable.";
    }

    const url = "https://api.groq.com/openai/v1/chat/completions";
    const data = {
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-specdec",
      temperature: 0.15,
      max_tokens: 150,
      top_p: 1.0,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

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
    }
  };

  return (
    <SidebarInset>
      <div className="flex flex-col h-screen">
        <header className="flex h-16 items-center border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="/chat">Chat</BreadcrumbLink></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex-1 flex flex-col p-4">
          <Card className="max-w-5xl mx-auto">
            <CardContent className="overflow-y-auto p-4">
              {messages.map((message) => (
                <div key={message.id} className={message.role === "user" ? "text-right" : "text-left"}>{message.content}</div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <Input value={input} onChange={handleInputChange} placeholder="Type your message..." disabled={isLoading} />
                <Button type="submit" disabled={isLoading || !input.trim()}><Send /></Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}


export default function Chat() {
  return <SidebarProvider><AppSidebar /><ChatContent /></SidebarProvider>;
}
