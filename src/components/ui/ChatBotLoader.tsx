"use client";

import dynamic from "next/dynamic";

// Lazy-load ChatBot — defers ~13KB JS from critical rendering path
const ChatBot = dynamic(() => import("@/components/ui/ChatBot"), { ssr: false });

export default function ChatBotLoader() {
  return <ChatBot />;
}
