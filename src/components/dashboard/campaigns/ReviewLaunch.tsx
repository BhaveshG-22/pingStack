'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, Users, Mail, Eye, Rocket, CheckCircle, AlertCircle } from "lucide-react"

interface ReviewLaunchProps {
  onBack: () => void
  onComplete: () => void
}

export function ReviewLaunch({ onBack, onComplete }: ReviewLaunchProps) {
  const [campaignName, setCampaignName] = useState("Tech Founder Outreach - Q1 2024")
  const [scheduleType, setScheduleType] = useState<'now' | 'later'>('later')
  const [scheduleDate, setScheduleDate] = useState("2024-01-15")
  const [scheduleTime, setScheduleTime] = useState("09:00")
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleLaunch = () => {
    setShowConfirmation(true)
  }

  const confirmLaunch = () => {
    // In a real app, this would start the campaign
    onComplete()
  }

  if (showConfirmation) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <Card className="text-center">
          <CardContent className="pt-8 pb-8">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Campaign Scheduled!</h3>
            <p className="text-muted-foreground mb-6">
              Your campaign "{campaignName}" will begin sending emails on {scheduleDate} at {scheduleTime}.
            </p>
            <div className="space-y-3">
              <Button onClick={confirmLaunch} className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirm & Launch
              </Button>
              <Button variant="outline" onClick={() => setShowConfirmation(false)} className="w-full">
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Ready to Launch! 🚀</h2>
        <p className="text-muted-foreground">Review your campaign details and schedule the launch</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Overview</CardTitle>
          <CardDescription>Final review of your campaign settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input
              id="campaign-name"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Enter campaign name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Recipients</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Total Emails</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">3 email variants</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Recipients</p>
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-muted-foreground">prospects</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Variants</CardTitle>
          <CardDescription>Different versions of your email for testing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Mail className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Variant A - Friendly</p>
                <p className="text-sm text-muted-foreground">Quick question about DevTools Inc's growth</p>
              </div>
              <Badge>33%</Badge>
            </div>

            <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Variant B - Professional</p>
                <p className="text-sm text-muted-foreground">Inquiry regarding opportunities at DevTools Inc</p>
              </div>
              <Badge variant="outline">33%</Badge>
            </div>

            <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Variant C - Direct</p>
                <p className="text-sm text-muted-foreground">Software engineer interested in DevTools Inc</p>
              </div>
              <Badge variant="outline">34%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Launch Settings</CardTitle>
          <CardDescription>When should your campaign start?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button
              variant={scheduleType === 'now' ? 'default' : 'outline'}
              onClick={() => setScheduleType('now')}
              className="flex-1"
            >
              <Rocket className="h-4 w-4 mr-2" />
              Launch Now
            </Button>
            <Button
              variant={scheduleType === 'later' ? 'default' : 'outline'}
              onClick={() => setScheduleType('later')}
              className="flex-1"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule for Later
            </Button>
          </div>

          {scheduleType === 'later' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="schedule-date">Start Date</Label>
                <Input
                  id="schedule-date"
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="schedule-time">Start Time</Label>
                <Input
                  id="schedule-time"
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="bg-muted border border-border rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground">Important</p>
                <p className="text-muted-foreground">
                  Emails will be sent from your connected email account. Make sure your email settings are configured correctly.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back: Edit Variants
        </Button>
        <Button onClick={handleLaunch} size="lg" className="flex-1 gap-2">
          <Rocket className="h-4 w-4" />
          {scheduleType === 'now' ? 'Launch Now' : 'Schedule Campaign'}
        </Button>
      </div>
    </div>
  )
}