"use client"

import { useState } from "react"
import { X, Send, RotateCcw, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface AiAssistantModalProps {
    isOpen: boolean
    onClose: () => void
    selectedText: string
    onInsert: (text: string) => void
}

export function AiAssistantModal({ isOpen, onClose, selectedText, onInsert }: AiAssistantModalProps) {
    const [prompt, setPrompt] = useState("")
    const [response, setResponse] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showResponse, setShowResponse] = useState(false)

    const maxChars = 1500

    const handleSubmit = async () => {
        if (!prompt.trim()) return

        setIsLoading(true)
        try {
            const res = await fetch('/api/ai/wizard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: selectedText,
                    action: 'custom',
                    customPrompt: prompt
                })
            })

            if (!res.ok) throw new Error('Failed to process')
            if (!res.body) return

            // Show response area immediately for streaming/skeleton
            setShowResponse(true)

            const reader = res.body.getReader()
            let newValue = ""

            while (true) {
                const { done, value: chunk } = await reader.read()
                if (done) break
                const chunkText = new TextDecoder().decode(chunk)
                newValue += chunkText
                setResponse(newValue)
            }
        } catch (error) {
            console.error("AI Error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleReset = () => {
        setResponse("")
        setShowResponse(false)
    }

    const handleInsert = () => {
        onInsert(response)
        handleClose()
    }

    const handleClose = () => {
        setPrompt("")
        setResponse("")
        setShowResponse(false)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

            {/* Modal */}
            <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-purple-600 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">AI</span>
                        </div>
                        <span className="font-semibold">Assistente de IA</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Content */}
                <div className="p-4">
                    {!showResponse ? (
                        <>
                            {/* Input Area */}
                            <div className="relative">
                                <Textarea
                                    placeholder="deixe mais profissional"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value.slice(0, maxChars))}
                                    className="min-h-[120px] resize-none pr-16"
                                    disabled={isLoading}
                                />
                                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">
                                        {prompt.length}/{maxChars}
                                    </span>
                                    <Button
                                        size="icon"
                                        className="h-8 w-8 bg-green-500 hover:bg-green-600"
                                        onClick={handleSubmit}
                                        disabled={isLoading || !prompt.trim()}
                                    >
                                        {isLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Send className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Response Area */}
                            <div className="border-l-4 border-purple-500 pl-4 py-2 bg-muted/30 rounded-r-lg min-h-[100px]">
                                {response ? (
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap animate-in fade-in duration-300">
                                        {response}
                                    </p>
                                ) : (
                                    <div className="space-y-2 animate-pulse">
                                        <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
                                        <div className="h-4 bg-slate-700/50 rounded w-full"></div>
                                        <div className="h-4 bg-slate-700/50 rounded w-5/6"></div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                <Button variant="outline" onClick={handleReset}>
                                    Voltar
                                </Button>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        Deseja inserir o texto gerado pela IA?
                                    </span>
                                    <Button variant="outline" onClick={handleReset} className="gap-1">
                                        <RotateCcw className="h-3 w-3" />
                                        Refazer
                                    </Button>
                                    <Button onClick={handleInsert} className="gap-1 bg-green-500 hover:bg-green-600">
                                        <FileText className="h-3 w-3" />
                                        Inserir
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
