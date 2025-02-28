import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function About() {
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
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/about">About</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <Card>
        <CardHeader>
        <CardTitle>Changelog</CardTitle>
        <CardDescription>All of our secure releases of AnswerRight.</CardDescription>
        <Separator className="my-2" />
        </CardHeader>
        <CardContent>
        <CardTitle>v1.0.0</CardTitle>
        <CardDescription>Initial release of AnswerRight.</CardDescription>
        <Separator className="my-2" />
        <CardTitle>v1.0.3</CardTitle>
        <CardDescription>Bug fixes, QOL Updates</CardDescription>
        <Separator className="my-2" />
        <CardTitle>v1.0.4</CardTitle>
        <CardDescription>Update to help AnswerRight use DOM elements to find possible answers for selected questions, Efficiency updates.</CardDescription>
        <Separator className="my-2" />
        <CardTitle>v1.1.1</CardTitle>
        <CardDescription>Update to help AnswerRight use databases to learn off of previous questions anonymously.</CardDescription>
        <Separator className="my-2" />
        </CardContent>
      </Card>
      </SidebarInset>
    </SidebarProvider>
    
  )
}
