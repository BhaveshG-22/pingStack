// Lead and Prospect types
export type ProspectStatus = 
  | 'interview_scheduled' 
  | 'positive_response' 
  | 'no_response' 
  | 'not_interested' 
  | 'bounced'

export interface Lead {
  id: string
  name: string
  email: string
  company: string
  role?: string
  group?: string
  status?: string
  notes?: string
  createdAt: string
  lastContact?: string
}

export interface Prospect {
  id: string
  name: string
  email: string
  company: string
  role: string
  companyStage: string
  status: ProspectStatus
  lastEmail: string
  responseType: string
  outcome: string
}

export interface LeadGroup {
  id: string
  name: string
  description?: string
  leadCount: number
  createdAt: string
  leads?: Lead[]
}