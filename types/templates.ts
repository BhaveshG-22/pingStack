// Email Template types
export type TemplateTone = 'professional' | 'casual' | 'direct' | 'personal'

export interface EmailTemplate {
  id: string
  name: string
  category: string
  description: string
  targetRole: string
  tone: TemplateTone
  subjectLine: string
  content: string
  followUpSequence?: {
    step: number
    delay: number
    subjectLine: string
    content: string
  }[]
  tags: string[]
  successRate?: number
}

export interface TemplateSelectorProps {
  onSelectTemplate?: (template: EmailTemplate) => void
  selectedTemplateId?: string
}