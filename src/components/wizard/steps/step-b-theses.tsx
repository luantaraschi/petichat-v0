"use client"

import { useState, useEffect } from "react"
import { Sparkles, Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface StepBThesesProps {
    onNext: () => void
    onPrev: () => void
}

const MOCK_THESES = [
    {
        id: "t1",
        title: "Responsabilidade Civil Objetiva",
        description: "O ente público responde pelos danos que seus agentes, nessa qualidade, causarem a terceiros, assegurado o direito de regresso.",
        category: "Mérito"
    },
    {
        id: "t2",
        title: "Dano Moral In Re Ipsa",
        description: "O dano moral decorre do próprio fato ofensivo, de modo que, provada a ofensa, ipso facto está demonstrado o dano moral.",
        category: "Dano"
    },
    {
        id: "t3",
        title: "Nexo de Causalidade",
        description: "Demonstração inequívoca de que a conduta do agente foi determinante para o resultado danoso experimentado pela vítima.",
        category: "Mérito"
    }
]

export function StepBTheses({ onNext, onPrev }: StepBThesesProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [theses, setTheses] = useState<typeof MOCK_THESES>([])
    const [selected, setSelected] = useState<string[]>([])
    const [customThesis, setCustomThesis] = useState("")

    useEffect(() => {
        // Simulate API call to AI
        const timer = setTimeout(() => {
            setTheses(MOCK_THESES)
            setIsLoading(false)
            toast.success("Teses sugeridas com base no seu relato.")
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    const toggleThesis = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        )
    }

    const handleAddCustom = () => {
        if (!customThesis) return
        const newId = `custom-${Date.now()}`
        setTheses([...theses, {
            id: newId,
            title: customThesis,
            description: "Tese adicionada manualmente.",
            category: "Manual"
        }])
        setSelected(prev => [...prev, newId])
        setCustomThesis("")
        toast.success("Tese manual adicionada")
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Teses Preliminares e de Mérito</h2>
                <p className="text-muted-foreground">
                    Nossa IA analisou os fatos e sugere as seguintes teses. Selecione as que deseja utilizar ou adicione novas.
                </p>
            </div>

            <div className="grid gap-4">
                {isLoading ? (
                    <>
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </>
                ) : (
                    theses.map((thesis) => (
                        <Card key={thesis.id} className={`cursor-pointer transition-all border-l-4 ${selected.includes(thesis.id) ? 'border-l-primary bg-primary/5 border-primary' : 'border-l-transparent'}`} onClick={() => toggleThesis(thesis.id)}>
                            <CardHeader className="p-4 pb-2 flex flex-row items-center space-y-0 gap-3">
                                <Checkbox checked={selected.includes(thesis.id)} onCheckedChange={() => toggleThesis(thesis.id)} />
                                <div className="flex-1">
                                    <CardTitle className="text-base flex items-center justify-between">
                                        {thesis.title}
                                        <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{thesis.category}</span>
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 pl-11">
                                <CardDescription>{thesis.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <div className="flex gap-2">
                <Input
                    placeholder="Adicionar tese manualmente..."
                    value={customThesis}
                    onChange={(e) => setCustomThesis(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
                />
                <Button variant="outline" onClick={handleAddCustom} disabled={!customThesis}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            {!isLoading && (
                <div className="bg-blue-500/10 text-blue-600 p-4 rounded-md text-sm flex items-center gap-3">
                    <Sparkles className="h-5 w-5" />
                    <span>Dica: Você poderá refinar os argumentos de cada tese na próxima etapa ou diretamente no editor.</span>
                </div>
            )}

            {/* Buttons controlled by parent, but here for standalone layout check if needed */}
        </div>
    )
}
