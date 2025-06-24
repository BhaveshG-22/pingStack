"use client"

import React, { useState } from 'react'
import CampaignOverview from './Overview'
import CampaignDetail from './Detail'

const CampaignManager = () => {
  const [currentView, setCurrentView] = useState<'overview' | 'detail'>('overview')
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null)

  const handleViewCampaign = (campaignId: string) => {
    setSelectedCampaignId(campaignId)
    setCurrentView('detail')
  }

  const handleBackToOverview = () => {
    setCurrentView('overview')
    setSelectedCampaignId(null)
  }

  if (currentView === 'detail') {
    return (
      <CampaignDetail 
        campaignId={selectedCampaignId || undefined}
        onBack={handleBackToOverview}
      />
    )
  }

  return (
    <CampaignOverview onViewCampaign={handleViewCampaign} />
  )
}

export default CampaignManager