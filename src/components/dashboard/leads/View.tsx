"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { 
  Mail, 
  Building2, 
  Calendar, 
  ArrowLeft, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Eye, 
  Reply,
  MoreVertical,
  Edit,
  Trash2,
  Search
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock lead data matching Groups component
const mockLeads = [
  {
    id: "728ed52f",
    name: "Ken Smith",
    email: "ken99@example.com",
    company: "TechCorp Inc",
    position: "Senior Software Engineer",
    group: "tech-leads",
    status: "responded" as const,
    createdAt: "2024-01-15",
    lastActivity: "2024-01-18",
  },
  {
    id: "489e1d42",
    name: "Abe Johnson",
    email: "abe45@example.com",
    company: "StartupXYZ",
    position: "Founder & CEO",
    group: "startup-founders",
    status: "responded" as const,
    createdAt: "2024-01-14",
    lastActivity: "2024-01-16",
  },
  {
    id: "611ed52f",
    name: "Monserrat Garcia",
    email: "monserrat44@example.com",
    company: "InnovateLab",
    position: "HR Director",
    group: "hr-managers",
    status: "contacted" as const,
    createdAt: "2024-01-13",
    lastActivity: "2024-01-17",
  },
  {
    id: "733ed52f",
    name: "Silas Thompson",
    email: "silas22@example.com",
    company: "DesignStudio",
    position: "Technical Recruiter",
    group: "recruiters",
    status: "scheduled" as const,
    createdAt: "2024-01-12",
    lastActivity: "2024-01-15",
  },
  {
    id: "855ed52f",
    name: "Carmella Rodriguez",
    email: "carmella@example.com",
    company: "MediaGroup",
    position: "HR Manager",
    group: "hr-managers",
    status: "closed" as const,
    createdAt: "2024-01-11",
    lastActivity: "2024-01-14",
  },
  {
    id: "977ed52f",
    name: "John Doe",
    email: "john.doe@techcompany.com",
    company: "Tech Company",
    position: "Engineering Manager",
    group: "engineering-managers",
    status: "contacted" as const,
    createdAt: "2024-01-10",
    lastActivity: "2024-01-13",
  },
  {
    id: "199ed52f",
    name: "Jane Wilson",
    email: "jane.wilson@startup.io",
    company: "Startup IO",
    position: "Co-Founder",
    group: "startup-founders",
    status: "responded" as const,
    createdAt: "2024-01-09",
    lastActivity: "2024-01-12",
  },
  {
    id: "311ed52f",
    name: "Bob Brown",
    email: "bob.brown@enterprise.com",
    company: "Enterprise Corp",
    position: "Tech Lead",
    group: "tech-leads",
    status: "scheduled" as const,
    createdAt: "2024-01-08",
    lastActivity: "2024-01-11",
  }
]

// Mock detailed lead data - create details for all leads
const mockLeadDetails: Record<string, any> = {}

// Generate detailed data for each lead
mockLeads.forEach(lead => {
  mockLeadDetails[lead.id] = {
    ...lead,
    phone: `+1 (555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
    location: ["San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Los Angeles, CA"][Math.floor(Math.random() * 5)],
    source: ["LinkedIn", "Referral", "Company Website", "Job Board", "Conference"][Math.floor(Math.random() * 5)],
    notes: `Professional with experience in ${lead.company}. Interested in new opportunities.`,
    activities: [
      {
        id: "1",
        type: "email_sent",
        title: "Initial outreach email sent",
        description: "Sent personalized introduction email with company overview",
        timestamp: new Date(lead.createdAt + "T10:30:00Z").toISOString(),
        status: "delivered"
      },
      {
        id: "2", 
        type: "email_opened",
        title: "Email opened",
        description: "Recipient opened the email",
        timestamp: new Date(Date.parse(lead.createdAt) + 4 * 60 * 60 * 1000).toISOString(),
        status: "success"
      },
      ...(lead.status === "responded" ? [{
        id: "3",
        type: "email_replied",
        title: "Email replied",
        description: "Recipient replied expressing interest",
        timestamp: new Date(Date.parse(lead.createdAt) + 24 * 60 * 60 * 1000).toISOString(),
        status: "success"
      }] : []),
      ...(lead.status === "scheduled" ? [{
        id: "4",
        type: "call_scheduled",
        title: "Call scheduled",
        description: "Scheduled initial screening call",
        timestamp: new Date(Date.parse(lead.createdAt) + 48 * 60 * 60 * 1000).toISOString(),
        status: "pending"
      }] : [])
    ]
  }
})

const statusColors: Record<string, string> = {
  contacted: "bg-blue-100 text-blue-800 border-blue-200",
  responded: "bg-green-100 text-green-800 border-green-200", 
  scheduled: "bg-yellow-100 text-yellow-800 border-yellow-200",
  closed: "bg-gray-100 text-gray-800 border-gray-200"
}

const groupLabels: Record<string, string> = {
  "tech-leads": "Tech Leads",
  "hr-managers": "HR Managers", 
  "recruiters": "Recruiters",
  "startup-founders": "Startup Founders",
  "engineering-managers": "Engineering Managers"
}

const activityIcons: Record<string, any> = {
  email_sent: Send,
  email_opened: Eye,
  email_replied: Reply,
  call_scheduled: Phone,
  note_added: Edit
}

const activityColors: Record<string, string> = {
  delivered: "text-blue-600 bg-blue-100",
  success: "text-green-600 bg-green-100",
  pending: "text-yellow-600 bg-yellow-100",
  info: "text-gray-600 bg-gray-100"
}

interface ViewProps {
  selectedLeadId?: string | null
}

const View: React.FC<ViewProps> = ({ selectedLeadId }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("all")
  const [selectedLead, setSelectedLead] = useState<string | null>(selectedLeadId || null)
  const [newNote, setNewNote] = useState("")

  // Update selectedLead when selectedLeadId prop changes
  React.useEffect(() => {
    if (selectedLeadId) {
      setSelectedLead(selectedLeadId)
    }
  }, [selectedLeadId])

  // Filter leads
  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGroup = selectedGroup === "all" || lead.group === selectedGroup
    return matchesSearch && matchesGroup
  })

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      console.log("Adding note:", newNote)
      setNewNote("")
    }
  }

  const selectedLeadData = selectedLead ? mockLeadDetails[selectedLead] : null

  return (
    <div className="flex flex-1 gap-4 p-4 pt-0">
      {/* Left Panel - Lead List */}
      <div className="w-1/3 space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">View Leads</h1>
          <p className="text-muted-foreground">
            Search and view detailed information about your leads
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger>
              <SelectValue placeholder="All Groups" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Groups</SelectItem>
              {Object.entries(groupLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Lead List */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Leads ({filteredLeads.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent/50 ${
                  selectedLead === lead.id ? 'bg-accent border-primary' : 'bg-background'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {getInitials(lead.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{lead.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{lead.company}</div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs capitalize ${statusColors[lead.status]}`}
                  >
                    {lead.status}
                  </Badge>
                </div>
              </div>
            ))}
            {filteredLeads.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No leads found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Lead Details */}
      <div className="flex-1">
        {selectedLeadData ? (
          <div className="space-y-6">
            {/* Header */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="text-lg">
                        {getInitials(selectedLeadData.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{selectedLeadData.name}</CardTitle>
                      <p className="text-muted-foreground">{selectedLeadData.position} at {selectedLeadData.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`capitalize ${statusColors[selectedLeadData.status]}`}
                    >
                      {selectedLeadData.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Lead
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Lead
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedLeadData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedLeadData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedLeadData.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedLeadData.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="emails">Emails</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedLeadData.activities?.map((activity: any) => {
                        const IconComponent = activityIcons[activity.type] || Clock
                        return (
                          <div key={activity.id} className="flex gap-4">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${activityColors[activity.status]}`}>
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-sm">{activity.title}</h4>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(activity.timestamp)}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {activity.description}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 border rounded-lg bg-muted/50">
                      <p className="text-sm">{selectedLeadData.notes}</p>
                      <span className="text-xs text-muted-foreground">Added on {new Date(selectedLeadData.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="space-y-2">
                      <Textarea 
                        placeholder="Add a new note..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        rows={3}
                      />
                      <Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()}>
                        Add Note
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="emails" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Email History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Initial Outreach</h4>
                          <span className="text-sm text-muted-foreground">Jan 15, 2024</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Subject:</strong> Exciting React Developer Opportunity
                        </p>
                        <p className="text-sm">
                          Hi {selectedLeadData.name}, I hope this email finds you well. I came across your profile and was impressed by your experience...
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant="secondary" className="text-xs">Delivered</Badge>
                          <Badge variant="secondary" className="text-xs">Opened</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <Card className="h-full">
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Lead</h3>
                <p className="text-muted-foreground">
                  Choose a lead from the list to view detailed information
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default View