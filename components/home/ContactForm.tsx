"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { submitMessage } from "@/actions/contact";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactValues } from "@/schemas/contact";

/*
  Three fields and one button.

  Validation runs twice on purpose: zodResolver here for inline messages as
  the visitor types, and safeParse again inside the server action, which is
  the gate that matters. The same schema feeds both.

  While sending, the button shows only the spinner. On success the whole
  form is replaced by a confirmation that stays until the page reloads, so
  a second accidental send is not possible without a refresh.
*/

type Status = "idle" | "submitting" | "success";

/*
  Field chrome on the site's tokens: square corners, a hairline that turns
  to foreground on focus, no ring and no shadow. Overrides the shadcn
  defaults without editing components/ui.
*/
const fieldClass =
  "rounded-none border-border bg-transparent px-3 text-sm shadow-none transition-colors duration-300 placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 aria-invalid:border-foreground dark:bg-transparent";

const ContactForm = () => {
  const [status, setStatus] = useState<Status>("idle");

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: ContactValues) => {
    setStatus("submitting");
    const result = await submitMessage(values);

    if (result.success) {
      setStatus("success");
      form.reset();
      toast.success("Your message has been submitted.");
      return;
    }

    setStatus("idle");
    toast.error(result.error);
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex min-h-[360px] flex-col justify-center gap-3 border border-border p-8"
      >
        <span className="label text-foreground">
          Message submitted successfully
        </span>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
          Thanks. A copy is on its way to your inbox, and I will get back to
          you soon.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="gap-2">
              <FormLabel className="label">Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="name"
                  placeholder="Your name"
                  disabled={submitting}
                  className={fieldClass}
                />
              </FormControl>
              <FormMessage className="font-mono text-[11px] text-foreground" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="gap-2">
              <FormLabel className="label">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  disabled={submitting}
                  className={fieldClass}
                />
              </FormControl>
              <FormMessage className="font-mono text-[11px] text-foreground" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="gap-2">
              <FormLabel className="label">Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="What are you working on?"
                  disabled={submitting}
                  className={`${fieldClass} min-h-36 resize-none py-3`}
                />
              </FormControl>
              <FormMessage className="font-mono text-[11px] text-foreground" />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={submitting}
          aria-label={submitting ? "Sending" : undefined}
          className="label flex h-12 w-full items-center justify-center border border-border text-foreground transition-colors duration-300 hover:border-foreground disabled:cursor-wait"
        >
          {submitting ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            "Send message"
          )}
        </button>
      </form>
    </Form>
  );
};

export default ContactForm;
