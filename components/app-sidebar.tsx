
import { ModeToggle }from "@/components/mode-toggle"
import * as React from "react"
import {
  Bot,
  SquareTerminal
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
  SidebarFooter
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Our AI",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "Playground",
          url: "/chat",
        },
        {
          title: "About Us",
          url: "/about",
        },
        {
          title: "Bug Reports/Feedback",
          url: "/contact",
        },
      ],
    },
    {
      title: "Socials (Coming Soon)",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Tiktok",
          url: "https://www.tiktok.com/@answerrightusa",
        },
        {
          title: "Instagram",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
