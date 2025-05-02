"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, remove } from "firebase/database";
import { CheckCircle } from "lucide-react";

const firebaseConfig = {
  databaseURL: "https://answerright-8bff7-default-rtdb.firebaseio.com/",
  projectId: "answerright-8bff7",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
  feedback: z.string().min(1, { message: "Feedback is required." }),
});

type FeedbackFormData = z.infer<typeof formSchema>;

const saveFeedbackToFirebase = (data: FeedbackFormData) => {
  const timestamp = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  const reference = ref(database, "feedback");
  const newFeedbackRef = push(reference, { ...data, timestamp });

  newFeedbackRef
    .then((snapshot) => {
      const feedbackKey = snapshot.key;
      if (feedbackKey) {
        toast.success("Feedback saved!", {
          action: {
            label: "Undo",
            onClick: () => {
              const feedbackRef = ref(database, `feedback/${feedbackKey}`);
              remove(feedbackRef)
                .then(() => {
                  toast(
                    <div className="flex items-center gap-2">
                      <CheckCircle className="animate-checkmark" />
                      <span>Feedback removed!</span>
                    </div>
                  );
                })
                .catch((error) =>
                  console.error("Error removing feedback from Firebase:", error)
                );
            },
          },
        });
      }
    })
    .catch((error) => {
      console.error("Error saving feedback to Firebase:", error);
    });
};

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      feedback: "",
    },
  });

  const onSubmit = (data: FeedbackFormData) => {
    saveFeedbackToFirebase(data);
  };

  return (
    <Form {...form}>
      <div className="p-7">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-10 grid-rows-6 gap-6"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="col-span-5">
                <FormLabel>First Name (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First"
                    {...field}
                    className="border-[--foreground] focus:border-[--primary]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="col-span-5">
                <FormLabel>Last Name (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last"
                    {...field}
                    className="border-[--foreground] focus:border-[--primary]"
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
              <FormItem className="col-span-10">
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@example.com"
                    {...field}
                    className="border-[--foreground] focus:border-[--primary]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem className="col-span-10 row-span-1 max-w-full max-h-[300px]">
                <FormLabel>Bug Reports and Feedback*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your feedback here..."
                    {...field}
                    className="border-[--foreground] focus:border-[--primary]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="row-span-3 col-span-3">
            Submit
          </Button>
        </form>
      </div>
    </Form>
  );
}

export default function ContactPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/contact">Contact</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="p-4 m-6 h-full bg-[--card]">
          <ContactForm />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
// hi