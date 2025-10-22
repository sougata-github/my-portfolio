"use client";

import ResponsiveModal from "../ResponsiveModal";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, InferUITool } from "ai";
import { useEffect, useMemo, useState } from "react";
import {
  ChatContainerContent,
  ChatContainerRoot,
} from "../prompt-kit/chat-container";
import { Message, MessageContent } from "../prompt-kit/message";
import { Markdown } from "../prompt-kit/markdown";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { generateSummary } from "@/lib/tool";
import { SummaryCard, SummaryCardSkeleton } from "./SummaryCard";
import {
  PromptInput,
  PromptInputActions,
  PromptInputTextarea,
} from "../prompt-kit/prompt-input";
import Thinking from "../prompt-kit/thinking";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { components, MDXContent } from "../mdx-components";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SummaryModal = ({ isOpen, setIsOpen }: Props) => {
  const { messages, status, sendMessage, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ messages, body }) => {
        return {
          body: {
            messages,
            ...body,
          },
        };
      },
    }),
    onError: async (error) => {
      console.error(error.message);
      toast.error("Error generating response");
    },
  });

  const lastMessage = messages.at(-1);

  const showThinking =
    (status === "submitted" &&
      messages.length > 0 &&
      messages[messages.length - 1].role === "user") ||
    (status === "streaming" &&
      lastMessage?.role === "assistant" &&
      lastMessage?.parts?.length === 0);

  const [input, setInput] = useState("");

  const summarise = () => {
    sendMessage({
      role: "user" as const,
      parts: [{ type: "text", text: "Generate summary" }],
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setInput("");
    }
  }, [isOpen]);

  const handleValueChange = (value: string) => {
    setInput(value);
  };

  const handleSubmit = () => {
    if (input.trim() === "") return;

    sendMessage({
      role: "user" as const,
      parts: [
        {
          type: "text",
          text: input.trim(),
        },
      ],
    });

    setInput("");
  };

  return (
    <ResponsiveModal title="AI Summary" open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex h-[400px] flex-col overflow-hidden relative">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="flex flex-col gap-2 items-start mt-8 font-[family-name:var(--font-inter)]">
            <h2 className="text-lg sm:text-xl font-semibold text-center">
              Hello! 👋 Curious about me?
            </h2>
            <p className="text-sm text-muted-foreground">
              Get a concise, insightful summary of my portfolio in seconds.
            </p>
            <Button
              variant="outline"
              onClick={summarise}
              className="w-fit mt-2 dark:bg-transparent dark:hover:bg-transparent hover:bg-transparent"
            >
              Generate Summary
            </Button>
          </div>
        )}

        {/* AI Messages */}
        <ChatContainerRoot className="flex-1">
          <ChatContainerContent className={cn("space-y-4 pt-4 pb-10 px-0")}>
            {messages.map((message) => {
              const isAssistant = message.role === "assistant";

              return message.parts.map((part, index) => {
                const key = `message-${message.id}-part-${index}`;
                const { type } = part;

                // Tool Calls
                if (type === "tool-generateSummary") {
                  const { state, toolCallId } = part;

                  switch (state) {
                    case "input-available":
                      return (
                        <div key={toolCallId}>
                          <SummaryCardSkeleton />
                        </div>
                      );
                    case "output-available": {
                      const { output } = part;
                      return (
                        <div key={toolCallId}>
                          <SummaryCard
                            data={
                              output as InferUITool<
                                typeof generateSummary
                              >["output"]
                            }
                          />
                        </div>
                      );
                    }
                  }
                }

                // Final Response
                if (type === "text") {
                  return (
                    <Message
                      key={key}
                      className={cn(
                        "justify-start pl-2",
                        !isAssistant && "justify-end pr-2"
                      )}
                    >
                      <div className="flex-1 max-w-full md:max-w-md">
                        <div
                          className={cn(
                            "text-foreground prose py-2 pr-2.5 text-sm text-left",
                            !isAssistant &&
                              "bg-accent-foreground/5 rounded-lg pl-2.5 text-right w-fit ml-auto"
                          )}
                        >
                          {isAssistant ? (
                            <MessageContent
                              className="bg-transparent pl-0"
                              markdown
                              components={components}
                            >
                              {part.text ?? ""}
                            </MessageContent>
                          ) : (
                            <Markdown components={components}>
                              {part.text ?? ""}
                            </Markdown>
                          )}
                        </div>
                      </div>
                    </Message>
                  );
                }
                return null;
              });
            })}

            {/* Loader */}
            {showThinking && (
              <div className="py-2 pl-2">
                <Thinking />
              </div>
            )}

            {/* Error */}
            {status === "error" &&
              messages.length > 0 &&
              messages[messages.length - 1].role === "user" && (
                <div className="flex w-full">
                  <div className="px-4 py-2 whitespace-pre-wrap bg-destructive/80 rounded-lg dark:text-foreground text-white">
                    There was an error generating the response.
                  </div>
                </div>
              )}
          </ChatContainerContent>
        </ChatContainerRoot>

        {/* Sticky Input */}
        <PromptInput
          value={input}
          onValueChange={handleValueChange}
          onSubmit={handleSubmit}
          className="w-full max-w-(--breakpoint-md) bottom-0 sticky dark:bg-transparent"
        >
          <PromptInputTextarea
            placeholder="Type your message"
            className="dark:bg-transparent"
          />
          <PromptInputActions className="justify-end pt-2 bg-transparent">
            <Button
              disabled={status === "streaming" || status === "submitted"}
              variant="default"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleSubmit}
            >
              <ArrowUp className="size-5" />
            </Button>
          </PromptInputActions>
        </PromptInput>
      </div>
    </ResponsiveModal>
  );
};

export default SummaryModal;
