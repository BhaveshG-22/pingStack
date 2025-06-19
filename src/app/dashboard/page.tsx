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
import CampaignOverview from "@/components/dashboard/campaigns/Overview"
import ResponseTracking from "@/components/dashboard/analytics/ResponseTracking"
import { useState } from "react"

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
      case "campaigns-quantum":
        return { section: "Campaigns", page: "Quantum" }
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
        return <CampaignOverview />
      case "campaigns-template":
        return (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="text-2xl font-bold">Campaign Templates</h1>
            <p>Campaign template management coming soon...</p>
          </div>
        )
      case "campaigns-quantum":
        return (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="text-2xl font-bold">Quantum Campaigns</h1>
            <p>Advanced quantum campaign features coming soon...</p>
          </div>
        )
      
      // Analytics
      case "analytics-response-tracking":
        return <ResponseTracking />
      case "analytics-get-started":
        return (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="text-2xl font-bold">Get Started with Analytics</h1>
            <p>Analytics getting started guide coming soon...</p>
          </div>
        )
      case "analytics-tutorials":
        return (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="text-2xl font-bold">Analytics Tutorials</h1>
            <p>Step-by-step analytics tutorials coming soon...</p>
          </div>
        )
      case "analytics-changelog":
        return (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="text-2xl font-bold">Analytics Changelog</h1>
            <p>Analytics feature updates and changelog coming soon...</p>
          </div>
        )

      // Integration
      case "integration-email-accounts":
        return (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="text-2xl font-bold">Email Account Integration</h1>
            <p>Email account setup and management coming soon...</p>
          </div>
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
