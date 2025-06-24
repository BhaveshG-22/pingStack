"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Mail, 
  BarChart3, 
  TrendingUp, 
  Users, 
  ArrowLeft,
  MoreVertical,
  Play,
  Pause,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  Eye,
  MousePointer,
  Clock,
  Target
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { campaignStatusStyles, prospectStatusStyles } from "@/lib/status-styles"
import { toast } from "sonner"

// Define campaign status type
type CampaignStatus = 'active' | 'paused' | 'completed' | 'draft'

// Mock detailed campaign data for job seeking
const mockCampaignDetail = {
  id: "1",
  name: "Software Engineer Outreach - Series A Startups",
  status: "active" as CampaignStatus,
  description: "Reaching out to Engineering Managers and CTOs at Series A startups for Software Engineer opportunities. Targeting companies with 50-200 employees in the SaaS space.",
  sent: 85,
  delivered: 82,
  opened: 45,
  responded: 8,
  interviews: 3,
  positive: 5,
  bounced: 3,
  prospects: 90,
  responseRate: 9.8,
  positiveRate: 6.1,
  interviewRate: 3.7,
  bounceRate: 3.5,
  createdAt: "2024-01-15",
  lastActivity: "2 hours ago",
  jobRole: "Software Engineer",
  targetCompanies: "Series A Startups",
  emailSubject: "Software Engineer interested in [Company Name]'s mission",
  variants: 2,
  totalSequenceSteps: 3,
  currentStep: 2
}

// Mock prospect data for job seekers
const mockProspects = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@techstartup.io",
    company: "TechStartup",
    role: "Engineering Manager",
    companyStage: "Series A",
    status: "interview_scheduled" as const,
    lastEmail: "2024-01-20",
    responseType: "Positive - Interview scheduled",
    outcome: "Interview on Friday 2pm"
  },
  {
    id: "2",
    name: "Mike Rodriguez",
    email: "mike@innovateai.com",
    company: "InnovateAI",
    role: "CTO",
    companyStage: "Series A",
    status: "positive_response" as const,
    lastEmail: "2024-01-19",
    responseType: "Interested - forwarded to team",
    outcome: "Referred to hiring team"
  },
  {
    id: "3",
    name: "Alex Kumar",
    email: "alex@cloudscale.com",
    company: "CloudScale",
    role: "Head of Engineering",
    companyStage: "Series B",
    status: "no_response" as const,
    lastEmail: "2024-01-18",
    responseType: "No response yet",
    outcome: "Follow-up scheduled"
  },
  {
    id: "4",
    name: "Lisa Wang",
    email: "lisa@dataflow.io",
    company: "DataFlow",
    role: "Engineering Manager",
    companyStage: "Series A",
    status: "not_interested" as const,
    lastEmail: "2024-01-17",
    responseType: "Not hiring currently",
    outcome: "No current openings"
  },
  {
    id: "5",
    name: "David Park",
    email: "david@techvision.com",
    company: "TechVision",
    role: "CTO",
    companyStage: "Seed",
    status: "bounced" as const,
    lastEmail: "2024-01-16",
    responseType: "Email bounced",
    outcome: "Invalid email address"
  }
]


interface CampaignDetailProps {
  campaignId?: string
  onBack?: () => void
}

const CampaignDetail: React.FC<CampaignDetailProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [campaignStatus, setCampaignStatus] = useState<CampaignStatus>(mockCampaignDetail.status)
  
  const campaign = { ...mockCampaignDetail, status: campaignStatus }
  const prospects = mockProspects

  const getInitials = (name: string) => {
    return name.split(' ').slice(0, 3).map(n => n[0]).join('').toUpperCase()
  }

  const handleStatusChange = (newStatus: CampaignStatus) => {
    const previousStatus = campaignStatus
    setCampaignStatus(newStatus)
    
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
          setCampaignStatus(previousStatus)
          toast.info("Status change undone", {
            description: `Campaign status restored to ${previousStatus}.`,
            duration: 2000,
          })
        },
      },
    })
    
    // Here you would typically make an API call to update the campaign status
    console.log(`Campaign status changed to: ${newStatus}`)
  }

  const StatusIcon = campaign.status === 'active' ? Play : 
                    campaign.status === 'paused' ? Pause : 
                    campaign.status === 'completed' ? BarChart3 : Edit

  const getStatusActions = () => {
    switch (campaign.status) {
      case 'active':
        return [
          { label: 'Pause Campaign', action: () => handleStatusChange('paused'), icon: Pause }
        ]
      case 'paused':
        return [
          { label: 'Resume Campaign', action: () => handleStatusChange('active'), icon: Play }
        ]
      case 'draft':
        return [
          { label: 'Start Campaign', action: () => handleStatusChange('active'), icon: Play }
        ]
      case 'completed':
        return [
          { label: 'Restart Campaign', action: () => handleStatusChange('active'), icon: Play }
        ]
      default:
        return []
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
      {/* Header */}
      <div className="space-y-4">
        <Button variant="outline" size="sm" onClick={onBack} className="w-fit">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Overview
        </Button>
        
        <div className="flex items-start justify-between">
          <div className="space-y-2 max-w-4xl">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{campaign.name}</h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Badge 
                    variant="outline" 
                    className={`capitalize px-3 py-1 text-sm cursor-pointer hover:opacity-80 transition-opacity ${campaignStatusStyles[campaign.status]}`}
                  >
                    <StatusIcon className="h-4 w-4 mr-2" />
                    {campaign.status}
                  </Badge>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Campaign Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {getStatusActions().map((action, index) => (
                    <DropdownMenuItem key={index} onClick={action.action}>
                      <action.icon className="mr-2 h-4 w-4" />
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">{campaign.description}</p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Campaign Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Campaign
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RefreshCw className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export Results
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Campaign
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Key Job Seeking Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Interview Rate</div>
              <Target className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">{campaign.interviewRate}%</div>
            <div className="text-sm text-muted-foreground">
              {campaign.interviews} interviews scheduled
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Response Rate</div>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">{campaign.responseRate}%</div>
            <div className="text-sm text-muted-foreground">
              {campaign.responded} of {campaign.sent} emails
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Positive Rate</div>
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold text-emerald-600 mb-1">{campaign.positiveRate}%</div>
            <div className="text-sm text-muted-foreground">
              {campaign.positive} positive responses
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Delivery Rate</div>
              <Mail className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {((campaign.delivered / campaign.sent) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">
              {campaign.delivered} of {campaign.sent} sent
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger value="overview" className="text-sm font-medium">Overview</TabsTrigger>
          <TabsTrigger value="prospects" className="text-sm font-medium">Prospects</TabsTrigger>
          <TabsTrigger value="performance" className="text-sm font-medium">Performance</TabsTrigger>
          <TabsTrigger value="content" className="text-sm font-medium">Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Campaign Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Campaign Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Outreach Sequence</span>
                    <span>{campaign.currentStep} of {campaign.totalSequenceSteps} steps</span>
                  </div>
                  <Progress value={(campaign.currentStep / campaign.totalSequenceSteps) * 100} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Target Role</span>
                    <span className="font-medium">{campaign.jobRole}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Companies Targeted</span>
                    <span className="font-medium">{campaign.prospects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Emails Sent</span>
                    <span className="font-medium">{campaign.sent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Email Variants</span>
                    <span className="font-medium">{campaign.variants}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span>Interview scheduled with Sarah Chen (TechStartup)</span>
                    <span className="text-muted-foreground ml-auto">2h ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                    <span>Positive response from Mike Rodriguez (InnovateAI)</span>
                    <span className="text-muted-foreground ml-auto">4h ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                    <span>Follow-up email sent to 15 hiring managers</span>
                    <span className="text-muted-foreground ml-auto">6h ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <span>Initial outreach sent to 25 Series A CTOs</span>
                    <span className="text-muted-foreground ml-auto">1d ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="prospects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Prospect Details ({prospects.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {prospects.map((prospect) => (
                  <div key={prospect.id} className="flex items-center justify-between p-4 rounded-lg border bg-background hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-sm font-medium">
                          {getInitials(prospect.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{prospect.name}</div>
                        <div className="text-sm text-muted-foreground">{prospect.role} • {prospect.company}</div>
                        <div className="text-xs text-muted-foreground">{prospect.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-24">
                        <div className="text-xs text-muted-foreground">Stage</div>
                        <div className="text-sm font-medium">{prospect.companyStage}</div>
                      </div>
                      <div className="text-center min-w-32">
                        <div className="text-xs text-muted-foreground">Response</div>
                        <div className="text-sm font-medium truncate">{prospect.responseType}</div>
                      </div>
                      <div className="text-center min-w-32">
                        <div className="text-xs text-muted-foreground">Outcome</div>
                        <div className="text-sm font-medium truncate">{prospect.outcome}</div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`capitalize px-2 py-1 ${prospectStatusStyles[prospect.status]}`}
                      >
                        {prospect.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emails Sent</span>
                    <span className="font-medium">{campaign.sent}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Delivered</span>
                    <span className="font-medium">{campaign.delivered}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Responses</span>
                    <span className="font-medium text-blue-600">{campaign.responded}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Interviews</span>
                    <span className="font-medium text-green-600">{campaign.interviews}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bounced</span>
                    <span className="font-medium text-red-600">{campaign.bounced}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Success Rates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Response Rate</span>
                      <span>{campaign.responseRate}%</span>
                    </div>
                    <Progress value={campaign.responseRate} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Positive Response Rate</span>
                      <span>{campaign.positiveRate}%</span>
                    </div>
                    <Progress value={campaign.positiveRate} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Interview Rate</span>
                      <span>{campaign.interviewRate}%</span>
                    </div>
                    <Progress value={campaign.interviewRate} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Delivery Rate</span>
                      <span>{((campaign.delivered / campaign.sent) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(campaign.delivered / campaign.sent) * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Mail className="h-6 w-6" />
                Email Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Subject Line</label>
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <div className="text-base font-medium">{campaign.emailSubject}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Email Templates ({campaign.variants} variants)
                </label>
                <div className="space-y-4">
                  <div className="p-5 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <div className="text-base font-semibold mb-3 text-green-800">Template A (Direct Approach)</div>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      Hi {"{firstName}"}, I'm a Software Engineer with 3+ years of experience in React and Node.js. I'm really excited about {"{companyName}"}'s mission to revolutionize the tech industry. I'd love to explore opportunities to contribute to your engineering team...
                    </div>
                  </div>
                  <div className="p-5 border rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                    <div className="text-base font-semibold mb-3 text-blue-800">Template B (Personal Connection)</div>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      Hello {"{firstName}"}, I've been following {"{companyName}"}'s journey and I'm impressed by your recent Series A funding and product direction. As a passionate full-stack developer, I believe my experience building scalable web applications could add value to your team...
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Follow-up Sequence</label>
                <div className="space-y-4">
                  <div className="p-5 border rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
                    <div className="text-base font-semibold mb-3 text-orange-800">Follow-up 1 (After 5 days)</div>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      Hi {"{firstName}"}, I wanted to follow up on my previous email about Software Engineer opportunities at {"{companyName}"}. I'd be happy to share my portfolio and discuss how I can contribute to your team's goals...
                    </div>
                  </div>
                  <div className="p-5 border rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
                    <div className="text-base font-semibold mb-3 text-purple-800">Follow-up 2 (After 10 days)</div>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      Hi {"{firstName}"}, I understand you're probably very busy. I just wanted to share a quick project I built that might be relevant to {"{companyName}"}'s tech stack. Would love to get your thoughts when you have a moment...
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CampaignDetail