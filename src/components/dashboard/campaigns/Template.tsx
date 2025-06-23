"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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