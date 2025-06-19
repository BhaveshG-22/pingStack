"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const ResponseTracking = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Response Tracking</CardTitle>
          <CardDescription>
            Track email opens, clicks, and responses from your outreach campaigns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            <p>Response tracking functionality coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResponseTracking