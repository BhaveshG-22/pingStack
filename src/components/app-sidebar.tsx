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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
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

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate?: (view: string) => void
  activeView?: string
}

export function AppSidebar({ onNavigate, activeView, ...props }: AppSidebarProps) {
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
