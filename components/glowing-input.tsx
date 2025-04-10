"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GlowingInput() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Check if the user is already being redirected to the chat page
    if (window.location.pathname !== '/chat') {
      router.push(`/chat?query=${encodeURIComponent(input)}`);
    }
    setInput(""); // Optionally clear the input after submission
  };

  // Handle the Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Prevent form submission on Enter key press, to avoid double submission
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent); // Trigger the same logic as form submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto mt-6">
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full blur-xl opacity-60
        bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500
        dark:from-yellow-500 dark:via-emerald-500 dark:to-cyan-500
      "></div>

      {/* Inner Input */}
      <div className="relative p-[3px] rounded-full bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500 dark:from-yellow-500 dark:via-emerald-500 dark:to-cyan-500">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // Handle the Enter key press
          placeholder="Ask Aether..."
          className="w-full rounded-full px-6 py-4 text-base font-medium
            focus:outline-none transition-all duration-200
            bg-white text-black placeholder:text-gray-500
            dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400
            focus:shadow-[0px_0px_16px_8px_rgba(0,255,255,0.9)]  /* Cyan focus glow */
            hover:shadow-[0px_0px_32px_12px_rgba(0,255,255,0.9)]  /* Cyan hover glow for light mode */
            dark:focus:shadow-[0px_0px_16px_8px_rgba(0,255,255,0.9)]
            dark:hover:shadow-[0px_0px_32px_12px_rgba(0,255,255,0.9)]"  /* Cyan hover glow for dark mode */
        />
      </div>
    </form>
  );
}