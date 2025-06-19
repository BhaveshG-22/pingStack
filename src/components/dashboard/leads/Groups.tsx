"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const Groups = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Lead Groups</CardTitle>
          <CardDescription>
            Organize your leads into groups for targeted campaigns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            <p>Lead grouping functionality coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Groups