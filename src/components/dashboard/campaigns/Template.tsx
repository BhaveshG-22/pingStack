"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// TODO: Campaign Templates Feature
// This feature includes:
// - Email template library with 8+ job-seeking focused templates
// - Template categories (Engineering, Product, Data Science, etc.)
// - Template preview with full content display
// - Template customization functionality
// - Success rate indicators and performance metrics
// - Copy to clipboard and export functionality
// - Integration with campaign builder
// 
// Files created:
// - /src/lib/email-templates.ts (template data structure)
// - /src/components/dashboard/campaigns/TemplateSelector.tsx (main component)
// 
// Features completed:
// ✅ Template library with 8 proven templates
// ✅ Search and filtering by category/tone
// ✅ Template preview modals with full content
// ✅ Template customization with live editing
// ✅ Dark mode support and proper styling
// ✅ Integration with campaign detail component
// ✅ Toast notifications for user feedback
// ✅ Success rate display and performance metrics

/* COMMENTED OUT - TEMPLATE FUNCTIONALITY
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import TemplateSelector from "./TemplateSelector"
import { type EmailTemplate } from "@/lib/email-templates"
import { toast } from "sonner"
import { 
  Mail, 
  Star,
  Copy,
  Download,
  Plus,
  TrendingUp
} from "lucide-react"

const CampaignTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)

  const handleTemplateSelection = (template: EmailTemplate) => {
    setSelectedTemplate(template)
    toast.success("Template selected!", {
      description: `"${template.name}" is now selected for preview.`,
      duration: 3000,
    })
  }

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      toast.success("Template ready for use!", {
        description: `Navigate to Campaign Builder to use "${selectedTemplate.name}".`,
        duration: 4000,
        action: {
          label: "Go to Builder",
          onClick: () => {
            console.log("Navigate to campaign builder with template:", selectedTemplate.id)
          },
        },
      })
    }
  }

  const copyTemplateContent = async () => {
    if (selectedTemplate) {
      try {
        const content = `Subject: ${selectedTemplate.subjectLine}\n\n${selectedTemplate.content}`
        await navigator.clipboard.writeText(content)
        toast.success("Template copied!", {
          description: "Template content has been copied to your clipboard.",
          duration: 2000,
        })
      } catch (err) {
        toast.error("Failed to copy", {
          description: "Unable to copy template content.",
          duration: 2000,
        })
      }
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campaign Templates</h1>
          <p className="text-muted-foreground">
            Browse and use proven email templates for your job search campaigns.
          </p>
        </div>
        <div className="flex gap-2">
          {selectedTemplate && (
            <>
              <Button variant="outline" onClick={copyTemplateContent}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Template
              </Button>
              <Button onClick={handleUseTemplate}>
                <Plus className="h-4 w-4 mr-2" />
                Use in Campaign
              </Button>
            </>
          )}
        </div>
      </div>

      <TemplateSelector 
        onSelectTemplate={handleTemplateSelection}
        selectedTemplateId={selectedTemplate?.id}
      />

      {selectedTemplate && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  {selectedTemplate.name}
                </CardTitle>
                <CardDescription>{selectedTemplate.description}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="capitalize">
                  {selectedTemplate.tone}
                </Badge>
                <Badge variant="secondary">
                  {selectedTemplate.category}
                </Badge>
                {selectedTemplate.successRate && (
                  <Badge variant="outline" className="text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {selectedTemplate.successRate}% success
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Target Role</h4>
                  <p className="text-sm text-muted-foreground">{selectedTemplate.targetRole}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Template Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedTemplate.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedTemplate.followUpSequence && (
                  <div>
                    <h4 className="font-medium mb-2">Follow-up Sequence</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedTemplate.followUpSequence.length} follow-up emails included
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Subject Line Preview</h4>
                  <div className="p-3 bg-muted/50 rounded-lg border text-sm">
                    {selectedTemplate.subjectLine}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Content Preview</h4>
                  <div className="p-3 bg-muted/50 rounded-lg border text-sm max-h-32 overflow-y-auto">
                    {selectedTemplate.content.substring(0, 200)}...
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={handleUseTemplate} className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Use This Template
              </Button>
              <Button variant="outline" onClick={copyTemplateContent}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Content
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
*/

const CampaignTemplates = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Campaign Templates</CardTitle>
          <CardDescription>
            View the templates to reuse in email campaigns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            <p>Campaign Templates functionality coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CampaignTemplates