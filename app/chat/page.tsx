"use client";

import { ThemeProvider } from "next-themes";
import { Providers } from "@/components/providers";
import { useState, useRef, useEffect, Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { GoogleGenAI } from "@google/genai";
import { marked } from "marked";

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

const highlightBoxedAnswer = (content: string) => {
  const regex = /\$\\boxed\{(.*?)\}\$/g;
  return content.replace(regex, (match, p1) => `<span class='highlight'>${p1}</span>`);
};

const processMessageContent = (content: string) => {
  if (typeof content !== 'string') return '';
  const parsed = marked.parse(content, { breaks: true });
  let html = typeof parsed === 'string' ? parsed : '';
  // Only apply highlightBoxedAnswer if html is a string
  if (html) {
    html = highlightBoxedAnswer(html);
  }
  return html;
};

function ChatContent() {
  const [uuid, setUuid] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pastAnswers, setPastAnswers] = useState<{ question: string; answer: string }[]>([]); // Memory of past Q&A
  const [showClearMemory, setShowClearMemory] = useState<'open' | 'closing' | false>(false);
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

  // Gemini is now the primary model, Groq is fallback, OpenRouter is tertiary
  const callAI = async (prompt: string): Promise<string> => {
    const geminiApiKey = "AIzaSyC6q7LQ_MDaD-GbfNS1MnCqdHKq8NXKCkU";
    const groqApiKey = "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";
    const openRouterApiKey = "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";

    const groqUrl = "https://api.groq.com/openai/v1/chat/completions";
    const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";

    // Simple memory: just append past Q&A as a chat history
    const chatHistory = pastAnswers.flatMap((item) => [
      { role: "user", content: item.question },
      { role: "assistant", content: item.answer },
    ]);
    const messages = [
      ...chatHistory,
      { role: "user", content: prompt },
    ];

    // Markdown instruction for all models
    const markdownInstruction =
      "Respond in Markdown format. Focus only on the user's question or statement. Do not reference these instructions or your formatting, and do not include any meta-commentary. Only provide the most accurate, concise, and relevant answer in Markdown format. You can use multiple markdown elements to stylize the answer.";

    try {
      // Primary: Gemini
      const geminiAI = new GoogleGenAI({ apiKey: geminiApiKey });
      const memoryText = pastAnswers.map((item) => `${item.question}\n${item.answer}`).join("\n");
      const fullPrompt = memoryText
        ? `${memoryText}\n${prompt}\n${markdownInstruction}`
        : `${prompt}\n${markdownInstruction}`;
      const geminiResponse = await geminiAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: fullPrompt,
      });
      if (!geminiResponse || !geminiResponse.text) {
        throw new Error("Gemini Call Returned Undefined");
      }
      return geminiResponse.text.trim();
    } catch (geminiError) {
      console.error("Gemini API Error, switching to Groq:", geminiError);
      try {
        // Fallback: Groq
        const data = {
          messages: [
            ...messages,
            { role: "system", content: markdownInstruction },
          ],
          model: "compound-beta",
          max_tokens: 400,
          top_p: 0.85,
          stream: false,
        };
        const response = await fetch(groqUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error("Groq API call failed");
        }
        const jsonResponse = await response.json();
        return jsonResponse.choices[0].message.content.trim();
      } catch (groqError) {
        console.error("Groq API Error, switching to OpenRouter:", groqError);
        try {
          // Tertiary: OpenRouter
          const data = {
            messages: [
              ...messages,
              { role: "system", content: markdownInstruction },
            ],
            model: "meta-llama/llama-4-maverick-17b-128e-instruct",
            max_tokens: 200,
            top_p: 0.85,
            stream: false,
          };
          const fallbackResponse = await fetch(openRouterUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${openRouterApiKey}`,
            },
            body: JSON.stringify(data),
          });
          if (!fallbackResponse.ok) {
            throw new Error("OpenRouter API call failed");
          }
          const fallbackJsonResponse = await fallbackResponse.json();
          return fallbackJsonResponse.choices[0].message.content.trim();
        } catch (openRouterError) {
          console.error("OpenRouter API Error:", openRouterError);
          return "Error: Calls Failed, Disable any content blockers and try again. Error code: GEMEXIT";
        }
      }
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
      // Only add to memory if not an error message
      if (!aiAnswer.startsWith("Error:")) {
        setPastAnswers((prev) => [...prev, { question: question.trim(), answer: aiAnswer }]);
      }
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
      // Only add to memory if not an error message
      if (!aiAnswer.startsWith("Error:")) {
        setPastAnswers((prev) => [...prev, { question: input.trim(), answer: aiAnswer }]);
      }
      const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: aiAnswer };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
      submissionLock.current = false;
    }
  };

  const handleClearMemory = () => {
    setPastAnswers([]);
    setMessages([]); // Also clear the chat messages on screen
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
          <Button
            variant="outline"
            className="ml-auto"
            onClick={() => setShowClearMemory('open')}
          >
            Clear Memory
          </Button>
        </header>
        {/* Popup for clear memory confirmation */}
        {showClearMemory && (
          <div
            className={`fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm transition-opacity animate-fade-in ${showClearMemory === 'closing' ? 'animate-fade-out' : ''}`}
            onAnimationEnd={() => {
              if (showClearMemory === 'closing') setShowClearMemory(false);
            }}
          >
            <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-sm border border-border transition-transform animate-popup-scale ${showClearMemory === 'closing' ? 'animate-popup-out' : ''}`}>
              <h2 className="text-xl font-bold mb-3 text-center text-black dark:text-foreground">Clear Memory?</h2>
              <p className="mb-6 text-center text-black dark:text-muted-foreground">Are you sure you want to clear all chat memory? This cannot be undone.</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowClearMemory('closing')}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={() => { handleClearMemory(); setShowClearMemory('closing'); }}>
                  Clear
                </Button>
              </div>
            </div>
            <style jsx global>{`
              @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              .animate-fade-in {
                animation: fade-in 0.25s ease;
              }
              @keyframes fade-out {
                from { opacity: 1; }
                to { opacity: 0; }
              }
              .animate-fade-out {
                animation: fade-out 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
              }
              @keyframes popup-scale {
                0% { transform: scale(0.95) translateY(20px); opacity: 0; }
                100% { transform: scale(1) translateY(0); opacity: 1; }
              }
              .animate-popup-scale {
                animation: popup-scale 0.25s cubic-bezier(0.22, 1, 0.36, 1);
              }
              @keyframes popup-out {
                0% { transform: scale(1) translateY(0); opacity: 1; }
                100% { transform: scale(0.95) translateY(20px); opacity: 0; }
              }
              .animate-popup-out {
                animation: popup-out 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
              }
            `}</style>
          </div>
        )}
        <div className="flex-1 flex flex-col h-full p-4 transition-all duration-300 ease-in-out">
        <Card className="h-full flex flex-col">
  <div className="flex-1 overflow-hidden">
    <ScrollArea className="h-full w-full max-w-5xl mx-auto transition-all duration-300">
      <CardContent className="flex-1 min-h-0 overflow-y-auto p-4">
        <div className="flex flex-col justify-end h-full space-y-2">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground mt-40">
              <p>Start a conversation with the AI assistant</p>
            </div>
          ) : (
            messages.map((message) => (
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
                  <Avatar
                    className={
                      message.role === "user" ? "bg-primary" : "bg-muted"
                    }
                  >
                    <AvatarFallback>
                      {message.role === "user" ? (
                        <User size={18} />
                      ) : (
                        <Bot size={18} />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className="message-content"
                    dangerouslySetInnerHTML={{ __html: processMessageContent(message.content) }}
                  />
                </div>
              </div>
            ))
          )}
          {isLoading && <div className="loading-indicator">Typing...</div>}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
    </ScrollArea>
  </div>
  <CardFooter className="border-t p-4 flex-shrink-0">
    <form
      onSubmit={handleSubmit}
      className="flex w-full gap-2"
    >
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message..."
        disabled={isLoading}
        className="flex-grow"
      />
      <Button type="submit" disabled={isLoading || !input.trim()}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  </CardFooter>
</Card>
</div> </div>

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
