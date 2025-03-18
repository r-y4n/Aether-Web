import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { AppSidebar } from "@/components/app-sidebar";
import { AnswerRightInfoSection } from "@/components/info-section";
import { Chrome, Bot } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Index() {
  const { setTheme } = useTheme();

  const releaseNotes = [
    {
      version: "Initial Release",
      description: "Initial Release of AnswerRight.",
    },
    {
      version: "v1.0.3",
      description: "Update mainly consisting of Bug Fixes.",
    },
    {
      version: "v1.0.4: Context",
      description:
        "An update that brings context to AnswerRight, taking DOM elements and recording them as possible answers for the selected question.",
    },
    {
      version: "v1.1.1: Databases",
      description:
        "A Major update that helped AnswerRight create more accurate answers by recording past answers in a Database and learning from them.",
    },
    {
      version: "v1.1.3: Speculative Decoding",
      description:
        "An update that brought Speculative Decoding to our AI model, resulting in faster response times while keeping the quality of the answers.",
    },
  ];

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider suppressHydrationWarning>
        <SpeedInsights />
        <Analytics />
        <div className="flex min-h-screen"> {/* Added a container for better layout */}
          <AppSidebar>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </AppSidebar>
          <SidebarInset className="flex-grow"> {/* Added flex-grow for better layout */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <main className="p-4"> {/* Added a main element for semantic structure */}
              <div className="flex w-full gap-4">
                <Card className="flex-none">
                  <CardHeader>
                    <CardTitle>AnswerRight Web</CardTitle>
                    <CardDescription>
                      Chat with our AI on our new Webapp.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href="/chat"
                      className={buttonVariants({ variant: "outline" })}
                    >
                      <Bot /> Send a Message!
                    </Link>
                  </CardContent>
                </Card>
                <Card className="flex-1 hidden md:block">
                  <CardHeader>
                    <CardTitle>AnswerRight Web Extension</CardTitle>
                    <CardDescription>
                      Our Chrome Extension to help find answers to selected
                      questions online
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href="https://chromewebstore.google.com/detail/answerright/gnlldhbpjicjidknchpfgmacdeclcdfj"
                      className={buttonVariants({ variant: "outline" })}
                    >
                      <Chrome /> Add to Chrome
                    </Link>
                  </CardContent>
                </Card>
              </div>
              <Separator className="my-4" />
              <AnswerRightInfoSection />
              <Card className="hidden md:block">
                <CardHeader>
                  <CardTitle>Announcements</CardTitle>
                  <CardDescription>
                    See our new releases, Bug Fixes, and Extension Updates!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href="/changelog"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Changelog
                  </Link>
                  <div className="mt-4">
                    <h1>Releases</h1>
                    <ScrollArea className="h-72 w-full rounded-md border">
                      <div className="p-4">
                        <h4 className="mb-4 text-sm font-medium leading-none">
                          Tags
                        </h4>
                        {releaseNotes.map((note) => (
                          <Popover key={note.version}>
                            <PopoverTrigger asChild>
                              <Link href="" className="text-sm">
                                {note.version}
                              </Link>
                            </PopoverTrigger>
                            <PopoverContent>
                              <Card>
                                <CardHeader>{note.version}</CardHeader>
                                <CardDescription>
                                  <div className="p-4">
                                    {note.description}
                                  </div>
                                </CardDescription>
                              </Card>
                            </PopoverContent>
                          </Popover>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
