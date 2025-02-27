import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link'
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
<Card className="p-3 w-[60vw]">
      <CardHeader>
        <CardTitle>AnswerRight Web</CardTitle>
        <CardDescription>Chat with our AI on our new Webapp.</CardDescription>
      </CardHeader>
      <CardContent>
      <Link href="/chat"className={buttonVariants({ variant: "outline" })}>Send a Message!</Link>
      </CardContent>
      <CardFooter className="flex justify-between">
      
      </CardFooter>
    </Card>
    </SidebarInset>
    </SidebarProvider>
)

}