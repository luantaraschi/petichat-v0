"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { WizardHeader } from "@/components/wizard/wizard-header"
import { Button } from "@/components/ui/button"
import { StepASummary } from "@/components/wizard/steps/step-a-summary"
import { StepBTheses } from "@/components/wizard/steps/step-b-theses"
import { StepGGeneration } from "@/components/wizard/steps/step-g-generation"

const STEPS = [
    { id: "summary", label: "Dados Iniciais", description: "Alimente a IA" },
    { id: "theses", label: "Teses Jurídicas", description: "Defina a estratégia" },
    { id: "generate", label: "Geração", description: "Criando sua peça" },
]

export default function WizardPage({ params: paramsPromise }: { params: Promise<{ templateId: string }> }) {
    const params = use(paramsPromise)
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        summary: "",
        // ... other fields
    })

    // Mock template data based on ID
    const templateTitle = "Abertura de Processo Administrativo"
    const templateCategory = "Administrativo"

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-dot-pattern">
            <WizardHeader
                currentStep={currentStep}
                totalSteps={STEPS.length}
                title={templateTitle}
                category={templateCategory}
                steps={STEPS}
            />

            <main className="flex-1 container max-w-4xl pt-8 pb-4 px-8 md:px-10 flex flex-col h-[calc(100vh-60px)]">
                <div className="flex-1 flex flex-col">
                    {currentStep === 0 && (
                        <StepASummary
                            value={formData.summary}
                            onChange={(val) => setFormData({ ...formData, summary: val })}
                            onNext={nextStep}
                        />
                    )}

                    {currentStep === 1 && <StepBTheses onNext={nextStep} onPrev={prevStep} />}

                    {currentStep === 2 && <StepGGeneration onComplete={() => router.push(`/editor/${params.templateId}-${Date.now()}`)} />}

                    {currentStep > 0 && currentStep < STEPS.length - 1 && (
                        <div className="flex justify-between mt-6">
                            <Button variant="outline" onClick={prevStep}>Voltar</Button>
                            <Button onClick={nextStep} className="bg-primary text-white hover:bg-primary/90">Próximo</Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
