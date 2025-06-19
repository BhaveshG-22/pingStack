"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const NewCampaign = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>New Campaign</CardTitle>
          <CardDescription>
            Create a new email outreach campaign for your leads.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            <p>Campaign creation functionality coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NewCampaign