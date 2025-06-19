"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
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
  Trash2
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Mock lead data with detailed information
const mockLeadDetail = {
  id: "728ed52f",
  name: "Ken Smith",
  email: "ken99@example.com",
  company: "TechCorp Inc",
  position: "Senior Software Engineer",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  group: "tech-leads",
  status: "responded" as const,
  createdAt: "2024-01-15",
  lastActivity: "2024-01-18",
  source: "LinkedIn",
  notes: "Interested in React and TypeScript positions. Looking for remote opportunities.",
}

// Mock activity data
const mockActivities = [
  {
    id: "1",
    type: "email_sent",
    title: "Initial outreach email sent",
    description: "Sent personalized introduction email with company overview",
    timestamp: "2024-01-15T10:30:00Z",
    status: "delivered"
  },
  {
    id: "2", 
    type: "email_opened",
    title: "Email opened",
    description: "Recipient opened the email",
    timestamp: "2024-01-15T14:22:00Z",
    status: "success"
  },
  {
    id: "3",
    type: "email_replied",
    title: "Email replied",
    description: "Recipient replied expressing interest",
    timestamp: "2024-01-16T09:15:00Z",
    status: "success"
  },
  {
    id: "4",
    type: "call_scheduled",
    title: "Call scheduled",
    description: "Scheduled initial screening call for next week",
    timestamp: "2024-01-17T16:45:00Z",
    status: "pending"
  },
  {
    id: "5",
    type: "note_added",
    title: "Note added",
    description: "Added notes about candidate preferences",
    timestamp: "2024-01-18T11:20:00Z",
    status: "info"
  }
]

const statusColors: Record<string, string> = {
  contacted: "bg-blue-100 text-blue-800 border-blue-200",
  responded: "bg-green-100 text-green-800 border-green-200", 
  scheduled: "bg-yellow-100 text-yellow-800 border-yellow-200",
  closed: "bg-gray-100 text-gray-800 border-gray-200"
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

interface LeadDetailProps {
  leadId: string
  onBack: () => void
}

const LeadDetail: React.FC<LeadDetailProps> = ({ leadId, onBack }) => {
  const [newNote, setNewNote] = useState("")
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Here you would add the note to the backend
      console.log("Adding note:", newNote)
      setNewNote("")
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Groups
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">Lead Details</h1>
          <p className="text-muted-foreground">
            Detailed information and activity history
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Information Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Contact Information</CardTitle>
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
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar and Name */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg font-semibold">
                    {getInitials(mockLeadDetail.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{mockLeadDetail.name}</h3>
                  <p className="text-muted-foreground">{mockLeadDetail.position}</p>
                  <Badge 
                    variant="outline" 
                    className={`mt-2 capitalize ${statusColors[mockLeadDetail.status]}`}
                  >
                    {mockLeadDetail.status}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockLeadDetail.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockLeadDetail.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockLeadDetail.company}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockLeadDetail.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Added {new Date(mockLeadDetail.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Last activity {new Date(mockLeadDetail.lastActivity).toLocaleDateString()}</span>
                </div>
              </div>

              <Separator />

              {/* Notes Section */}
              <div>
                <h4 className="font-medium mb-2">Notes</h4>
                <p className="text-sm text-muted-foreground mb-3">{mockLeadDetail.notes}</p>
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
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity and Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="activity">Activity Timeline</TabsTrigger>
              <TabsTrigger value="emails">Email History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockActivities.map((activity, index) => {
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

            <TabsContent value="emails" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Correspondence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Initial Outreach</h4>
                        <span className="text-sm text-muted-foreground">Jan 15, 2024</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Subject:</strong> Exciting React Developer Opportunity at TechCorp
                      </p>
                      <p className="text-sm">
                        Hi Ken, I hope this email finds you well. I came across your profile and was impressed by your experience with React and TypeScript...
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary" className="text-xs">Delivered</Badge>
                        <Badge variant="secondary" className="text-xs">Opened</Badge>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Reply from Ken</h4>
                        <span className="text-sm text-muted-foreground">Jan 16, 2024</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Subject:</strong> Re: Exciting React Developer Opportunity at TechCorp
                      </p>
                      <p className="text-sm">
                        Thank you for reaching out! I'm definitely interested in learning more about this opportunity. The role sounds like a great fit for my background...
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default LeadDetail