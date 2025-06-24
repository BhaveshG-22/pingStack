// API and Data types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Analytics Types
export interface AnalyticsData {
  campaignId: string
  totalSent: number
  totalDelivered: number
  totalOpened: number
  totalClicked: number
  totalResponded: number
  totalInterviews: number
  openRate: number
  clickRate: number
  responseRate: number
  interviewRate: number
  bounceRate: number
}

// User Preferences Types
export interface UserPreferences {
  timezone: string
  emailSignature: string
  defaultSendTimes: string[]
  notifications: {
    email: boolean
    browser: boolean
    responses: boolean
    interviews: boolean
  }
}

// SMTP Configuration Types
export interface SMTPConfig {
  id: string
  provider: 'gmail' | 'outlook' | 'custom'
  email: string
  host?: string
  port?: number
  secure?: boolean
  username: string
  password: string // This should be encrypted
  isDefault: boolean
}

// File Upload Types
export interface FileUploadResult {
  success: boolean
  fileName: string
  fileSize: number
  uploadedLeads?: import('./leads').Lead[]
  errors?: string[]
}