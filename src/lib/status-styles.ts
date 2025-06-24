// Status style utilities for consistent UI across components

export const campaignStatusStyles = {
  active: "bg-green-100 text-green-800 border-green-200",
  paused: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  draft: "bg-gray-100 text-gray-800 border-gray-200"
} as const

export const prospectStatusStyles = {
  interview_scheduled: "bg-green-100 text-green-800 border-green-200",
  positive_response: "bg-emerald-100 text-emerald-800 border-emerald-200",
  no_response: "bg-gray-100 text-gray-800 border-gray-200",
  not_interested: "bg-orange-100 text-orange-800 border-orange-200",
  bounced: "bg-red-100 text-red-800 border-red-200"
} as const

// Lead status styles (for consistency across lead components)
export const leadStatusStyles = {
  contacted: "bg-blue-100 text-blue-800 border-blue-200",
  responded: "bg-green-100 text-green-800 border-green-200",
  scheduled: "bg-yellow-100 text-yellow-800 border-yellow-200",
  closed: "bg-gray-100 text-gray-800 border-gray-200"
} as const

// Utility function to get status style
export function getStatusStyle(
  status: string, 
  type: 'campaign' | 'prospect' | 'lead'
): string {
  switch (type) {
    case 'campaign':
      return campaignStatusStyles[status as keyof typeof campaignStatusStyles] || campaignStatusStyles.draft
    case 'prospect':
      return prospectStatusStyles[status as keyof typeof prospectStatusStyles] || prospectStatusStyles.no_response
    case 'lead':
      return leadStatusStyles[status as keyof typeof leadStatusStyles] || leadStatusStyles.contacted
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}