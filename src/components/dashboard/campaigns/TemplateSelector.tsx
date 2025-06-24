"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Mail, 
  Search, 
  Eye, 
  Star,
  TrendingUp,
  Edit,
  Copy,
  Check
} from "lucide-react"
import { 
  emailTemplates, 
  templateCategories, 
  templateTones, 
  getTemplatesByCategory
} from "@/lib/email-templates"
import { toast } from "sonner"
import type { EmailTemplate, TemplateSelectorProps } from "../../../../types/templates"

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  onSelectTemplate, 
  selectedTemplateId 
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Templates")
  const [selectedTone, setSelectedTone] = useState("all")
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null)
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [customizedTemplate, setCustomizedTemplate] = useState<EmailTemplate | null>(null)

  const filteredTemplates = emailTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All Templates" || template.category === selectedCategory
    const matchesTone = selectedTone === "all" || template.tone === selectedTone
    
    return matchesSearch && matchesCategory && matchesTone
  })

  const handleSelectTemplate = (template: EmailTemplate) => {
    onSelectTemplate?.(template)
    toast.success("Template selected!", {
      description: `"${template.name}" has been selected for your campaign.`,
      duration: 3000,
    })
  }

  const handleCustomizeTemplate = (template: EmailTemplate) => {
    setCustomizedTemplate({...template})
    setIsCustomizing(true)
  }

  const handleSaveCustomization = () => {
    if (customizedTemplate) {
      onSelectTemplate?.(customizedTemplate)
      setIsCustomizing(false)
      toast.success("Customized template saved!", {
        description: "Your customized template has been applied to the campaign.",
        duration: 3000,
      })
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success("Copied to clipboard!", {
        description: "Template content has been copied to your clipboard.",
        duration: 2000,
      })
    } catch (err) {
      toast.error("Failed to copy", {
        description: "Unable to copy to clipboard. Please try again.",
        duration: 2000,
      })
    }
  }

  const getToneColor = (tone: string) => {
    switch (tone) {
      case 'professional': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'casual': return 'bg-green-100 text-green-800 border-green-200'
      case 'direct': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'personal': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Email Templates</h2>
          <p className="text-muted-foreground">
            Choose from our proven templates or customize your own
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {filteredTemplates.length} templates
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {templateCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedTone} onValueChange={setSelectedTone}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tones</SelectItem>
            {templateTones.map((tone) => (
              <SelectItem key={tone} value={tone}>
                {tone.charAt(0).toUpperCase() + tone.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card 
            key={template.id} 
            className={`transition-all cursor-pointer hover:shadow-md ${
              selectedTemplateId === template.id ? 'ring-2 ring-primary' : ''
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
                {template.successRate && (
                  <Badge variant="secondary" className="ml-2">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {template.successRate}%
                  </Badge>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className={getToneColor(template.tone)}>
                  {template.tone}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {template.targetRole}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium mb-1">Subject:</div>
                  <div className="text-muted-foreground italic">
                    {template.subjectLine}
                  </div>
                </div>

                <div className="text-sm">
                  <div className="font-medium mb-1">Preview:</div>
                  <div className="text-muted-foreground line-clamp-3">
                    {template.content.substring(0, 120)}...
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{template.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setPreviewTemplate(template)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col bg-white dark:bg-slate-900 border border-border">
                      <DialogHeader className="flex-shrink-0 pb-4 border-b border-border">
                        <DialogTitle className="flex items-center gap-2 text-foreground">
                          <Mail className="h-5 w-5" />
                          {template.name}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">{template.description}</DialogDescription>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="capitalize text-xs">
                            {template.tone}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                          {template.successRate && (
                            <Badge variant="outline" className="text-green-600 text-xs">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {template.successRate}% success
                            </Badge>
                          )}
                        </div>
                      </DialogHeader>
                      
                      <div className="flex-1 overflow-y-auto space-y-6 pr-2 pt-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Left Column - Template Info */}
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2 text-sm text-foreground">Subject Line:</h4>
                              <div className="text-sm bg-slate-50 dark:bg-slate-800 p-3 rounded border border-border text-foreground">
                                {template.subjectLine}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2 text-sm text-foreground">Template Tags:</h4>
                              <div className="flex flex-wrap gap-1">
                                {template.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2 text-sm text-foreground">Target Role:</h4>
                              <p className="text-sm text-muted-foreground">{template.targetRole}</p>
                            </div>
                          </div>

                          {/* Right Column - Email Content */}
                          <div>
                            <h4 className="font-medium mb-2 text-sm text-foreground">Email Content:</h4>
                            <div className="text-sm bg-slate-50 dark:bg-slate-800 p-4 rounded border border-border whitespace-pre-wrap max-h-80 overflow-y-auto text-foreground">
                              {template.content}
                            </div>
                          </div>
                        </div>

                        {template.followUpSequence && template.followUpSequence.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-3 text-sm text-foreground">Follow-up Sequence ({template.followUpSequence.length} emails):</h4>
                            <div className="space-y-3">
                              {template.followUpSequence.map((followUp, index) => (
                                <div key={index} className="border border-border rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                                  <div className="bg-slate-100 dark:bg-slate-700 px-4 py-2 border-b border-border">
                                    <div className="font-medium text-sm text-foreground">
                                      Follow-up {followUp.step} • After {followUp.delay} days
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      Subject: {followUp.subjectLine}
                                    </div>
                                  </div>
                                  <div className="p-4">
                                    <div className="text-sm whitespace-pre-wrap max-h-32 overflow-y-auto text-foreground">
                                      {followUp.content}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                          <h4 className="font-medium text-sm mb-2 text-blue-900 dark:text-blue-100">Template Variables</h4>
                          <p className="text-xs text-blue-700 dark:text-blue-300">
                            This template uses placeholders like <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded text-blue-900 dark:text-blue-100">{"{firstName}"}</code>, <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded text-blue-900 dark:text-blue-100">{"{companyName}"}</code>, <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded text-blue-900 dark:text-blue-100">{"{experience}"}</code>, etc. 
                            These will be automatically replaced with actual values when sending emails to prospects.
                          </p>
                        </div>
                      </div>

                      <DialogFooter className="gap-2 pt-4 border-t border-border bg-white dark:bg-slate-900">
                        <Button 
                          variant="outline" 
                          onClick={() => copyToClipboard(template.content)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Content
                        </Button>
                        <Button onClick={() => handleCustomizeTemplate(template)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Customize
                        </Button>
                        <Button onClick={() => handleSelectTemplate(template)}>
                          <Check className="h-4 w-4 mr-2" />
                          Use Template
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleSelectTemplate(template)}
                  >
                    {selectedTemplateId === template.id ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Selected
                      </>
                    ) : (
                      'Use Template'
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No templates found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or browse different categories.
          </p>
        </div>
      )}

      {/* Customization Dialog */}
      <Dialog open={isCustomizing} onOpenChange={setIsCustomizing}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customize Template</DialogTitle>
            <DialogDescription>
              Modify the template to better fit your needs
            </DialogDescription>
          </DialogHeader>

          {customizedTemplate && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Template Name</label>
                <Input
                  value={customizedTemplate.name}
                  onChange={(e) => setCustomizedTemplate({
                    ...customizedTemplate,
                    name: e.target.value
                  })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Subject Line</label>
                <Input
                  value={customizedTemplate.subjectLine}
                  onChange={(e) => setCustomizedTemplate({
                    ...customizedTemplate,
                    subjectLine: e.target.value
                  })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email Content</label>
                <Textarea
                  value={customizedTemplate.content}
                  onChange={(e) => setCustomizedTemplate({
                    ...customizedTemplate,
                    content: e.target.value
                  })}
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>

              <div className="text-xs text-muted-foreground">
                <strong>Available placeholders:</strong> {"{firstName}"}, {"{companyName}"}, {"{experience}"}, {"{techStack}"}, {"{yourName}"}, and more...
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCustomizing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCustomization}>
              Save & Use Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TemplateSelector