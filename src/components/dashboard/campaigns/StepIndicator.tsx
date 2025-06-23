"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isCurrent = stepNumber === currentStep
        const isUpcoming = stepNumber > currentStep

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                  isCompleted && "bg-primary border-primary text-primary-foreground",
                  isCurrent && "border-primary text-primary bg-primary/10",
                  isUpcoming && "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-2 text-center max-w-[80px]",
                  isCurrent ? "text-primary font-medium" : "text-muted-foreground"
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4 transition-colors",
                  isCompleted ? "bg-primary" : "bg-muted-foreground/30"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}