"use client";

import { useState, useRef, useEffect, FormEvent } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  role: "assistant",
  content:
    "Salut ! Je suis l'assistant IA de Mavocation. Pose-moi tes questions sur la méthode RIASEC, Holland ou tes résultats de quiz !",
};

const SUGGESTIONS = [
  "C'est qui Holland ?",
  "Ça veut dire quoi RIASEC ?",
  "Explique le code RIA",
  "Métiers pour profil SAE ?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    if (!text.trim() || loading) return;

    const userMessage = text.trim();
    setInput("");
    setLoading(true);

    // History sent to API = everything except welcome
    const historyForApi = messages.slice(1).slice(-8);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
      { role: "assistant", content: "" },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: historyForApi }),
      });

      if (!res.ok || !res.body) throw new Error("Erreur réseau");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Désolé, une erreur s'est produite. Réessaie !",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  const hasConversation = messages.length > 1;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant IA"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M8 10h8M8 14h5M12 3C7.03 3 3 6.58 3 11c0 2.3.97 4.37 2.53 5.87L4.5 21l4.5-1.5c.97.32 2 .5 3 .5 4.97 0 9-3.58 9-8s-4.03-8-9-8z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] h-[480px] max-h-[calc(100vh-8rem)] flex flex-col rounded-2xl border border-white/[0.08] bg-[#0d0d1a]/95 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9.5 2a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM14.5 17a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM2 9.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM17 14.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z"
                  fill="white"
                  opacity=".6"
                />
                <path
                  d="M9.5 4.5L14.5 19.5M4.5 9.5L19.5 14.5"
                  stroke="white"
                  strokeWidth="1.5"
                  opacity=".4"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white leading-none">
                Assistant Mavocation
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                IA · RIASEC · Holland
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-slate-600">En ligne</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
            {/* Suggestion chips on first open */}
            {!hasConversation && (
              <div className="pt-1 pb-2">
                <p className="text-[10px] text-slate-600 text-center mb-2">
                  Questions fréquentes
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-[11px] px-2.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-violet-600 to-violet-700 text-white rounded-tr-sm"
                      : "bg-white/[0.05] border border-white/[0.06] text-slate-300 rounded-tl-sm"
                  }`}
                >
                  {msg.content || (
                    <span className="inline-flex items-center gap-1 py-0.5">
                      <span
                        className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </span>
                  )}
                </div>
              </div>
            ))}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 p-3 border-t border-white/[0.06] flex-shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pose ta question..."
              disabled={loading}
              maxLength={500}
              className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/40 focus:bg-white/[0.07] transition-all disabled:opacity-50 min-w-0"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Envoyer"
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          {/* Disclaimer */}
          <p className="px-4 py-1.5 text-[9px] text-slate-700 text-center flex-shrink-0">
            IA générative · Indicatif uniquement · Non substitut d&apos;un
            conseiller agréé
          </p>
        </div>
      )}
    </>
  );
}
