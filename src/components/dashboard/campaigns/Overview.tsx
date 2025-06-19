"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const CampaignOverview = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Campaign Overview</CardTitle>
          <CardDescription>
            View the status and performance of your email campaigns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            <p>Campaign overview functionality coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CampaignOverview