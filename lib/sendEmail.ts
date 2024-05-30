import { formSchema } from "@/schemas";
import * as z from "zod";

import emailjs from "@emailjs/browser";

export const sendEmail = async (values: z.infer<typeof formSchema>) => {
  const validateFields = formSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, message } = validateFields.data;

  const templateParams = {
    from_name: email,
    to_name: "Sougata",
    message,
  };

  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID!,
    templateParams,
    process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY
  );

  return { success: "Email Sent!" };
};
