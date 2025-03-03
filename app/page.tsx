import { AppSidebar } from "@/components/app-sidebar"
import { AnswerRightInfoSection } from "@/components/info-section"
import {Chrome, Bot} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"

import { buttonVariants } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from 'next/link'
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Index() {
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
                <BreadcrumbLink href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <br></br>
        <section>
        <div className="flex w-[60vw] gap-4">
        <Card className="flex-none">
          <CardHeader>
            <CardTitle>AnswerRight Web</CardTitle>
            <CardDescription>Chat with our AI on our new Webapp.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/chat" className={buttonVariants({ variant: "outline" })}><Bot />Send a Message!</Link>
          </CardContent>
          <CardFooter className="flex justify-between">
            <br />
          </CardFooter>
        </Card>
        <Card className="flex-1 hidden md:block">
          <CardHeader>
            <CardTitle>
AnswerRight Web Extension
</CardTitle>
          <CardDescription>
Our Chrome Extension to help find answers to selected questions online
          </CardDescription>
          </CardHeader>
          <CardContent>
<Link href="https://chromewebstore.google.com/detail/answerright/gnlldhbpjicjidknchpfgmacdeclcdfj" className={buttonVariants({ variant: "outline" })}><Chrome />Add to Chrome</Link>
          </CardContent>
        </Card>
        </div>
        </section>
        <br />
        <Separator />
        <br />

        <Card>
        <AnswerRightInfoSection />
        </Card>
      </SidebarInset>
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>Announcements</CardTitle>
          <CardDescription>See our new releases, Bug Fixes, and Extension Updates!</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/changelog" className={buttonVariants({ variant: "outline" })}>Changelog</Link>       <br></br>      <br></br>
          <Card>
            <CardContent>
              <h1>Releases</h1>
              <br />
            <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        <Popover>
      <PopoverTrigger asChild>
        <Link href="" className="text-sm">Initial Release</Link>
      </PopoverTrigger>
      <PopoverContent>
        <Card>
          <CardHeader>
            Initial Release
          </CardHeader>
          <CardDescription>
                  <div className="p-4">
            Initial Release of AnswerRight.
            </div>
          </CardDescription>
        </Card>
      </PopoverContent>
      </Popover>
        <Separator className="my-2" />
        <Popover>
      <PopoverTrigger asChild>
        <Link href="" className="text-sm">v1.0.3</Link>
      </PopoverTrigger>
      <PopoverContent>
        <Card>
          <CardHeader>
            v1.0.3
          </CardHeader>
          <CardDescription>
                  <div className="p-4">
            Update mainly consisting of Bug Fixes.
            </div>
          </CardDescription>
        </Card>
      </PopoverContent>
      </Popover>
        <Separator className="my-2" />
        <Popover>
      <PopoverTrigger asChild>
        <Link href="" className="text-sm">v1.0.4</Link>
      </PopoverTrigger>
      <PopoverContent>
        <Card>
          <CardHeader>
            v1.0.4: Context
          </CardHeader>
          <CardDescription>
                  <div className="p-4">
            An update that brings context to AnswerRight, taking DOM elements and recording them as possible answers for the selected question.
            </div>
          </CardDescription>
        </Card>
      </PopoverContent>
      </Popover>
        <Separator className="my-2" />
        <Popover>
      <PopoverTrigger asChild>
        <Link href="" className="text-sm">v1.1.1</Link>
      </PopoverTrigger>
      <PopoverContent>
        <Card>
          <CardHeader>
            v1.1.1: Databases
          </CardHeader>
          <CardDescription>
                  <div className="p-4">
            A Major update that helped AnswerRight create more accurate answers by recording past answers in a Database and learning from them.
            </div>
          </CardDescription>
        </Card>
      </PopoverContent>
      </Popover>
      </div>
    </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-between">

            </CardFooter>
          </Card>
        </CardContent>
        <CardFooter className="flex justify-between">

        </CardFooter>
      </Card>
    </SidebarProvider>
)

}