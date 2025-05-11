"use client"

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import { Analytics } from "@vercel/analytics/react"
import { AppSidebar } from "@/components/app-sidebar"
import { AetherInfoSection } from "@/components/info-section"
import {Chrome, Bot} from "lucide-react"
 import GlowingInput  from "@/components/glowing-input"
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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Index() {
  const chartData = [
    { month: "January", requests: 1163 },
    { month: "February", requests: 476 },
    { month: "March", requests: 524 },
    { month: "April", requests: 1549 },
    { month: "May", requests: 347 },
  ]
  const chartConfig = {
    requests: {
      label: "Requests",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig
  
  return (
 <SidebarProvider>
      <SpeedInsights />
      <Analytics />
      <AppSidebar className="display-flex" />
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
        <div className="m-6">
        <GlowingInput />
        <br></br>
        <section>
        <div className="flex flex-col md:flex-row justify-center gap-4">
        <Card className="flex-none p-2 m-2 shadow-lg sm-container">
          <CardHeader className="p-4">
            <CardTitle>Aether Assistant</CardTitle>
            <CardDescription>Chat with our AI on our new Webapp.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/chat" className={buttonVariants({ variant: "outline" })}><Bot color= "lightblue" />Send a Message!</Link>
          </CardContent>
          <CardFooter className="flex justify-between">
            <br />
          </CardFooter>
        </Card>
        <Card className="flex-1 hidden md:block p-2 m-2 shadow-lg">
          <CardHeader className="p-4">
            <CardTitle>
Aether Web Extension
</CardTitle>
          <CardDescription>
Our Chrome Extension helps find answers to selected questions online
          </CardDescription>
          </CardHeader>
          <br />
          <CardContent>
<Link href="https://chromewebstore.google.com/detail/answerright/gnlldhbpjicjidknchpfgmacdeclcdfj" className={buttonVariants({ variant: "outline" })}><Chrome color= "lightblue" />Add to Chrome</Link>
          </CardContent>
        </Card>
        </div>
        <ResponsiveContainer
  width="100%" // Use full width for responsiveness
  height={400} // Adjust height for better appearance on smaller screens
  className="sm:mb-6 mx-auto mt-6 px-4 md:px-0"
>
  <Card className="m-3 shadow-lg">
    <CardHeader>
      <CardTitle>Usage Chart</CardTitle>
      <CardDescription>
        Showing the total amount of AI requests in 2025
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 10,
            left: 12,
            right: 12,
            bottom: 10,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey="requests"
            type="natural"
            fill="var(--primary)"
            fillOpacity={0.85}
            stroke="var(--primary)"
          />
        </AreaChart>
      </ChartContainer>
    </CardContent>
    <CardFooter>
      <div className="flex w-full items-start gap-2 text-sm">
        <div className="grid gap-2">
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            January 1 - May 4 2025
          </div>
        </div>
      </div>
    </CardFooter>
  </Card>
  </ResponsiveContainer>
<br className="hidden lg:block" />
<br className="hidden lg:block" />
<br className="hidden lg:block" />
<br className="hidden lg:block" />
<br className="hidden lg:block" />
<br className="hidden lg:block" />
<br className="hidden lg:block" />
<br className="hidden lg:block" />
<br className="hidden lg:block" />
<br className="hidden lg:block" />
<br className="hidden lg:block" />
<br className="hidden lg:block" />
<br className="hidden lg:block" />
<br className="hidden lg:block" />
<br className="hidden lg:block" />
<br className="hidden lg:block" />
        </section>
        <br />
        <Separator />
        <br />

        <Card>
        <AetherInfoSection />
        </Card>
        </div>
      </SidebarInset>
      <Card className="hidden">
        <CardHeader>
          <CardTitle>Announcements</CardTitle>
          <CardDescription>See our new releases, Bug Fixes, and Extension Updates!</CardDescription>
        </CardHeader>
        <br />
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
            Initial Release of Aether.
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
            An update that brings context to Aether, taking DOM elements and recording them as possible answers for the selected question.
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
            A Major update that helped Aether create more accurate answers by recording past answers in a Database and learning from them.
            </div>
          </CardDescription>
        </Card>
      </PopoverContent>
      </Popover>
      <Separator className="my-2" />
      <Popover>
        <PopoverTrigger asChild>
          <Link href="" className="text-sm">v1.1.3</Link>
        </PopoverTrigger>
        <PopoverContent>
          <Card>
            <CardHeader>
              v1.1.3: Speculative Decoding
            </CardHeader>
            <CardDescription>
              <div className="p-4">An update that brought Speculative Decoding to our AI model, resulting in faster response times while keeping the quality of the answers.</div>
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
