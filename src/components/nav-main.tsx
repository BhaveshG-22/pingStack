"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
  onNavigate,
  activeView,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
  onNavigate?: (view: string) => void
  activeView?: string
}) {
  const getViewKey = (itemTitle: string, subItemTitle: string) => {
    return `${itemTitle.toLowerCase()}-${subItemTitle.toLowerCase().replace(/\s+/g, '-')}`
  }

  const isSubItemActive = (itemTitle: string, subItemTitle: string) => {
    const viewKey = getViewKey(itemTitle, subItemTitle)
    return activeView === viewKey
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton 
                        isActive={isSubItemActive(item.title, subItem.title)}
                        className={isSubItemActive(item.title, subItem.title) ? "bg-gray-700 dark:bg-gray-800 text-white font-medium" : ""}
                        onClick={() => {
                          if (onNavigate) {
                            // Handle Leads navigation
                            if (item.title === "Leads") {
                              switch (subItem.title) {
                                case "Add":
                                  onNavigate("leads-add")
                                  break
                                case "Manage":
                                  onNavigate("leads-manage")
                                  break
                                case "Groups":
                                  onNavigate("leads-groups")
                                  break
                                case "View":
                                  onNavigate("leads-view")
                                  break
                              }
                            }
                            
                            // Handle Campaigns navigation
                            if (item.title === "Campaigns") {
                              switch (subItem.title) {
                                case "New":
                                  onNavigate("campaigns-new")
                                  break
                                case "Overview":
                                  onNavigate("campaigns-overview")
                                  break
                                case "Template":
                                  onNavigate("campaigns-template")
                                  break
                                case "Quantum":
                                  onNavigate("campaigns-quantum")
                                  break
                              }
                            }
                            
                            // Handle Analytics navigation
                            if (item.title === "Analytics") {
                              switch (subItem.title) {
                                case "Response Tracking":
                                  onNavigate("analytics-response-tracking")
                                  break
                                case "Get Started":
                                  onNavigate("analytics-get-started")
                                  break
                                case "Tutorials":
                                  onNavigate("analytics-tutorials")
                                  break
                                case "Changelog":
                                  onNavigate("analytics-changelog")
                                  break
                              }
                            }

                            // Handle Integration navigation
                            if (item.title === "Integration") {
                              switch (subItem.title) {
                                case "Email Accounts":
                                  onNavigate("integration-email-accounts")
                                  break
                              }
                            }
                          }
                        }}
                      >
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
