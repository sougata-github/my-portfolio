import { SITE_URL } from "@/lib/site";

/*
  Contact emails, in the site's light palette.

  Mail clients do not read CSS variables or oklch, so the tokens from
  globals.css are frozen here as hex. Keep them in step if the palette
  moves. Everything is inline styles on tables, which is the only layout
  that survives Gmail and Outlook.
*/
const COLOR = {
  background: "#f6f5f2",
  card: "#fbfaf8",
  foreground: "#2c2a26",
  muted: "#7a7671",
  border: "#dcdad5",
};

const FONT =
  "'Helvetica Neue', Helvetica, Arial, sans-serif";
const MONO =
  "SFMono-Regular, Menlo, Monaco, Consolas, monospace";

type ContactPayload = { name: string; email: string; message: string };

/* Anything a visitor typed goes through here before it touches markup. */
export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const withLineBreaks = (value: string) =>
  escapeHtml(value).replace(/\r?\n/g, "<br />");

const label = (text: string) =>
  `<p style="margin:0 0 6px;font-family:${MONO};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${COLOR.muted};">${text}</p>`;

const rule = `<tr><td style="border-top:1px solid ${COLOR.border};font-size:0;line-height:0;height:1px;">&nbsp;</td></tr>`;

/*
  Shell shared by both emails: a single column on the stone background,
  hairline rules top and bottom, the wordmark above and the site link below.
*/
const shell = (title: string, body: string) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:${COLOR.background};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLOR.background};">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;font-family:${FONT};color:${COLOR.foreground};">
            <tr>
              <td style="padding:0 0 20px;font-family:${MONO};font-size:13px;color:${COLOR.muted};">sougata</td>
            </tr>
            ${rule}
            <tr>
              <td style="padding:28px 0;">
                ${body}
              </td>
            </tr>
            ${rule}
            <tr>
              <td style="padding:20px 0 0;font-family:${MONO};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${COLOR.muted};">
                <a href="${SITE_URL}" style="color:${COLOR.muted};text-decoration:underline;text-underline-offset:4px;">${SITE_URL.replace(/^https?:\/\//, "")}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

/* The notification that lands in my inbox. */
export const adminTemplate = ({ name, email, message }: ContactPayload) =>
  shell(
    `New message from ${name}`,
    `
    ${label("New message")}
    <h1 style="margin:0 0 24px;font-size:24px;font-weight:500;line-height:1.2;">${escapeHtml(name)} wrote in.</h1>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${COLOR.border};background:${COLOR.card};">
      <tr>
        <td style="padding:16px 20px;border-bottom:1px solid ${COLOR.border};">
          ${label("From")}
          <p style="margin:0;font-size:15px;line-height:1.5;">${escapeHtml(name)}<br /><a href="mailto:${escapeHtml(email)}" style="color:${COLOR.muted};text-decoration:underline;text-underline-offset:4px;">${escapeHtml(email)}</a></p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 20px;">
          ${label("Message")}
          <p style="margin:0;font-size:15px;line-height:1.6;">${withLineBreaks(message)}</p>
        </td>
      </tr>
    </table>

    <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:${COLOR.muted};">Reply to this email to answer ${escapeHtml(name)} directly.</p>
    `
  );

/* The confirmation the sender receives. */
export const senderTemplate = ({ name, message }: ContactPayload) =>
  shell(
    "Thanks for reaching out",
    `
    ${label("Received")}
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:500;line-height:1.2;">Thanks, ${escapeHtml(name)}.</h1>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:${COLOR.muted};">Your message reached me. I read everything that comes through the site and will get back to you soon.</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${COLOR.border};background:${COLOR.card};">
      <tr>
        <td style="padding:16px 20px;">
          ${label("What you sent")}
          <p style="margin:0;font-size:15px;line-height:1.6;">${withLineBreaks(message)}</p>
        </td>
      </tr>
    </table>

    <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:${COLOR.muted};">Sougata Das</p>
    `
  );

/* Plain-text twins for clients that do not render HTML. */
export const adminText = ({ name, email, message }: ContactPayload) =>
  `New message from ${name} <${email}>\n\n${message}`;

export const senderText = ({ name, message }: ContactPayload) =>
  `Thanks, ${name}.\n\nYour message reached me. I will get back to you soon.\n\nWhat you sent:\n${message}\n\nSougata Das\n${SITE_URL}`;
