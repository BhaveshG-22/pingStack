"use client"

import { cn } from "@/lib/utils"
import { Check, Users, Mail, Copy, Rocket } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

const stepIcons = {
  Prospects: Users,
  Compose: Mail,
  Variants: Copy,
  Launch: Rocket,
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b mb-6 -mx-4">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {steps.map((step, index) => {
              const stepNumber = index + 1
              const isCompleted = stepNumber < currentStep
              const isCurrent = stepNumber === currentStep
              const IconComponent = stepIcons[step as keyof typeof stepIcons]

              return (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200",
                      isCompleted && "w-6 h-6 bg-primary text-primary-foreground",
                      isCurrent && "w-8 h-8 bg-primary text-primary-foreground ring-2 ring-primary/20 shadow-sm",
                      !isCompleted && !isCurrent && "w-6 h-6 bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-3 w-3" />
                    ) : IconComponent ? (
                      <IconComponent className={cn("h-3 w-3", isCurrent && "h-4 w-4")} />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span 
                    className={cn(
                      "text-sm transition-colors",
                      isCurrent ? "text-primary font-semibold" : "text-muted-foreground",
                      isCompleted && "text-primary/70"
                    )}
                  >
                    {step}
                  </span>
                  {index < steps.length - 1 && (
                    <span className={cn("text-muted-foreground/40 mx-1", isCurrent && "text-primary/40")}>
                      →
                    </span>
                  )}
                </div>
              )
            })}
          </div>
          <div className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
            Step {currentStep} of {steps.length}
          </div>
        </div>
      </div>
    </div>
  )
}