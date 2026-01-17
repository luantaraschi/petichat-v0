"use client"

import { useState, useEffect, useRef } from "react"
import { Wand2, SpellCheck, FileText, Maximize2, Copy, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

interface StepASummaryProps {
    value: string
    onChange: (value: string) => void
    onNext: () => void
}

export function StepASummary({ value, onChange, onNext }: StepASummaryProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [lastValue, setLastValue] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Auto-resize textarea when value changes (including from AI streaming)
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
        }
    }, [value])

    const handleAiAction = async (action: string) => {
        if (!value) return;

        setIsLoading(true);
        setLastValue(value);

        try {
            const response = await fetch('/api/ai/wizard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: value, action })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("API Error Response:", errorText);
                throw new Error(`Falha na requisição: ${errorText}`);
            }
            if (!response.body) return;

            const reader = response.body.getReader();
            let newValue = "";
            let isFirstChunk = true;

            while (true) {
                const { done, value: chunk } = await reader.read();
                if (done) break;

                const chunkText = new TextDecoder().decode(chunk);
                newValue += chunkText;

                // Only clear the previous text when we actually have new content to show
                if (isFirstChunk) {
                    isFirstChunk = false;
                    // Optional: could keep context or just replace.
                }
                onChange(newValue);
            }

            if (newValue.length === 0) {
                throw new Error("Nenhum texto gerado");
            }

            toast.success("Texto processado com sucesso!");
        } catch (error) {
            console.error("AI Action Error:", error);
            toast.error("Erro ao processar texto com IA");
            onChange(lastValue); // Revert to original text on error
        } finally {
            setIsLoading(false);
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(value)
        toast.success("Copiado para a área de transferência")
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
            <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-muted-foreground uppercase text-xs font-semibold tracking-wider">Resumo Inicial</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Para começar, poderia nos contar detalhes sobre o caso? <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-yellow-200 ml-2 hover:bg-yellow-500/20">Obrigatório</Badge></h2>

            </div>

            <Card className="border shadow-sm border-border dark:border-0 dark:shadow-none bg-card dark:bg-[#1A1A2E] rounded-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 flex-1 flex flex-col">
                <CardContent className="p-0 flex-1 flex flex-col h-full">
                    <div className="px-6 pb-6 pt-4 flex-1">
                        <Textarea
                            ref={textareaRef}
                            placeholder={isLoading ? "Gerando..." : "Descreva o caso com suas palavras. Nossa IA irá estruturar juridicamente, mas precisamos dos detalhes fáticos..."}
                            className={`min-h-[120px] text-lg leading-relaxed border-0 focus-visible:ring-0 resize-none p-0 bg-transparent placeholder:text-muted-foreground/30 text-foreground dark:text-gray-200 ${isLoading ? 'opacity-50' : ''}`}
                            value={isLoading && value === '' ? '' : value}
                            onChange={(e) => onChange(e.target.value)}
                            disabled={isLoading}
                            style={{ minHeight: '120px', overflow: 'hidden' }}
                        />
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between border-t border-border dark:border-white/5 bg-muted/20 dark:bg-transparent">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {isLoading ? (
                                <div className="flex items-center gap-2 text-primary">
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                    <span>IA processando seu texto...</span>
                                </div>
                            ) : (
                                <span>{5000 - value.length} Caracteres Restantes - Mínimo 100 caracteres</span>
                            )}
                        </div>

                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5" onClick={() => handleAiAction("improve")} disabled={isLoading || !value}>
                                <Wand2 className="h-3 w-3" /> Melhorar
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5" onClick={() => handleAiAction("fix")} disabled={isLoading || !value}>
                                <SpellCheck className="h-3 w-3" /> Corrigir
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5" onClick={() => handleAiAction("summarize")} disabled={isLoading || !value}>
                                <FileText className="h-3 w-3" /> Resumir
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5" onClick={() => handleAiAction("expand")} disabled={isLoading || !value}>
                                <Maximize2 className="h-3 w-3" /> Expandir
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5" onClick={handleCopy}>
                                <Copy className="h-3 w-3" /> Copiar
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end pt-6">
                <Button
                    onClick={onNext}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 h-12 text-base shadow-lg shadow-green-900/20"
                    disabled={value.length < 10}
                >
                    Próximo <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}
