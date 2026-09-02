"use server";

import { sendContactEmails } from "@/lib/mail";
import { contactSchema } from "@/schemas/contact";

export type SubmitResult =
  | { success: true }
  | { success: false; error: string };

/*
  The form already validated on the client, but a server action is a public
  endpoint and anything can call it. safeParse here is the real gate. The
  first issue's message is enough for the toast, the field-level detail
  belongs to the form.
*/
export async function submitMessage(input: unknown): Promise<SubmitResult> {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Check the form and try again.",
    };
  }

  try {
    await sendContactEmails(parsed.data);
    return { success: true };
  } catch (error) {
    console.error("Contact form: could not send", error);
    return {
      success: false,
      error: "Your message could not be sent. Try again in a moment.",
    };
  }
}
