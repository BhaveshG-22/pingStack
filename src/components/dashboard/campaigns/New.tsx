"use client"

import { useState } from 'react'
import { StepIndicator } from "./StepIndicator"
import { ProspectInput } from "./ProspectInput"
import { EmailComposer } from "./EmailComposer"
import { VariantGenerator } from "./VariantGenerator"
import { ReviewLaunch } from "./ReviewLaunch"

const STEPS = [
  'Prospects',
  'Compose',
  'Variants',
  'Launch'
]

const NewCampaign = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    // Navigate back to campaigns overview or dashboard
    setCurrentStep(1)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ProspectInput onNext={nextStep} />
      case 2:
        return <EmailComposer onNext={nextStep} onBack={prevStep} />
      case 3:
        return <VariantGenerator onNext={nextStep} onBack={prevStep} />
      case 4:
        return <ReviewLaunch onBack={prevStep} onComplete={handleComplete} />
      default:
        return <ProspectInput onNext={nextStep} />
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="max-w-6xl mx-auto w-full">
        <StepIndicator 
          currentStep={currentStep} 
          totalSteps={STEPS.length} 
          steps={STEPS}
        />
        
        <div className="mt-8">
          {renderStep()}
        </div>
      </div>
    </div>
  )
}

export default NewCampaign