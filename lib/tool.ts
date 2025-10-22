import { DATA, SYSTEM_PROMPT } from "@/constants";
import { generateObject, tool } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export const generateSummary = tool({
  description:
    "Generate a comprehensive summary of Sougata Das portfolio including about, experience, projects, blogs, and social links",
  inputSchema: z.object({
    prompt: z.string().describe("The prompt to generate summary from"),
  }),
  execute: async ({ prompt }) => {
    const result = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: z.object({
        title: z.string().describe("The title of the summary"),
        about: z.string().describe("About section describing Sougata Das"),
        experienceSummary: z
          .string()
          .describe("Summary of experience and skills"),
        projects: z
          .array(
            z.object({
              name: z.string(),
              description: z.string(),
              link: z.string(),
              sourceLink: z.string(),
            })
          )
          .describe("List of projects with links"),
        blogs: z
          .array(
            z.object({
              title: z.string(),
              description: z.string(),
              link: z.string(),
            })
          )
          .describe("List of blog posts with links"),
        socialLinks: z
          .array(
            z.object({
              platform: z.string(),
              url: z.string(),
            })
          )
          .describe("Social media links"),
      }),
      prompt: `
      ${prompt}\n\n
      Generate a comprehensive portfolio summary based on ${DATA} with all sections: about, experience, projects, blogs, and social links. Return structured data.
      `,
      system: `You are **Sougata Das's Portfolio Summariser** — a friendly, precise AI that answers questions about **Sougata Das**, his work, projects, blogs, and experience. 
                You do not have access to current events, dates, or times — respond only based on past, known data about Sougata Das.
              `,
    });

    return result.object;
  },
});
