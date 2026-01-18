"use client"

import { useState } from "react"
import { Check, X, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type AiActionType = 'rewrite' | 'formalize' | 'reduce' | 'cohesion' | 'fundamentation'

interface AiSuggestionPopupProps {
    isOpen: boolean
    isLoading: boolean
    originalText: string
    suggestedText: string
    actionType: AiActionType
    suggestionId: string | null
    position: { top: number; left: number } | null
    onAccept: () => void
    onReject: () => void
    onRegenerate: () => void
}

const actionLabels: Record<AiActionType, string> = {
    rewrite: 'Reescrever',
    formalize: 'Formalizar',
    reduce: 'Reduzir',
    cohesion: 'Melhorar Coesão',
    fundamentation: 'Criar Fundamentação',
}

export function AiSuggestionPopup({
    isOpen,
    isLoading,
    originalText,
    suggestedText,
    actionType,
    suggestionId,
    position,
    onAccept,
    onReject,
    onRegenerate,
}: AiSuggestionPopupProps) {
    if (!isOpen) return null

    return (
        <div
            className="fixed z-50 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-[500px] max-h-[400px] overflow-hidden"
            style={{
                top: position?.top ?? '50%',
                left: position?.left ?? '50%',
                transform: position ? 'translate(-50%, 8px)' : 'translate(-50%, -50%)',
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">AI</span>
                    </div>
                    <span className="font-medium text-sm">{actionLabels[actionType]}</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={onReject}
                    disabled={isLoading}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 max-h-[280px] overflow-y-auto">
                {/* Original text */}
                <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">
                        Original
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-3 bg-slate-100 dark:bg-slate-800 p-2 rounded">
                        {originalText}
                    </p>
                </div>

                {/* Suggested text */}
                <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">
                        Sugestão
                    </span>
                    <div className="mt-1 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-3 rounded-r min-h-[60px]">
                        {isLoading ? (
                            <div className="space-y-2 animate-pulse">
                                <div className="h-4 bg-emerald-200 dark:bg-emerald-800/50 rounded w-3/4"></div>
                                <div className="h-4 bg-emerald-200 dark:bg-emerald-800/50 rounded w-full"></div>
                                <div className="h-4 bg-emerald-200 dark:bg-emerald-800/50 rounded w-5/6"></div>
                            </div>
                        ) : (
                            <p className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                                {suggestedText || "Gerando sugestão..."}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onRegenerate}
                    disabled={isLoading}
                    className="gap-1.5"
                >
                    <RefreshCw className={cn("h-3.5 w-3.5", isLoading && "animate-spin")} />
                    Regenerar
                </Button>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onReject}
                        disabled={isLoading}
                        className="gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                        <X className="h-3.5 w-3.5" />
                        Recusar
                    </Button>
                    <Button
                        size="sm"
                        onClick={onAccept}
                        disabled={isLoading || !suggestedText}
                        className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                        {isLoading ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Check className="h-3.5 w-3.5" />
                        )}
                        Aceitar
                    </Button>
                </div>
            </div>
        </div>
    )
}
