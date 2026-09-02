import { z } from "zod";

/*
  One schema, two consumers. The form resolves against it on the client for
  inline errors, and the server action parses against it again before
  anything is sent, so a request that skips the form gets the same rules.
*/
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name needs at least 2 characters")
    .max(80, "Name is too long"),
  email: z.email("Enter a valid email address").trim().max(254),
  message: z
    .string()
    .trim()
    .min(10, "Message needs at least 10 characters")
    .max(2000, "Message is too long, 2000 characters at most"),
});

export type ContactValues = z.infer<typeof contactSchema>;
