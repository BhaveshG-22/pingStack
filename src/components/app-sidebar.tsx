"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChartSpline,
  Command,
  ContactRoundIcon,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  RocketIcon,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react"




interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate?: (view: string) => void
  activeView?: string
}

export function AppSidebar({ onNavigate, activeView, ...props }: AppSidebarProps) {

  const { data: session } = useSession()

  // This is sample data.
  const data = {
    user: {
      name: session?.user?.name as string,
      email: session?.user?.email as string,
      avatar: session?.user?.image as string,
    },
    teams: [
      {
        name: "Bhavesh's Workspace",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Himanshu's Workspace",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Leads",
        url: "#",
        icon: ContactRoundIcon,
        isActive: true,
        items: [
          {
            title: "Add",
            url: "#",
          },
          {
            title: "Manage",
            url: "#",
          },
          {
            title: "Groups",
            url: "#",
          },
          {
            title: "View",
            url: "#",
          },
        ],
      },
      {
        title: "Campaigns",
        url: "#",
        icon: RocketIcon,
        items: [
          {
            title: "New",
            url: "#",
          },
          {
            title: "Overview",
            url: "#",
          },
          {
            title: "Template",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Analytics",
        url: "#",
        icon: ChartSpline,
        items: [
          {
            title: "Response Tracking",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Integration",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "Email Accounts",
            url: "#",
          },

        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} onNavigate={onNavigate} activeView={activeView} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
