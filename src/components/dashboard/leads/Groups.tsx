"use client"

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Mail, Building2, Calendar, MoreVertical, Users, Filter, ChevronDown, Plus, Check, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
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

// Mock data matching the structure from Manage.tsx
const mockLeads = [
  {
    id: "728ed52f",
    name: "Ken Smith",
    email: "ken99@example.com",
    company: "TechCorp Inc",
    group: "tech-leads",
    status: "responded" as const,
    createdAt: "2024-01-15",
  },
  {
    id: "489e1d42",
    name: "Abe Johnson",
    email: "abe45@example.com",
    company: "StartupXYZ",
    group: "startup-founders",
    status: "responded" as const,
    createdAt: "2024-01-14",
  },
  {
    id: "611ed52f",
    name: "Monserrat Garcia",
    email: "monserrat44@example.com",
    company: "InnovateLab",
    group: "hr-managers",
    status: "contacted" as const,
    createdAt: "2024-01-13",
  },
  {
    id: "733ed52f",
    name: "Silas Thompson",
    email: "silas22@example.com",
    company: "DesignStudio",
    group: "recruiters",
    status: "scheduled" as const,
    createdAt: "2024-01-12",
  },
  {
    id: "855ed52f",
    name: "Carmella Rodriguez",
    email: "carmella@example.com",
    company: "MediaGroup",
    group: "hr-managers",
    status: "closed" as const,
    createdAt: "2024-01-11",
  },
  {
    id: "977ed52f",
    name: "John Doe",
    email: "john.doe@techcompany.com",
    company: "Tech Company",
    group: "engineering-managers",
    status: "contacted" as const,
    createdAt: "2024-01-10",
  },
  {
    id: "199ed52f",
    name: "Jane Wilson",
    email: "jane.wilson@startup.io",
    company: "Startup IO",
    group: "startup-founders",
    status: "responded" as const,
    createdAt: "2024-01-09",
  },
  {
    id: "311ed52f",
    name: "Bob Brown",
    email: "bob.brown@enterprise.com",
    company: "Enterprise Corp",
    group: "tech-leads",
    status: "scheduled" as const,
    createdAt: "2024-01-08",
  }
]

const groupLabels: Record<string, string> = {
  "tech-leads": "Tech Leads",
  "hr-managers": "HR Managers",
  "recruiters": "Recruiters",
  "startup-founders": "Startup Founders",
  "engineering-managers": "Engineering Managers"
}

const statusColors: Record<string, string> = {
  contacted: "bg-blue-100 text-blue-800 border-blue-200",
  responded: "bg-green-100 text-green-800 border-green-200",
  scheduled: "bg-yellow-100 text-yellow-800 border-yellow-200",
  closed: "bg-gray-100 text-gray-800 border-gray-200"
}

interface GroupsProps {
  onViewLead?: (leadId: string) => void
}

const Groups: React.FC<GroupsProps> = ({ onViewLead }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<string>("all")
  const [groups, setGroups] = useState(groupLabels)
  const [isAddingGroup, setIsAddingGroup] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")

  // Group leads by group
  const groupedLeads = mockLeads.reduce((acc, lead) => {
    if (!acc[lead.group]) {
      acc[lead.group] = []
    }
    acc[lead.group].push(lead)
    return acc
  }, {} as Record<string, typeof mockLeads>)

  // Filter by search term and selected group
  const filteredGroupedLeads = Object.entries(groupedLeads).reduce((acc, [groupKey, leads]) => {
    if (selectedGroup !== "all" && groupKey !== selectedGroup) {
      return acc
    }

    const filteredLeads = leads.filter(lead =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (filteredLeads.length > 0) {
      acc[groupKey] = filteredLeads
    }
    return acc
  }, {} as Record<string, typeof mockLeads>)

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      const newGroupValue = newGroupName.toLowerCase().replace(/\s+/g, '-')
      setGroups({ ...groups, [newGroupValue]: newGroupName.trim() })
      setNewGroupName("")
      setIsAddingGroup(false)
    }
  }

  const handleCancelAddGroup = () => {
    setNewGroupName("")
    setIsAddingGroup(false)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lead Groups</h1>
          <p className="text-muted-foreground">
            View and organize your leads by groups for targeted campaigns.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
          <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>

        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Groups" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Groups</SelectItem>
            {Object.entries(groups).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Add New Group */}
        {isAddingGroup ? (
          <div className="flex items-center gap-2">
            <Input
              placeholder="Enter group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddGroup()
                }
                if (e.key === 'Escape') {
                  e.preventDefault()
                  handleCancelAddGroup()
                }
              }}
              className="w-48"
              autoFocus
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={handleAddGroup}
              className="h-9 w-9 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancelAddGroup}
              className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => setIsAddingGroup(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Group
          </Button>
        )}
      </div>

      {/* Groups Display - Accordion */}
      <Accordion type="multiple" className="w-full space-y-4 pb-8 mb-4">
        {Object.entries(filteredGroupedLeads).map(([groupKey, leads]) => (
          <AccordionItem
            key={groupKey}
            value={groupKey}
            className="border border-solid rounded-lg bg-card shadow-sm"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <AccordionTrigger className="flex-1 hover:no-underline [&[data-state=open]]:text-primary p-0">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-lg font-semibold">{groups[groupKey] || groupKey}</span>
                  <Badge variant="secondary" className="ml-2">
                    {leads.length} {leads.length === 1 ? 'lead' : 'leads'}
                  </Badge>
                </div>
              </AccordionTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Group Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Campaign
                  </DropdownMenuItem>
                  <DropdownMenuItem>Export Group</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    Delete Group
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <AccordionContent className="px-6 pb-4">
              <div className="space-y-3">
                {leads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 rounded-lg border bg-background hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => onViewLead?.(lead.id)}>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-sm font-medium">
                          {getInitials(lead.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <div className="font-medium text-base">{lead.name}</div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{lead.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Building2 className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{lead.company}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 flex-shrink-0" />
                            <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`capitalize px-2 py-1 ${statusColors[lead.status]}`}
                      >
                        {lead.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onViewLead?.(lead.id)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Delete Lead
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {Object.keys(filteredGroupedLeads).length === 0 && (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No leads found</h3>
            <p className="text-muted-foreground text-center">
              {searchTerm || selectedGroup !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Start by adding some leads to organize them into groups."
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Groups