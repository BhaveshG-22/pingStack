"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Check, X } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  group: z.string().min(1, {
    message: "Please select a group.",
  }),
})

const Add = () => {
  const [groups, setGroups] = useState([
    { value: "tech-leads", label: "Tech Leads" },
    { value: "hr-managers", label: "HR Managers" },
    { value: "recruiters", label: "Recruiters" },
    { value: "startup-founders", label: "Startup Founders" },
    { value: "engineering-managers", label: "Engineering Managers" },
  ])
  const [isAddingGroup, setIsAddingGroup] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      group: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here you would typically send the data to your API
  }

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      const newGroupValue = newGroupName.toLowerCase().replace(/\s+/g, '-')
      const newGroup = { value: newGroupValue, label: newGroupName.trim() }
      setGroups([...groups, newGroup])
      form.setValue("group", newGroupValue)
      setNewGroupName("")
      setIsAddingGroup(false)
    }
  }

  const handleCancelAddGroup = () => {
    setNewGroupName("")
    setIsAddingGroup(false)
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Add New Lead</CardTitle>
          <CardDescription>
            Add a new lead to your contact list for email outreach.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      The recruiter or hiring manager's full name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Bhavesh's Workspace" {...field} />
                    </FormControl>
                    <FormDescription>
                      The company or organization they work for.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.doe@company.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Their business email address for outreach.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="group"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Add new group option */}
                        <div className="p-2 border-b border-gray-600">
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
                                className="flex-1 h-8"
                                autoFocus
                              />
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={handleAddGroup}
                                className="h-8 w-8 p-0 text-green-500 hover:text-green-600"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={handleCancelAddGroup}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setIsAddingGroup(true)}
                              className="flex items-center gap-2 w-full p-2 text-left hover:bg-gray-800 rounded-sm text-white"
                            >
                              <Plus className="h-4 w-4" />
                              Add new group
                            </button>
                          )}
                        </div>
                        
                        {/* Existing groups */}
                        {groups.map((group) => (
                          <SelectItem key={group.value} value={group.value}>
                            {group.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Categorize this lead for better organization.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3">
                <Button type="submit">Add Lead</Button>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Add