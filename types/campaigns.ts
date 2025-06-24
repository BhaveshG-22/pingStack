import type { EmailTemplate } from './templates'
import type { Lead } from './leads'

// Campaign-specific types
export type CampaignStatus = 'active' | 'paused' | 'completed' | 'draft'

export interface Campaign {
  id: string
  name: string
  status: CampaignStatus
  sent: number
  delivered: number
  responded: number
  interviews?: number
  positive?: number
  prospects: number
  responseRate: number
  positiveRate?: number
  interviewRate?: number
  opened?: number
  clicked?: number
  openRate?: number
  clickRate?: number
  createdAt: string
  lastActivity: string
  selectedTemplateId?: string
}

export interface CampaignOverviewProps {
  onViewCampaign?: (campaignId: string) => void
}

export interface CampaignDetailProps {
  campaignId?: string
  onBack?: () => void
}

export interface CampaignFormData {
  name: string
  description: string
  targetRole: string
  selectedTemplate?: EmailTemplate
  prospects: Lead[]
  schedule: {
    startDate: string
    sendTimes: string[]
    timezone: string
  }
}

export interface CampaignStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
  isActive: boolean
}

export type CampaignBuilderStep = 
  | 'basic-info'
  | 'template-selection' 
  | 'prospect-selection'
  | 'schedule-setup'
  | 'review-launch'