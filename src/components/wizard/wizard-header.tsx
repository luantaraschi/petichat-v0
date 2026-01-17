"use client"

import { Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface WizardHeaderProps {
    currentStep: number
    totalSteps: number
    title: string
    category: string
    steps: { id: string; label: string; description?: string }[]
}

export function WizardHeader({ currentStep, totalSteps, title, category, steps }: WizardHeaderProps) {
    const currentStepData = steps[currentStep]

    return (
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 sticky top-0">
            <div className="container flex h-[60px] items-center justify-between px-8 md:px-10">
                <div className="flex flex-col">
                    <h1 className="text-lg font-semibold leading-none">{title}</h1>
                    <span className="text-xs text-muted-foreground mt-1">{category}</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end mr-4">
                        <span className="text-sm font-medium">{currentStepData.label}</span>
                        <span className="text-xs text-muted-foreground">{currentStepData.description}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        {steps.map((step, index) => {
                            const isActive = index === currentStep
                            const isCompleted = index < currentStep

                            return (
                                <div key={step.id} className="flex items-center">
                                    <div
                                        className={cn(
                                            "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all",
                                            isActive && "border-primary bg-primary text-primary-foreground",
                                            isCompleted && "border-primary bg-primary text-primary-foreground",
                                            !isActive && !isCompleted && "border-muted-foreground/30 text-muted-foreground"
                                        )}
                                    >
                                        {isCompleted ? <Check className="h-4 w-4" /> : <span className="text-xs">{index + 1}</span>}
                                    </div>
                                    {index !== steps.length - 1 && (
                                        <div className={cn("h-[2px] w-8 mx-1", isCompleted ? "bg-primary" : "bg-muted")} />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
