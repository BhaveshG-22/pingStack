"use client"

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Mail, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  Search,
  MoreVertical,
  Play,
  Pause,
  RotateCcw,
  Trash2,
  Eye,
  Edit
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { toast } from "sonner"
import type { Campaign, CampaignStatus, CampaignOverviewProps } from "../../../../types/campaigns"

// Mock campaign data
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Software Engineer Outreach - Series A Startups",
    status: "active",
    sent: 85,
    delivered: 82,
    responded: 8,
    interviews: 3,
    positive: 5,
    prospects: 90,
    responseRate: 9.8,
    positiveRate: 6.1,
    interviewRate: 3.7,
    createdAt: "2024-01-15",
    lastActivity: "2 hours ago"
  },
  {
    id: "2", 
    name: "HR Manager Follow-up",
    status: "paused",
    sent: 89,
    delivered: 87,
    opened: 34,
    clicked: 8,
    responded: 3,
    prospects: 95,
    openRate: 39.1,
    clickRate: 9.2,
    responseRate: 3.4,
    createdAt: "2024-01-12",
    lastActivity: "1 day ago"
  },
  {
    id: "3",
    name: "Tech Lead Recruitment",
    status: "completed",
    sent: 156,
    delivered: 151,
    opened: 89,
    clicked: 32,
    responded: 18,
    prospects: 160,
    openRate: 58.9,
    clickRate: 21.2,
    responseRate: 11.9,
    createdAt: "2024-01-08",
    lastActivity: "3 days ago"
  },
  {
    id: "4",
    name: "Sales Team Expansion",
    status: "draft",
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    responded: 0,
    prospects: 78,
    openRate: 0,
    clickRate: 0,
    responseRate: 0,
    createdAt: "2024-01-20",
    lastActivity: "Just now"
  }
]

const statusColors = {
  active: "bg-green-100 text-green-800 border-green-200",
  paused: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  draft: "bg-gray-100 text-gray-800 border-gray-200"
}

const statusIcons = {
  active: Play,
  paused: Pause,
  completed: BarChart3,
  draft: Edit
}


const CampaignOverview: React.FC<CampaignOverviewProps> = ({ onViewCampaign }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [openAccordions, setOpenAccordions] = useState<string[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (campaignId: string, newStatus: CampaignStatus) => {
    const campaign = campaigns.find(c => c.id === campaignId)
    const previousStatus = campaign?.status
    
    setCampaigns(prevCampaigns => 
      prevCampaigns.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, status: newStatus }
          : campaign
      )
    )
    
    // Show toast notification based on the status change
    const statusMessages = {
      active: {
        title: "Campaign activated",
        description: "Your campaign is now actively sending emails to prospects."
      },
      paused: {
        title: "Campaign paused", 
        description: "Email sending has been temporarily stopped."
      },
      completed: {
        title: "Campaign completed",
        description: "This campaign has been marked as completed."
      },
      draft: {
        title: "Campaign saved as draft",
        description: "Campaign has been saved and can be activated later."
      }
    }
    
    toast.success(statusMessages[newStatus].title, {
      description: statusMessages[newStatus].description,
      duration: 3000,
      action: {
        label: "Undo",
        onClick: () => {
          if (previousStatus) {
            setCampaigns(prevCampaigns => 
              prevCampaigns.map(campaign => 
                campaign.id === campaignId 
                  ? { ...campaign, status: previousStatus }
                  : campaign
              )
            )
            toast.info("Status change undone", {
              description: `Campaign status restored to ${previousStatus}.`,
              duration: 2000,
            })
          }
        },
      },
    })
    
    // Here you would typically make an API call to update the campaign status
    console.log(`Campaign ${campaignId} status changed to: ${newStatus}`)
  }

  const totalCampaigns = campaigns.length
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length
  const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0)
  const totalResponded = campaigns.reduce((sum, c) => sum + c.responded, 0)
  const avgResponseRate = totalSent > 0 ? ((totalResponded / totalSent) * 100).toFixed(1) : "0"

  const getInitials = (name: string) => {
    return name.split(' ').slice(0, 3).map(n => n[0]).join('').toUpperCase()
  }

  const getStatusActions = (campaign: Campaign) => {
    switch (campaign.status) {
      case 'active':
        return [
          { label: 'Pause Campaign', action: () => handleStatusChange(campaign.id, 'paused'), icon: Pause }
        ]
      case 'paused':
        return [
          { label: 'Resume Campaign', action: () => handleStatusChange(campaign.id, 'active'), icon: Play }
        ]
      case 'draft':
        return [
          { label: 'Start Campaign', action: () => handleStatusChange(campaign.id, 'active'), icon: Play }
        ]
      case 'completed':
        return [
          { label: 'Restart Campaign', action: () => handleStatusChange(campaign.id, 'active'), icon: Play }
        ]
      default:
        return []
    }
  }

  const handleOpenAll = () => {
    if (openAccordions.length === filteredCampaigns.length) {
      setOpenAccordions([])
    } else {
      setOpenAccordions(filteredCampaigns.map(campaign => campaign.id))
    }
  }

  const isAllOpen = openAccordions.length === filteredCampaigns.length && filteredCampaigns.length > 0

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campaign Overview</h1>
          <p className="text-muted-foreground">
            View the status and performance of your email campaigns.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Campaigns</p>
                <p className="text-2xl font-bold">{totalCampaigns}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
                <p className="text-2xl font-bold">{activeCampaigns}</p>
              </div>
              <Play className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Emails Sent</p>
                <p className="text-2xl font-bold">{totalSent.toLocaleString()}</p>
              </div>
              <Mail className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response Rate</p>
                <p className="text-2xl font-bold">{avgResponseRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={handleOpenAll}
          className="flex items-center gap-2"
          disabled={filteredCampaigns.length === 0}
        >
          {isAllOpen ? "Close All" : "Open All"}
        </Button>
      </div>

      {/* Campaign Accordion */}
      <Accordion 
        type="multiple" 
        value={openAccordions} 
        onValueChange={setOpenAccordions}
        className="w-full space-y-4 pb-8 mb-4"
      >
        {filteredCampaigns.map((campaign) => {
          const StatusIcon = statusIcons[campaign.status]
          return (
            <AccordionItem
              key={campaign.id}
              value={campaign.id}
              className="border border-solid rounded-lg bg-card shadow-sm"
            >
              <div className="flex items-center justify-between px-6 py-4">
                <AccordionTrigger className="flex-1 hover:no-underline [&[data-state=open]]:text-primary p-0">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-sm font-medium">
                        {getInitials(campaign.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <h3 className="font-semibold text-lg">{campaign.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Created {new Date(campaign.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Last activity {campaign.lastActivity}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Badge 
                            variant="outline" 
                            className={`capitalize px-2 py-1 cursor-pointer hover:opacity-80 transition-opacity ${statusColors[campaign.status]}`}
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {campaign.status}
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuLabel>Campaign Status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {getStatusActions(campaign).map((action, index) => (
                            <DropdownMenuItem key={index} onClick={action.action}>
                              <action.icon className="mr-2 h-4 w-4" />
                              {action.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">Response Rate</div>
                        <div className="text-lg font-semibold text-green-600">{campaign.responseRate}%</div>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onViewCampaign?.(campaign.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Campaign
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Campaign
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <AccordionContent className="px-6 pb-4">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 rounded-lg border bg-background">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                      <Users className="h-3 w-3" />
                      <span>Prospects</span>
                    </div>
                    <p className="text-xl font-semibold">{campaign.prospects}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                      <Mail className="h-3 w-3" />
                      <span>Sent</span>
                    </div>
                    <p className="text-xl font-semibold">{campaign.sent}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Delivered</div>
                    <p className="text-xl font-semibold">{campaign.delivered}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Opened</div>
                    <p className="text-xl font-semibold">{campaign.opened}</p>
                    <p className="text-xs text-muted-foreground">{campaign.openRate}%</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Clicked</div>
                    <p className="text-xl font-semibold">{campaign.clicked}</p>
                    <p className="text-xs text-muted-foreground">{campaign.clickRate}%</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Responded</div>
                    <p className="text-xl font-semibold text-green-600">{campaign.responded}</p>
                    <p className="text-xs text-muted-foreground">{campaign.responseRate}%</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>

      {filteredCampaigns.length === 0 && (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No campaigns found</h3>
            <p className="text-muted-foreground text-center">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Create your first campaign to start tracking email performance."
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default CampaignOverview