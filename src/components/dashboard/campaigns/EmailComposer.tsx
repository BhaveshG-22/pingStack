"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wand2, RefreshCw, Flame, AlertTriangle, CheckCircle, User, Building, Target, Info, Eye, Save, Trash2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface EmailComposerProps {
  onNext: () => void
  onBack: () => void
}

export function EmailComposer({ onNext, onBack }: EmailComposerProps) {
  const [subject, setSubject] = useState("Quick question about {company_name}'s growth")
  const [toneDescription, setToneDescription] = useState('')
  const [customTones, setCustomTones] = useState<Array<{id: string, title: string, description: string, instructions: string}>>([])
  const [showSaveTone, setShowSaveTone] = useState(false)
  const [toneTitle, setToneTitle] = useState('')
  const [toneDescriptionSave, setToneDescriptionSave] = useState('')
  const [finalInstructions, setFinalInstructions] = useState('')
  const [isUpdatingPreview, setIsUpdatingPreview] = useState(false)
  const [emailBody] = useState(`Hi {name},

{personalised_message_intro_based_on_profile_to_catch_attention_to_avoid_looking_as_spam}

I'm reaching out because I'm a software engineer looking to connect with innovative founders who are scaling their teams. Your approach to building scalable B2B solutions really resonates with my experience in [relevant technology].

{ask_for_the_purpose_of_the_mail}

Would you be open to a brief 15-minute chat about potential opportunities at {company_name}? I'd love to learn more about your tech stack and see if there's a mutual fit.

{cta}

Best regards,
{your_name}`)

  const getSubjectLineScore = (subject: string) => {
    if (subject.length < 20) return { score: 'Low', color: 'destructive', icon: AlertTriangle }
    if (subject.length > 50) return { score: 'Too Long', color: 'destructive', icon: AlertTriangle }
    if (subject.includes('Quick question')) return { score: 'High Open Rate', color: 'default', icon: Flame }
    return { score: 'Good', color: 'secondary', icon: CheckCircle }
  }

  const subjectScore = getSubjectLineScore(subject)
  const ScoreIcon = subjectScore.icon

  const generateSubjectLines = () => {
    const subjects = [
      "Quick question about {company_name}'s expansion",
      "Impressed by {company_name}'s recent announcement",
      "Fellow developer interested in {company_name}'s mission",
      "5 minutes to discuss an opportunity at {company_name}?",
      "Your thoughts on scaling engineering teams?",
      "Software engineer interested in {company_name}",
      "{name}, quick question about your tech stack"
    ]
    setSubject(subjects[Math.floor(Math.random() * subjects.length)])
  }

  const saveCustomTone = () => {
    if (toneDescription.trim() && toneTitle.trim()) {
      const newTone = {
        id: Date.now().toString(),
        title: toneTitle.trim(),
        description: toneDescriptionSave.trim() || 'Custom tone instructions',
        instructions: toneDescription.trim()
      }
      setCustomTones([...customTones, newTone])
      setShowSaveTone(false)
      setToneTitle('')
      setToneDescriptionSave('')
    }
  }

  const deleteCustomTone = (toneId: string) => {
    setCustomTones(customTones.filter(tone => tone.id !== toneId))
  }

  const selectTone = (instructions: string) => {
    setToneDescription(instructions)
  }

  const updateEmailPreview = () => {
    setIsUpdatingPreview(true)
    // Simulate AI processing delay
    setTimeout(() => {
      setIsUpdatingPreview(false)
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Compose Your Email</h2>
          <p className="text-muted-foreground">AI-powered email composer with live suggestions</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Subject Line</CardTitle>
              <Button variant="outline" size="sm" onClick={generateSubjectLines}>
                <RefreshCw className="h-3 w-3 mr-1" />
                Generate
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter your subject line"
            />
            <div className="flex items-center gap-2">
              <Badge variant={subjectScore.color as "destructive" | "default" | "secondary"}>
                <ScoreIcon className="h-3 w-3 mr-1" />
                {subjectScore.score}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {subject.length} characters
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Tone Instructions</CardTitle>
            <CardDescription>
              Tell the AI how you want your email to sound in natural language
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {customTones.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Saved Tone Presets</Label>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {customTones.map((tone) => (
                    <div
                      key={tone.id}
                      className="relative border border-border bg-muted rounded-md p-3 cursor-pointer hover:bg-muted/80 transition-colors group"
                      onClick={() => selectTone(tone.instructions)}
                    >
                      <div className="flex items-start gap-2 w-full">
                        <Wand2 className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-foreground truncate">{tone.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{tone.description}</div>
                        </div>
                        <button
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-destructive hover:text-destructive/80 rounded-sm hover:bg-muted"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            deleteCustomTone(tone.id)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="tone-input">Tone Instructions</Label>
              <Textarea
                id="tone-input"
                value={toneDescription}
                onChange={(e) => setToneDescription(e.target.value)}
                placeholder="e.g., Sound confident but not pushy, be personable and mention specific details about their company, use casual language but stay professional, show genuine interest in their work..."
                className="resize-none"
                rows={3}
              />
            </div>

            {toneDescription.trim() && (
              <div className="space-y-3">
                <div className="bg-muted border border-border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Wand2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">AI will apply this tone:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "{toneDescription}"
                  </p>
                </div>

                <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Save className="h-4 w-4" />
                    <span>Save this tone for future emails?</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSaveTone(true)}
                  >
                    <Save className="h-3 w-3 mr-1" />
                    Save Tone
                  </Button>
                </div>
              </div>
            )}

            {showSaveTone && (
              <Card className="border-border">
                <CardContent className="p-4 space-y-3">
                  <div>
                    <Label htmlFor="tone-title">Tone Title</Label>
                    <Input
                      id="tone-title"
                      placeholder="e.g., Friendly Tech Outreach"
                      value={toneTitle}
                      onChange={(e) => setToneTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tone-description">Description (Optional)</Label>
                    <Input
                      id="tone-description"
                      placeholder="e.g., For reaching out to engineering managers"
                      value={toneDescriptionSave}
                      onChange={(e) => setToneDescriptionSave(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveCustomTone} size="sm" disabled={!toneTitle.trim()}>
                      <Save className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setShowSaveTone(false)} size="sm">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-medium">Quick Presets</Label>
              <div className="flex gap-2 flex-wrap">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => selectTone("Sound confident and direct, mention specific achievements of their company, be concise and respect their time")}
                >
                  Confident & Direct
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => selectTone("Be warm and personable, show genuine curiosity about their work, use conversational language while staying professional")}
                >
                  Warm & Personal
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => selectTone("Professional and formal tone, highlight mutual connections or interests, demonstrate industry knowledge")}
                >
                  Professional
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Template Structure</CardTitle>
            <CardDescription>
              This template will be personalized for each recipient. Variables in {"{}"} are automatically replaced.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="border rounded-lg p-4 bg-muted/50">
              <h4 className="font-medium text-sm mb-3">Information taken into consideration to generate this email:</h4>
              
              <Accordion type="multiple" className="w-full space-y-2">
                <AccordionItem value="prospect-info" className="border rounded-lg bg-card">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                      <span className="font-medium text-foreground">Prospect's Profile Information</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <ul className="text-muted-foreground space-y-2 text-sm">
                      <li>• <strong>Full name:</strong> Sarah Chen</li>
                      <li>• <strong>Company:</strong> DevTools Inc</li>
                      <li>• <strong>Role:</strong> Engineering Manager</li>
                      <li>• <strong>LinkedIn profile insights:</strong> Professional background and connections</li>
                      <li>• <strong>Custom notes:</strong> "Leads a team of 12 engineers, actively hiring for senior roles"</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="company-research" className="border rounded-lg bg-card">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                      <span className="font-medium text-foreground">Company Research</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <ul className="text-muted-foreground space-y-2 text-sm">
                      <li>• <strong>Industry:</strong> B2B SaaS / Developer Tools</li>
                      <li>• <strong>Company size:</strong> Growing (8 to 12 engineers)</li>
                      <li>• <strong>Business model:</strong> Scalable B2B solutions</li>
                      <li>• <strong>Recent developments:</strong> Team expansion and hiring</li>
                      <li>• <strong>Tech focus:</strong> Engineering infrastructure and developer tools</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="campaign-goal" className="border rounded-lg bg-card">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                      <span className="font-medium text-foreground">Your Campaign Goal</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <ul className="text-muted-foreground space-y-2 text-sm">
                      <li>• <strong>User type:</strong> Job Seeker</li>
                      <li>• <strong>Campaign objective:</strong> Apply for software engineering positions</li>
                      <li>• <strong>Target companies:</strong> Tech startups and scale-ups</li>
                      <li>• <strong>Purpose:</strong> Connect with hiring managers and decision makers</li>
                      <li>• <strong>Preferred approach:</strong> 15-minute introductory chat</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="your-background" className="border rounded-lg bg-card">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                      <span className="font-medium text-foreground">Your Background</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <ul className="text-muted-foreground space-y-2 text-sm">
                      <li>• <strong>Experience:</strong> Software engineer with proven track record</li>
                      <li>• <strong>Relevant skills:</strong> Scalable B2B solutions development</li>
                      <li>• <strong>Technology focus:</strong> [Relevant technology stack]</li>
                      <li>• <strong>Interest areas:</strong> Building technical infrastructure and scaling teams</li>
                      <li>• <strong>Career stage:</strong> Actively seeking new opportunities</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="personalization-strategy" className="border rounded-lg bg-card mb-2">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                      <span className="font-medium text-foreground">Personalization Strategy</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <ul className="text-muted-foreground space-y-2 text-sm">
                      <li>• <strong>Anti-spam approach:</strong> Avoid generic language and templates</li>
                      <li>• <strong>Company references:</strong> Mention specific achievements and growth</li>
                      <li>• <strong>Tone matching:</strong> Professional level appropriate for engineering managers</li>
                      <li>• <strong>Time respect:</strong> Clear, reasonable time commitment (15 minutes)</li>
                      <li>• <strong>Authenticity:</strong> Personal but professional communication style</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4 p-3 bg-muted border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">AI Processing</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  All this information is analyzed to generate a personalized email that mentions DevTools Inc's growth, references Sarah's role in scaling teams, and aligns with your job search goals while maintaining authenticity and avoiding spam filters.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Email Preview
            </CardTitle>
            <CardDescription>How your email will look when sent to Sarah Chen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted border rounded-lg p-4 font-mono text-sm">
              <div className="mb-3 pb-3 border-b">
                <p className="text-muted-foreground text-xs">Subject: {subject.replace('{company_name}', 'DevTools Inc').replace('{name}', 'Sarah')}</p>
              </div>
              <div className="whitespace-pre-line">
                {emailBody
                  .replace('{name}', 'Sarah')
                  .replace('{company_name}', 'DevTools Inc')
                  .replace('{your_name}', '[Your Name]')
                  .replace('{personalised_message_intro_based_on_profile_to_catch_attention_to_avoid_looking_as_spam}', 'I noticed DevTools Inc recently expanded your engineering team from 8 to 12 developers - impressive growth! Your focus on building developer-first tools really resonates with my experience.')
                  .replace('{ask_for_the_purpose_of_the_mail}', 'I\'m specifically interested in opportunities where I can contribute to scaling engineering teams and building robust technical infrastructure.')
                  .replace('{cta}', 'Would you be available for a brief 15-minute call this week to discuss potential opportunities?')
                }
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4 text-primary" />
                  <Label className="text-sm font-medium">Final Customization</Label>
                </div>
                <Textarea
                  value={finalInstructions}
                  onChange={(e) => setFinalInstructions(e.target.value)}
                  placeholder="e.g., make it sound more casual while being professional, add mention of specific technology, make the CTA less direct..."
                  className="resize-none"
                  rows={2}
                />
                {finalInstructions.trim() && (
                  <div className="flex items-center justify-between bg-muted border border-border rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        AI will apply: "{finalInstructions}"
                      </span>
                    </div>
                    <Button
                      onClick={updateEmailPreview}
                      disabled={isUpdatingPreview}
                      size="sm"
                      className="ml-2"
                    >
                      {isUpdatingPreview ? (
                        <>
                          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-3 w-3 mr-1" />
                          Update Preview
                        </>
                      )}
                    </Button>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Use this to make final adjustments after seeing the preview. The AI will modify the email based on your instructions and these instructions will be followed for each email in this campaign.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Prospect Preview</CardTitle>
            <CardDescription>How your email will look for Sarah Chen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Sarah Chen</p>
                  <p className="text-muted-foreground">Engineering Manager with 8+ years experience</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Building className="h-4 w-4 text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">DevTools Inc</p>
                  <p className="text-muted-foreground">B2B SaaS, actively hiring senior engineers</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Target className="h-4 w-4 text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Key Context</p>
                  <p className="text-muted-foreground">Leads a team of 12 engineers, scaling engineering</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Suggestions</CardTitle>
            <CardDescription>Improve your email</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm space-y-2">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground">✓ Good personalization</p>
                <p className="text-muted-foreground">Mentions specific company milestone</p>
              </div>
              
              <div className="p-3 bg-muted rounded-lg border border-border">
                <p className="font-medium text-foreground">💡 Suggestion</p>
                <p className="text-muted-foreground">Try mentioning a specific technology they use</p>
              </div>

              <div className="p-3 bg-muted rounded-lg border border-border">
                <p className="font-medium text-foreground">⚠ Consider</p>
                <p className="text-muted-foreground">Email is a bit long - consider shortening</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3 flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back: Edit Prospects
        </Button>
        <Button onClick={onNext} size="lg">
          Next: Create Variants
        </Button>
      </div>
    </div>
  )
}