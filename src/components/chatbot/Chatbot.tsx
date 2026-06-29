import { useChat } from "@ai-sdk/react";
import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const busy = status === "submitted" || status === "streaming";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    void sendMessage({ text });
    setInput("");
  };

  const quickReplies = ["What's on the menu?", "What are your hours?", "How do I book a table?"];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={cn(
          "fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-elevated)] transition-all hover:scale-105",
          open ? "bg-primary" : "bg-[image:var(--gradient-gold)] text-brand-charcoal",
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-3 z-50 flex w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-elevated)] animate-fade-in-up sm:right-5">
          <div className="flex items-center gap-3 bg-[image:var(--gradient-warm)] px-4 py-3 text-primary-foreground">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-accent text-brand-charcoal font-display font-bold">M</div>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold">Mogodu Monday Assistant</p>
              <p className="truncate text-xs text-primary-foreground/70">Ask about menu, hours, bookings</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex max-h-[55vh] min-h-[280px] flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Welcome to <span className="font-semibold text-foreground">Mogodu Monday</span>! How may I assist you today?
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => void sendMessage({ text: q })}
                      className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition hover:border-accent hover:bg-accent/10"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      isUser
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-secondary text-foreground",
                    )}
                  >
                    <div className="prose prose-sm max-w-none [&>p]:m-0 [&>p+p]:mt-2 [&_strong]:font-semibold [&_ul]:my-1 [&_ul]:pl-4">
                      <ReactMarkdown>{text || "…"}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            })}

            {busy && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-secondary px-3.5 py-2.5 text-sm text-muted-foreground">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
                  </span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="flex items-end gap-2 border-t border-border bg-background p-3">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit(e);
                }
              }}
              placeholder="Type a message…"
              className="max-h-32 flex-1 resize-none rounded-2xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
            <button
              type="submit"
              disabled={!input.trim() || busy}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
