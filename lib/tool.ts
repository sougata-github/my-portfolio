import { DATA } from "@/constants";
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
          .array(
            z.object({
              position: z.string().describe("Job title or position"),
              company: z.string().describe("Company name"),
              date: z
                .string()
                .describe(
                  "Date range (e.g., '2023–present' or 'Oct 2025–present')"
                ),
              description: z
                .array(z.string())
                .describe(
                  "Array of bullet points describing responsibilities and achievements"
                ),
            })
          )
          .describe(
            "Array of experience entries with position, company, date range, and description points"
          ),
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
      Generate a comprehensive portfolio summary based on ${DATA} with all sections: about, experience, projects, blogs, and social links. Return structured data Set the title as **Portfolio Summary**.
      
      For experienceSummary, extract each experience entry with position (job title), company name, date range, and description bullet points from the EXPERIENCE section. Format dates as shown in the data (e.g., "2023–present" or "Oct 2025–present"). Include all bullet points describing what was done in each role.
      `,
      system: `You are **Sougata Das's Portfolio Summariser** — a friendly, precise AI that answers questions about **Sougata Das**, his work, projects, blogs, and experience. 
                You do not have access to current events, dates, or times — respond only based on past, known data about Sougata Das.
              `,
    });

    return result.object;
  },
});
