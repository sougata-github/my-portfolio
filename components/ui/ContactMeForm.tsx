"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schemas";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { sendEmail } from "@/lib/sendEmail";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ContactMeForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      sendEmail(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data?.error);
          }

          if (data?.success) {
            form.reset();
            toast.success(data?.success);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-1">Your Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-light-2 placeholder:text-[#b5b5b5]"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-1">Your Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="test@gmail.com"
                  {...field}
                  className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-light-2 placeholder:text-[#b5b5b5]"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light-1">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hi! My name is John Doe."
                  {...field}
                  className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-[150px] text-light-2 placeholder:text-[#a6a6a6]"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-black max-sm:py-[22px] p-6 rounded-3xl max-sm:text-xs w-full"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin transition-all" />
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactMeForm;
