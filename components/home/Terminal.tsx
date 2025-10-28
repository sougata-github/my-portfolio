"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Command, ArrowRight } from "lucide-react";

const commands = {
  help: "Available commands: help, about, projects, contact, clear, github",
  about:
    "I'm Sougata Das, a React developer based in India, specializing in modern web applications.",
  projects:
    "Check out my projects: AI Chat, Jotion, Team Chat, iPhone 15 Landing Page",
  contact: "Get in touch via: LinkedIn, GitHub, or Twitter",
  github: "Visit: https://github.com/sougata-github",
  clear: "clear",
};

export default function Terminal() {
  const [history, setHistory] = useState<
    Array<{ type: "command" | "output"; content: string }>
  >([
    {
      type: "output",
      content: 'Welcome! Type "help" to see available commands.',
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let output = "";

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (cmd in commands) {
      output = commands[cmd as keyof typeof commands];
    } else {
      output = `Command not found: ${cmd}. Type "help" for available commands.`;
    }

    setHistory((prev) => [
      ...prev,
      { type: "command", content: input },
      { type: "output", content: output },
    ]);
    setInput("");
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="mt-4 md:mt-8"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Command className="size-4" />
        <h2 className="font-bold uppercase">Terminal</h2>
      </div>

      <div
        ref={terminalRef}
        className="rounded-lg border bg-background p-4 h-[280px] overflow-y-auto scrollbar-hidden font-mono text-xs md:text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="space-y-2">
          {history.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              {item.type === "command" && (
                <span className="text-muted-foreground select-none">$</span>
              )}
              {item.type === "output" && item.content !== "clear" && (
                <div className="text-muted-foreground">{item.content}</div>
              )}
              {item.type === "command" && (
                <div className="flex-1">{item.content}</div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
          <span className="text-muted-foreground select-none">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </form>
      </div>
    </motion.div>
  );
}
