'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, X, Sparkles, Users, Check, Target, ChevronDown, Mail, UserCircle, Save, Trash2 } from "lucide-react"

interface Prospect {
  id: string
  name: string
  company: string
  role: string
  linkedinUrl: string
  customNote: string
}

interface LeadList {
  id: string
  name: string
  description: string
  prospects: Prospect[]
  tags: string[]
}

const LEAD_LISTS: LeadList[] = [
  {
    id: 'tech-hiring-managers',
    name: 'Tech Hiring Managers',
    description: 'Engineering managers and CTOs at growing tech companies',
    tags: ['Tech', 'Hiring', 'Management'],
    prospects: [
      {
        id: '1',
        name: 'Sarah Chen',
        company: 'DevTools Inc',
        role: 'Engineering Manager',
        linkedinUrl: 'https://linkedin.com/in/sarahchen',
        customNote: 'Leads a team of 12 engineers, actively hiring for senior roles'
      },
      {
        id: '2',
        name: 'Marcus Rodriguez',
        company: 'CloudBase',
        role: 'CTO',
        linkedinUrl: 'https://linkedin.com/in/marcusrodriguez',
        customNote: 'Scaling engineering team, values diverse talent'
      },
      {
        id: '3',
        name: 'Emily Watson',
        company: 'TechFlow',
        role: 'VP of Engineering',
        linkedinUrl: 'https://linkedin.com/in/emilywatson',
        customNote: 'Building product teams, open to junior and senior developers'
      },
      {
        id: '4',
        name: 'David Kim',
        company: 'StartupLabs',
        role: 'Head of Engineering',
        linkedinUrl: 'https://linkedin.com/in/davidkim',
        customNote: 'Early-stage startup, looking for full-stack developers'
      }
    ]
  },
  {
    id: 'tech-recruiters',
    name: 'Tech Recruiters',
    description: 'Recruiters specializing in technical roles and placements',
    tags: ['Recruiting', 'HR', 'Tech'],
    prospects: [
      {
        id: '5',
        name: 'Jennifer Adams',
        company: 'TechTalent Solutions',
        role: 'Senior Technical Recruiter',
        linkedinUrl: 'https://linkedin.com/in/jenniferadams',
        customNote: 'Specializes in startup and scale-up recruitment, 5+ years experience'
      },
      {
        id: '6',
        name: 'Michael Brown',
        company: 'Elite Tech Recruiting',
        role: 'Principal Recruiter',
        linkedinUrl: 'https://linkedin.com/in/michaelbrown',
        customNote: 'Focus on senior engineering and leadership roles'
      },
      {
        id: '7',
        name: 'Lisa Park',
        company: 'InnovateTalent',
        role: 'Tech Recruiter',
        linkedinUrl: 'https://linkedin.com/in/lisapark',
        customNote: 'Recruits for AI/ML and data science positions'
      }
    ]
  },
  {
    id: 'industry-professionals',
    name: 'Industry Professionals',
    description: 'Senior professionals in your target industry for networking',
    tags: ['Networking', 'Mentorship', 'Industry'],
    prospects: [
      {
        id: '8',
        name: 'Alex Thompson',
        company: 'Google',
        role: 'Senior Software Engineer',
        linkedinUrl: 'https://linkedin.com/in/alexthompson',
        customNote: 'Open to mentoring, active in tech communities'
      },
      {
        id: '9',
        name: 'Rachel Martinez',
        company: 'Microsoft',
        role: 'Product Manager',
        linkedinUrl: 'https://linkedin.com/in/rachelmartinez',
        customNote: 'Transitioned from engineering to PM, shares career insights'
      },
      {
        id: '10',
        name: 'James Wilson',
        company: 'Meta',
        role: 'Staff Engineer',
        linkedinUrl: 'https://linkedin.com/in/jameswilson',
        customNote: 'Technical lead, helps with code reviews and career advice'
      }
    ]
  }
]

const CAMPAIGN_GOAL_TEMPLATES = {
  'job-seeker': [
    {
      id: 'job-application',
      title: 'Job Application',
      description: 'Apply to specific job opportunities',
      template: 'Express interest in the [job title] position at [company name] and highlight how my experience in [relevant skills/experience] makes me a strong candidate for this role.'
    },
    {
      id: 'networking',
      title: 'Professional Networking',
      description: 'Build connections in your industry',
      template: 'Connect with professionals in [industry/field] to expand my network, learn about industry trends, and explore potential career opportunities in [specific area].'
    },
    {
      id: 'informational-interview',
      title: 'Informational Interview',
      description: 'Learn about companies and roles',
      template: 'Request an informational interview with [job title/department] professionals at [company/industry] to learn about their career path, company culture, and advice for someone entering [field].'
    },
    {
      id: 'referral-request',
      title: 'Referral Request',
      description: 'Ask for job referrals from connections',
      template: 'Reach out to connections at [target companies] to request a referral for [specific position] and share how my background in [relevant experience] aligns with the role requirements.'
    }
  ],
  professional: [
    {
      id: 'career-advancement',
      title: 'Career Advancement',
      description: 'Explore new opportunities within your field',
      template: 'Connect with [senior professionals/leaders] in [industry] to discuss career advancement opportunities and seek advice on transitioning to [target role/level].'
    },
    {
      id: 'industry-insights',
      title: 'Industry Insights',
      description: 'Stay updated on industry trends and opportunities',
      template: 'Engage with thought leaders and professionals in [industry] to stay informed about market trends, emerging opportunities, and best practices in [specific area].'
    },
    {
      id: 'collaboration',
      title: 'Professional Collaboration',
      description: 'Find collaboration opportunities',
      template: 'Explore collaboration opportunities with professionals in [related field/industry] to work on [project type] or share knowledge about [specific expertise area].'
    },
    {
      id: 'mentorship',
      title: 'Mentorship',
      description: 'Find mentors or offer mentorship',
      template: 'Connect with experienced professionals in [field] to seek mentorship guidance for my career development in [specific area] or offer to mentor others in [your expertise].'
    }
  ]
}

interface ProspectInputProps {
  onNext: () => void
}

export function ProspectInput({ onNext }: ProspectInputProps) {
  const [campaignGoal, setCampaignGoal] = useState('')
  const [userType, setUserType] = useState<'job-seeker' | 'professional'>('job-seeker')
  const [selectedLeadLists, setSelectedLeadLists] = useState<string[]>([])
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [customGoals, setCustomGoals] = useState<Array<{id: string, title: string, description: string, template: string}>>([])
  const [showSaveGoal, setShowSaveGoal] = useState(false)
  const [goalTitle, setGoalTitle] = useState('')
  const [goalDescription, setGoalDescription] = useState('')

  const addProspect = () => {
    setProspects([...prospects, {
      id: Date.now().toString(),
      name: '',
      company: '',
      role: '',
      linkedinUrl: '',
      customNote: ''
    }])
  }

  const updateProspect = (id: string, field: keyof Prospect, value: string) => {
    setProspects(prospects.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const removeProspect = (id: string) => {
    setProspects(prospects.filter(p => p.id !== id))
  }

  const toggleLeadList = (leadListId: string) => {
    const isSelected = selectedLeadLists.includes(leadListId)
    let newSelectedLeadLists: string[]
    
    if (isSelected) {
      newSelectedLeadLists = selectedLeadLists.filter(id => id !== leadListId)
    } else {
      newSelectedLeadLists = [...selectedLeadLists, leadListId]
    }
    
    setSelectedLeadLists(newSelectedLeadLists)
    
    // Combine prospects from all selected lead lists
    const allProspects: Prospect[] = []
    const seenIds = new Set<string>()
    
    newSelectedLeadLists.forEach(listId => {
      const leadList = LEAD_LISTS.find(list => list.id === listId)
      if (leadList) {
        leadList.prospects.forEach(prospect => {
          if (!seenIds.has(prospect.id)) {
            allProspects.push(prospect)
            seenIds.add(prospect.id)
          }
        })
      }
    })
    
    setProspects(allProspects)
  }

  const clearAllLeadLists = () => {
    setSelectedLeadLists([])
    setProspects([])
  }

  const selectCampaignGoal = (template: string) => {
    setCampaignGoal(template)
  }

  const saveCustomGoal = () => {
    if (campaignGoal.trim() && goalTitle.trim()) {
      const newGoal = {
        id: Date.now().toString(),
        title: goalTitle.trim(),
        description: goalDescription.trim() || 'Custom campaign goal',
        template: campaignGoal.trim()
      }
      setCustomGoals([...customGoals, newGoal])
      setShowSaveGoal(false)
      setGoalTitle('')
      setGoalDescription('')
    }
  }

  const deleteCustomGoal = (goalId: string) => {
    setCustomGoals(customGoals.filter(goal => goal.id !== goalId))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Campaign Setup</h2>
        <p className="text-muted-foreground">Define your campaign goal and add prospect information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Campaign Goal</CardTitle>
          <CardDescription>
            What are you trying to achieve with this campaign?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <Label htmlFor="user-type" className="text-sm font-medium">I am a:</Label>
            <div className="relative">
              <select
                id="user-type"
                value={userType}
                onChange={(e) => setUserType(e.target.value as 'job-seeker' | 'professional')}
                className="appearance-none bg-background border border-input rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                <option value="job-seeker">Job Seeker</option>
                <option value="professional">Professional</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {CAMPAIGN_GOAL_TEMPLATES[userType].map((template) => (
              <Button
                key={template.id}
                variant="outline"
                size="sm"
                className="justify-start h-auto p-3 text-left"
                onClick={() => selectCampaignGoal(template.template)}
              >
                <div className="flex items-start gap-2 w-full">
                  <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{template.title}</div>
                    <div className="text-xs text-muted-foreground">{template.description}</div>
                  </div>
                </div>
              </Button>
            ))}
            {customGoals.map((goal) => (
              <Button
                key={goal.id}
                variant="outline"
                size="sm"
                className="justify-start h-auto p-3 text-left bg-muted border-border group"
                onClick={() => selectCampaignGoal(goal.template)}
              >
                <div className="flex items-start gap-2 w-full">
                  <Target className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-sm text-foreground">{goal.title}</div>
                    <div className="text-xs text-muted-foreground">{goal.description}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto text-destructive hover:text-destructive/80"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      deleteCustomGoal(goal.id)
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="justify-start h-auto p-3 text-left border-dashed"
              onClick={() => setCampaignGoal('')}
            >
              <div className="flex items-start gap-2 w-full">
                <Target className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Custom Goal</div>
                  <div className="text-xs text-muted-foreground">Write your own personalized campaign goal</div>
                </div>
              </div>
            </Button>
          </div>
          <div className="space-y-3">
            <Textarea
              placeholder="e.g., Apply for software engineering positions at tech startups, network with industry professionals for career advice..."
              className="resize-none"
              rows={3}
              value={campaignGoal}
              onChange={(e) => setCampaignGoal(e.target.value)}
            />
            
            {campaignGoal.trim() && (
              <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Save className="h-4 w-4" />
                  <span>Save this goal for future campaigns?</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSaveGoal(true)}
                >
                  <Save className="h-3 w-3 mr-1" />
                  Save Goal
                </Button>
              </div>
            )}

            {showSaveGoal && (
              <Card className="border-border">
                <CardContent className="p-4 space-y-3">
                  <div>
                    <Label htmlFor="goal-title">Goal Title</Label>
                    <Input
                      id="goal-title"
                      placeholder="e.g., Software Engineer Job Search"
                      value={goalTitle}
                      onChange={(e) => setGoalTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="goal-description">Description (Optional)</Label>
                    <Input
                      id="goal-description"
                      placeholder="e.g., Targeting early-stage startups and tech companies"
                      value={goalDescription}
                      onChange={(e) => setGoalDescription(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveCustomGoal} size="sm" disabled={!goalTitle.trim()}>
                      <Save className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setShowSaveGoal(false)} size="sm">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-semibold mb-2">Add Your Prospects</h3>
        <p className="text-muted-foreground">Choose from pre-built lead lists, upload a CSV file, or manually add prospect information</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {LEAD_LISTS.map((leadList) => (
          <Card 
            key={leadList.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedLeadLists.includes(leadList.id)
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:bg-muted/50'
            }`}
            onClick={() => toggleLeadList(leadList.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">{leadList.name}</CardTitle>
                </div>
                {selectedLeadLists.includes(leadList.id) && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </div>
              <CardDescription className="text-sm">
                {leadList.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-3">
                {leadList.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {leadList.prospects.length} prospects
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedLeadLists.length > 0 && (
        <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span className="font-medium">
              Selected: {selectedLeadLists.length} lead list{selectedLeadLists.length > 1 ? 's' : ''}
            </span>
            <span className="text-sm text-muted-foreground">
              ({prospects.length} prospects loaded)
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={clearAllLeadLists}>
            Clear All
          </Button>
        </div>
      )}

      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="h-px bg-border flex-1"></div>
          <span>or add manually</span>
          <div className="h-px bg-border flex-1"></div>
        </div>
      </div>

      {prospects.length > 0 && (
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="h-px bg-border flex-1"></div>
            <span>edit or add more prospects</span>
            <div className="h-px bg-border flex-1"></div>
          </div>
        </div>
      )}

      {prospects.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <h4 className="text-lg font-semibold">Email Recipients</h4>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">{prospects.length} {prospects.length === 1 ? 'person' : 'people'}</span>
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <UserCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-medium">People who will receive your campaign emails</span>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-2">
              {prospects.map((prospect, index) => (
                <AccordionItem key={prospect.id} value={prospect.id} className="group border-none bg-card rounded-lg shadow-sm overflow-hidden border border-border">
                  <div className="flex items-center w-full">
                    <AccordionTrigger className="hover:no-underline py-4 hover:bg-muted px-4 transition-all duration-200 flex-1 justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                          <UserCircle className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold">
                            {prospect.name || `Prospect #${index + 1}`} 
                            {prospect.company && (
                              <span className="text-muted-foreground font-normal"> - {prospect.company}</span>
                            )}
                          </div>
                          {prospect.role && (
                            <div className="text-sm text-muted-foreground mt-0.5">{prospect.role}</div>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    {prospects.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          removeProspect(prospect.id)
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 hover:bg-muted hover:text-foreground rounded-md mr-2 flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                <AccordionContent>
                  <div className="space-y-4 pt-4 px-4 pb-4 bg-muted/30">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`name-${prospect.id}`}>Full Name</Label>
                        <Input
                          id={`name-${prospect.id}`}
                          placeholder="John Smith"
                          value={prospect.name}
                          onChange={(e) => updateProspect(prospect.id, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`company-${prospect.id}`}>Company</Label>
                        <Input
                          id={`company-${prospect.id}`}
                          placeholder="TechCorp"
                          value={prospect.company}
                          onChange={(e) => updateProspect(prospect.id, 'company', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`role-${prospect.id}`}>Role/Title</Label>
                        <Input
                          id={`role-${prospect.id}`}
                          placeholder="Founder & CEO"
                          value={prospect.role}
                          onChange={(e) => updateProspect(prospect.id, 'role', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`linkedin-${prospect.id}`}>LinkedIn URL</Label>
                        <Input
                          id={`linkedin-${prospect.id}`}
                          placeholder="https://linkedin.com/in/..."
                          value={prospect.linkedinUrl}
                          onChange={(e) => updateProspect(prospect.id, 'linkedinUrl', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`note-${prospect.id}`}>Custom Note (Optional)</Label>
                      <Textarea
                        id={`note-${prospect.id}`}
                        placeholder="Any additional context about this prospect..."
                        className="resize-none"
                        rows={2}
                        value={prospect.customNote}
                        onChange={(e) => updateProspect(prospect.id, 'customNote', e.target.value)}
                      />
                    </div>
                    {prospect.name && prospect.company && (
                      <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
                        <div className="flex items-start gap-2">
                          <Sparkles className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div className="text-sm">
                            <p className="font-medium">AI Preview</p>
                            <p className="text-muted-foreground">
                              {prospect.name} works as {prospect.role} at {prospect.company}. 
                              {prospect.customNote && ` ${prospect.customNote}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Button
            variant="outline"
            onClick={addProspect}
            className="w-full border-dashed mt-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Prospect
          </Button>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-6">
        <Button 
          onClick={onNext} 
          size="lg" 
          disabled={!campaignGoal.trim() || !prospects.some(p => p.name && p.company)}
        >
          Next: Compose Email
        </Button>
      </div>
    </div>
  )
}