import nodemailer from "nodemailer";
import {
  adminTemplate,
  adminText,
  senderTemplate,
  senderText,
} from "@/constants/email-templates";
import type { ContactValues } from "@/schemas/contact";

/*
  Server only. Imported by the contact server action and nothing else, so
  the SMTP credentials never reach a client bundle.

  One transporter for the process. Nodemailer pools connections itself, so
  creating it per request would only add a handshake to every send.
*/
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  /* 587 is STARTTLS. secure: true is for 465 only. */
  secure: Number(process.env.SMTP_PORT ?? 587) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = () => `"Sougata Das" <${process.env.FROM_EMAIL}>`;

/*
  Two emails per submission: the notification to me, with the sender set
  as reply-to so answering is one click, and a confirmation to the sender.
  Both go out together. If either fails the action reports a failure and
  the visitor is asked to try again.
*/
export async function sendContactEmails(values: ContactValues) {
  const to = process.env.FROM_EMAIL;
  if (!to) throw new Error("FROM_EMAIL is not set");

  await Promise.all([
    transporter.sendMail({
      from: FROM(),
      to,
      replyTo: `"${values.name}" <${values.email}>`,
      subject: `New message from ${values.name}`,
      html: adminTemplate(values),
      text: adminText(values),
    }),
    transporter.sendMail({
      from: FROM(),
      to: values.email,
      subject: "Thanks for reaching out",
      html: senderTemplate(values),
      text: senderText(values),
    }),
  ]);
}
