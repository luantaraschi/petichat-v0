"use client"

import { useState, use, useCallback } from "react"
import { useRouter } from "next/navigation"
import { WizardHeader } from "@/components/wizard/wizard-header"
import { Button } from "@/components/ui/button"
import { StepASummary } from "@/components/wizard/steps/step-a-summary"
import { StepBTheses } from "@/components/wizard/steps/step-b-theses"
import { StepGGeneration } from "@/components/wizard/steps/step-g-generation"
import { toast } from "sonner"

const STEPS = [
    { id: "summary", label: "Dados Iniciais", description: "Alimente a IA" },
    { id: "theses", label: "Teses Jurídicas", description: "Defina a estratégia" },
    { id: "generate", label: "Geração", description: "Criando sua peça" },
]

export default function WizardPage({ params: paramsPromise }: { params: Promise<{ templateId: string }> }) {
    const params = use(paramsPromise)
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0)
    const [isCreating, setIsCreating] = useState(false)
    const [formData, setFormData] = useState({
        summary: "",
        theses: [] as Array<{ id: string; title: string; content: string }>,
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

    // Create piece in database and navigate to editor
    const handleGenerationComplete = useCallback(async () => {
        if (isCreating) return
        setIsCreating(true)

        try {
            console.log('[Wizard] Creating piece with templateId:', params.templateId)
            console.log('[Wizard] Form data:', formData)

            // Create the piece in the database
            const response = await fetch('/api/pieces', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    templateId: params.templateId,
                    title: null, // Will use template title
                    inputsJson: { summary: formData.summary },
                    thesesJson: formData.theses,
                }),
            })

            console.log('[Wizard] Response status:', response.status, response.statusText)

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
                console.error('[Wizard] API error response:', errorData)
                throw new Error(errorData.error || `Failed to create piece (${response.status})`)
            }

            const piece = await response.json()
            console.log('[Wizard] Piece created successfully:', piece.id)

            // Navigate to editor with the REAL piece ID
            router.push(`/editor/${piece.id}`)
        } catch (error) {
            console.error('[Wizard] Error creating piece:', error)
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
            toast.error(`Erro ao criar documento: ${errorMessage}`)
            setIsCreating(false)
        }
    }, [params.templateId, formData, router, isCreating])

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

                    {currentStep === 2 && <StepGGeneration onComplete={handleGenerationComplete} />}

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
