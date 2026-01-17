"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Loader2, FileText, Terminal } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"

interface StepGGenerationProps {
    onComplete: () => void
}

const LOGS = [
    "Inicializando motor jurídico...",
    "Analisando fatos narrados...",
    "Selecionando jurisprudência atualizada...",
    "Estruturando argumentos...",
    "Redigindo fatos...",
    "Escrevendo fundamentação jurídica...",
    "Formulando pedidos...",
    "Revisando coesão e coerência...",
    "Finalizando documento..."
]

export function StepGGeneration({ onComplete }: StepGGenerationProps) {
    const [progress, setProgress] = useState(0)
    const [currentLog, setCurrentLog] = useState(0)

    useEffect(() => {
        const totalTime = 5000 // 5 seconds simulation
        const intervalTime = 100
        const steps = totalTime / intervalTime

        let currentStep = 0

        const interval = setInterval(() => {
            currentStep++
            const newProgress = Math.min((currentStep / steps) * 100, 100)
            setProgress(newProgress)

            // Update logs based on progress chunks
            const logIndex = Math.floor((newProgress / 100) * LOGS.length)
            if (logIndex < LOGS.length) {
                setCurrentLog(logIndex)
            }

            if (currentStep >= steps) {
                clearInterval(interval)
                setTimeout(onComplete, 500)
            }
        }, intervalTime)

        return () => clearInterval(interval)
    }, [onComplete])

    return (
        <div className="flex flex-col items-center justify-center space-y-8 py-12 animate-in fade-in zoom-in duration-500">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                    <FileText className="h-12 w-12 text-primary relative z-10" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Gerando sua Peça</h2>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    A IA está trabalhando no seu caso. Isso leva apenas alguns segundos.
                </p>
            </div>

            <div className="w-full max-w-md space-y-2">
                <div className="flex justify-between text-sm font-medium">
                    <span>Progresso</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <Card className="w-full max-w-md bg-zinc-950 text-zinc-400 font-mono text-sm p-4 h-[200px] overflow-hidden relative border-zinc-800">
                <div className="absolute top-2 right-2 opacity-50">
                    <Terminal className="h-4 w-4" />
                </div>
                <div className="flex flex-col justify-end h-full space-y-1">
                    {LOGS.slice(0, currentLog + 1).map((log, i) => (
                        <div key={i} className="flex items-center gap-2 animate-in slide-in-from-left-2 fade-in">
                            {i === currentLog ? (
                                <Loader2 className="h-3 w-3 animate-spin text-primary" />
                            ) : (
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                            )}
                            <span className={i === currentLog ? "text-primary-foreground" : ""}>{log}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
