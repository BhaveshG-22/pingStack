'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Wand2, Check, X, User, Sparkles } from "lucide-react"

interface EmailVariant {
  id: string
  recipientName: string
  recipientCompany: string
  subject: string
  content: string
  personalization: string[]
}

interface VariantGeneratorProps {
  onNext: () => void
  onBack: () => void
}

export function VariantGenerator({ onNext, onBack }: VariantGeneratorProps) {
  const [currentVariant, setCurrentVariant] = useState(0)
  const [generateVariants, setGenerateVariants] = useState(true)
  const [variants, setVariants] = useState<EmailVariant[]>([
    {
      id: '1',
      recipientName: 'John Smith',
      recipientCompany: 'TechCorp',
      subject: 'Loved your work on TechCorp\'s European expansion',
      content: `Hi John,

I was really impressed by TechCorp's recent European expansion - that's no small feat for a B2B SaaS company. The strategic approach you took with localized solutions shows real market understanding.

I'm a software engineer with experience in international scaling challenges, and I'd love to learn more about the technical infrastructure you built to support this growth.

Would you be open to a 15-minute conversation about potential opportunities to contribute to TechCorp's continued expansion?

Best regards,
[Your Name]`,
      personalization: [
        'Mentions specific company milestone',
        'References B2B SaaS expertise',
        'Shows understanding of technical challenges'
      ]
    },
    {
      id: '2',
      recipientName: 'Sarah Chen',
      recipientCompany: 'DataFlow',
      subject: 'Your recent blog on scaling data pipelines was insightful',
      content: `Hi Sarah,

Your recent blog post about scaling data pipelines at DataFlow really resonated with me. The way you approached the real-time processing challenges with Apache Kafka was brilliant.

I'm a software engineer specializing in data infrastructure, and I've dealt with similar scaling issues in my previous roles. I'd love to discuss how my experience could contribute to DataFlow's mission.

Any chance you'd have 15 minutes for a quick chat about potential opportunities?

Thanks,
[Your Name]`,
      personalization: [
        'References specific technical content',
        'Mentions relevant technology (Apache Kafka)',
        'Connects personal experience to company needs'
      ]
    },
    {
      id: '3',
      recipientName: 'Mike Rodriguez',
      recipientCompany: 'GrowthLab',
      subject: 'Fellow developer interested in GrowthLab\'s mission',
      content: `Hi Mike,

I've been following GrowthLab's journey since your Series A announcement. Your approach to democratizing growth analytics for smaller companies is exactly the kind of mission-driven work I'm passionate about.

As a full-stack developer with experience in analytics platforms, I'm curious about the technical challenges you're solving at GrowthLab.

Would you be interested in a brief conversation about how I might contribute to your team's impact?

Best,
[Your Name]`,
      personalization: [
        'References funding milestone',
        'Aligns with company mission',
        'Highlights relevant technical background'
      ]
    }
  ])

  const nextVariant = () => {
    setCurrentVariant((prev) => (prev + 1) % variants.length)
  }

  const prevVariant = () => {
    setCurrentVariant((prev) => (prev - 1 + variants.length) % variants.length)
  }

  const acceptAllVariants = () => {
    // In a real app, this would save the variants
    onNext()
  }

  const current = variants[currentVariant]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Personalized Variants</h2>
        <p className="text-muted-foreground">
          AI-generated personalized versions for each recipient
        </p>
      </div>

      <Card className="bg-muted border-border">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">AI Personalization Active</p>
              <p className="text-muted-foreground">
                Each email is uniquely crafted based on recipient data, recent activities, and company context.
                This helps avoid spam filters and significantly boosts reply rates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={prevVariant}
            disabled={currentVariant === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              Variant {currentVariant + 1} of {variants.length}
            </span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={nextVariant}
            disabled={currentVariant === variants.length - 1}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{current.recipientName}</CardTitle>
              <CardDescription className="text-base">{current.recipientCompany}</CardDescription>
            </div>
            <Badge variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Personalized
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Subject Line</h4>
            <div className="bg-muted/50 rounded-lg p-3 border">
              <p className="text-sm font-medium">{current.subject}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Email Content</h4>
            <div className="bg-muted/50 rounded-lg p-4 border">
              <pre className="text-sm whitespace-pre-wrap font-sans">{current.content}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Personalization Applied</h4>
            <div className="space-y-2">
              {current.personalization.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {variants.map((variant, index) => (
          <Card 
            key={variant.id}
            className={`cursor-pointer transition-all ${
              index === currentVariant 
                ? 'ring-2 ring-primary shadow-md' 
                : 'hover:shadow-sm'
            }`}
            onClick={() => setCurrentVariant(index)}
          >
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-sm">{variant.recipientName}</p>
                <Badge variant="outline" className="text-xs">
                  {variant.recipientCompany}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {variant.subject}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Generate personalized variants for all {variants.length} recipients?
            </p>
            <div className="flex justify-center gap-2">
              <Button onClick={acceptAllVariants}>
                <Check className="h-4 w-4 mr-2" />
                Accept All Variants
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back: Edit Email
        </Button>
        <Button onClick={onNext} size="lg">
          Next: Review & Launch
        </Button>
      </div>
    </div>
  )
}