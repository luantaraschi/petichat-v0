"use client"

import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface Heading {
    id: string
    text: string
    level: number
}

interface DocumentSidebarProps {
    headings: Heading[]
    title: string
    activeHeadingId: string | null
    onHeadingClick: (id: string) => void
    className?: string
}

export function DocumentSidebar({ headings, title, activeHeadingId, onHeadingClick, className }: DocumentSidebarProps) {
    return (
        <aside className={cn("w-64 bg-slate-50 dark:bg-slate-950 h-full flex flex-col shrink-0 border-r border-slate-200 dark:border-slate-800/50", className)}>
            <div className="px-5 py-4">
                <h2 className="font-medium text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Sumário
                </h2>
            </div>

            <ScrollArea className="flex-1">
                <div className="py-1 px-3">
                    {headings.length > 0 ? (
                        headings.map((h) => {
                            const isActive = h.id === activeHeadingId
                            return (
                                <button
                                    key={h.id}
                                    onClick={() => onHeadingClick(h.id)}
                                    className={cn(
                                        "w-full text-left text-sm py-2 px-3 rounded transition-colors duration-150 mb-1",
                                        "leading-snug",
                                        // Default state
                                        !isActive && "text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/40",
                                        // Active state - solid dark background
                                        isActive && "bg-slate-800 dark:bg-slate-800 text-white font-medium",
                                        // Hierarchy indentation for sub-headings
                                        h.level > 1 && "ml-3 text-[13px]",
                                        h.level > 2 && "ml-6 text-xs"
                                    )}
                                >
                                    {h.text || "(Sem título)"}
                                </button>
                            )
                        })
                    ) : (
                        <div className="text-xs text-slate-400 dark:text-slate-600 p-4 text-center">
                            Estrutura do documento
                        </div>
                    )}
                </div>
            </ScrollArea>
        </aside>
    )
}
