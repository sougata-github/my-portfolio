import { convertToModelMessages, createUIMessageStream, JsonToSseTransformStream, smoothStream, stepCountIs, streamText, } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateSummary } from "@/lib/tool";
import { SYSTEM_PROMPT } from "@/constants";


export const maxDuration = 30;

const openrouter = createOpenRouter({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const stream = createUIMessageStream({
      execute: ({ writer: dataStream }) => {
        const result = streamText({
          model: openrouter.chat("openai/gpt-4o-mini"),
          system: SYSTEM_PROMPT,
          messages: convertToModelMessages(messages),
          tools: {
            generateSummary,
          },
          stopWhen: stepCountIs(5),
          experimental_transform: smoothStream({
            delayInMs: 2,
            chunking: "word",
          }),
          abortSignal: req.signal,
        });

        result.consumeStream();

        dataStream.merge(result.toUIMessageStream());
      },
      onError: (error) => {
        console.error("Stream error details:", error);
        return "An error occurred during stream";
      },
    });

    return new Response(stream.pipeThrough(new JsonToSseTransformStream()));
  } catch (error) {
    console.error("[v0] Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
