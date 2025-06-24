// Component-specific types
export interface FooterProps {
  variant?: 'default' | 'privacy'
  className?: string
}

export interface NavItem {
  title: string
  url: string
  icon?: any
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

export interface SidebarProps {
  onNavigate?: (view: string) => void
  activeView?: string
}

// Search and Filter Types
export interface SearchFilters {
  query?: string
  status?: string
  category?: string
  tone?: string
  dateRange?: {
    start: string
    end: string
  }
}

// Toast Notification Types
export interface ToastConfig {
  title: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}