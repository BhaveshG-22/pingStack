"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import NewLead from "@/components/dashboard/leads/Add"
import ManageLeads from "@/components/dashboard/leads/Manage"
import Groups from "@/components/dashboard/leads/Groups"
import ViewLeads from "@/components/dashboard/leads/View"
import NewCampaign from "@/components/dashboard/campaigns/New"
import CampaignManager from "@/components/dashboard/campaigns/CampaignManager"
import ResponseTracking from "@/components/dashboard/analytics/ResponseTracking"
import { useState } from "react"
import CampaignTemplates from "@/components/dashboard/campaigns/Template"
import Placeholder from "@/components/dashboard/Placeholder"

export default function Page() {
  const [activeView, setActiveView] = useState("dashboard")
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)

  const handleViewLead = (leadId: string) => {
    setSelectedLeadId(leadId)
    setActiveView("leads-view")
  }

  const getBreadcrumbData = () => {
    switch (activeView) {
      case "leads-add":
        return { section: "Leads", page: "Add New Lead" }
      case "leads-manage":
        return { section: "Leads", page: "Manage Leads" }
      case "leads-groups":
        return { section: "Leads", page: "Lead Groups" }
      case "leads-view":
        return { section: "Leads", page: "Lead View" }
      case "campaigns-new":
        return { section: "Campaigns", page: "New Campaign" }
      case "campaigns-overview":
        return { section: "Campaigns", page: "Campaign Overview" }
      case "campaigns-template":
        return { section: "Campaigns", page: "Templates" }
      case "analytics-response-tracking":
        return { section: "Analytics", page: "Response Tracking" }
      case "analytics-get-started":
        return { section: "Analytics", page: "Get Started" }
      case "analytics-tutorials":
        return { section: "Analytics", page: "Tutorials" }
      case "analytics-changelog":
        return { section: "Analytics", page: "Changelog" }
      case "integration-email-accounts":
        return { section: "Integration", page: "Email Accounts" }
      default:
        return { section: "Dashboard", page: "Overview" }
    }
  }

  const breadcrumbData = getBreadcrumbData()

  const renderMainContent = () => {
    switch (activeView) {
      // Leads
      case "leads-add":
        return <NewLead />
      case "leads-manage":
        return <ManageLeads />
      case "leads-groups":
        return <Groups onViewLead={handleViewLead} />
      case "leads-view":
        return <ViewLeads selectedLeadId={selectedLeadId} />

      // Campaigns
      case "campaigns-new":
        return <NewCampaign />
      case "campaigns-overview":
        return <CampaignManager />
      case "campaigns-template":
        return <CampaignTemplates />

      // Analytics
      case "analytics-response-tracking":
        return <ResponseTracking />
      case "analytics-get-started":
        return (
          <Placeholder
            Title={'Analytics'}
            Description={'View analytics with graphs and metrics to analyze your campaign\'s journey'}
          />
        )
      case "analytics-tutorials":
        return (
          <Placeholder
            Title={'Analytics Tutorials'}
            Description={'Step-by-step tutorials to help you master campaign analytics'}
          />
        )
      case "analytics-changelog":
        return (
          <Placeholder
            Title={'Analytics Changelog'}
            Description={'Track updates and improvements to your analytics dashboard'}
          />
        )

      // Integration
      case "integration-email-accounts":
        return (
          <Placeholder
            Title={'Email Account Integration'}
            Description={'Connect and manage your email accounts for seamless outreach'}
          />
        )

      default:
        return (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
          </div>
        )
    }
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar onNavigate={setActiveView} activeView={activeView} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">
                      {breadcrumbData.section}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{breadcrumbData.page}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          {renderMainContent()}
        </SidebarInset>
      </SidebarProvider></>

  )
}
