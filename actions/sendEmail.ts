"use server";

import { formSchema } from "@/schemas";
import * as z from "zod";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (values: z.infer<typeof formSchema>) => {
  const validateFields = formSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { name, email, message } = validateFields.data;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "sougatadas9874@gmail.com",
    subject: `Message from ${name}`,
    html: `<p>${message}</p>`,
  });

  return { success: "Email Sent!" };
};
