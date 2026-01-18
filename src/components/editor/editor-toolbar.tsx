"use client"

import { Editor } from '@tiptap/react'
import {
    Bold, Italic, Underline as UnderlineIcon,
    ChevronLeft, ChevronDown, Undo2, Redo2,
    Minus, Plus, MoreHorizontal, Download, Share2, Copy,
    Type, Wand2, AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Pencil
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import Link from 'next/link'

const FONTS = [
    'Arial',
    'Times New Roman',
    'Calibri',
    'Courier New',
    'Garamond',
    'Georgia',
    'Book Antiqua',
    'Cambria',
    'Lucida Console'
]

interface EditorToolbarProps {
    editor: Editor
    title: string
    currentFont: string
    selectionFontSize: number
    onFontChange: (font: string) => void
    onFontSizeChange: (size: number) => void
    onOpenAiModal: () => void
    onExport: () => void
    onEditTitle: () => void
}

export function EditorToolbar({
    editor,
    title,
    currentFont,
    selectionFontSize,
    onFontChange,
    onFontSizeChange,
    onOpenAiModal,
    onExport,
    onEditTitle,
}: EditorToolbarProps) {
    const handleFontSizeDecrease = () => {
        if (editor.state.selection.empty) {
            toast.info("Selecione um texto primeiro")
            return
        }
        const newSize = Math.max(8, selectionFontSize - 1)
        editor.chain().focus().setFontSize(`${newSize}px`).run()
        onFontSizeChange(newSize)
    }

    const handleFontSizeIncrease = () => {
        if (editor.state.selection.empty) {
            toast.info("Selecione um texto primeiro")
            return
        }
        const newSize = Math.min(72, selectionFontSize + 1)
        editor.chain().focus().setFontSize(`${newSize}px`).run()
        onFontSizeChange(newSize)
    }

    const handleFontSelect = (font: string) => {
        if (editor.state.selection.empty) {
            toast.info("Selecione um texto primeiro")
            return
        }
        editor.chain().focus().setFontFamily(font).run()
        onFontChange(font)
    }

    const handleCopyText = () => {
        const text = editor.state.doc.textBetween(0, editor.state.doc.content.size)
        navigator.clipboard.writeText(text)
        toast.success("Copiado!")
    }

    return (
        <header className="flex items-center border-b border-slate-200 dark:border-slate-800 h-14 bg-white dark:bg-slate-950 z-10 shadow-sm shrink-0 print:hidden">
            {/* Left section: fixed width matching sidebar */}
            <div className="hidden lg:flex items-center gap-2 w-64 shrink-0 px-4 border-r border-slate-200 dark:border-slate-800/50">
                <Link href="/dashboard">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>

                <button
                    onClick={onEditTitle}
                    className="flex items-center gap-1.5 text-sm font-medium truncate max-w-[180px] hover:bg-slate-100 dark:hover:bg-slate-800 px-2 py-1 rounded transition-colors group"
                >
                    {title}
                    <Pencil className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity shrink-0" />
                </button>
            </div>

            {/* Mobile: Back button only */}
            <div className="lg:hidden flex items-center gap-2 px-2">
                <Link href="/dashboard">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <span className="text-sm font-medium truncate max-w-[150px]">{title}</span>
            </div>

            {/* Center section: Formatting Tools */}
            <div className="flex-1 flex items-center justify-center gap-4 px-4">
                {/* AI + Wand */}
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        className="h-7 px-3 text-[10px] font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 border-0"
                        onClick={onOpenAiModal}
                    >
                        AI
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                        <Wand2 className="h-4 w-4" />
                    </Button>
                </div>

                {/* Formatting toolbar */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-transparent p-1 rounded-md border border-slate-200 dark:border-slate-700">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                    >
                        <Undo2 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                    >
                        <Redo2 className="h-4 w-4" />
                    </Button>

                    <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

                    {/* Font Family Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs px-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 min-w-[100px]">
                                <Type className="h-3 w-3" />
                                <span className="truncate max-w-[70px]">{currentFont}</span>
                                <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48 max-h-64 overflow-y-auto">
                            {FONTS.map((font) => (
                                <DropdownMenuItem
                                    key={font}
                                    onClick={() => handleFontSelect(font)}
                                    className="flex items-center justify-between"
                                    style={{ fontFamily: font }}
                                >
                                    {font}
                                    {currentFont === font && <span className="text-emerald-500">✓</span>}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

                    {/* Font Size Controls */}
                    <Button
                        className="h-7 w-7 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700"
                        variant="ghost"
                        size="icon"
                        onClick={handleFontSizeDecrease}
                    >
                        <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-xs w-8 text-center tabular-nums text-slate-700 dark:text-slate-300">{selectionFontSize}</span>
                    <Button
                        className="h-7 w-7 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700"
                        variant="ghost"
                        size="icon"
                        onClick={handleFontSizeIncrease}
                    >
                        <Plus className="h-3 w-3" />
                    </Button>

                    <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

                    {/* More options dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => editor.chain().focus().toggleBold().run()}>
                                <Bold className="h-4 w-4 mr-2" /> Negrito
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editor.chain().focus().toggleItalic().run()}>
                                <Italic className="h-4 w-4 mr-2" /> Itálico
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editor.chain().focus().toggleUnderline().run()}>
                                <UnderlineIcon className="h-4 w-4 mr-2" /> Sublinhado
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                                <AlignLeft className="h-4 w-4 mr-2" /> Alinhar à esquerda
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                                <AlignCenter className="h-4 w-4 mr-2" /> Centralizar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                                <AlignRight className="h-4 w-4 mr-2" /> Alinhar à direita
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign('justify').run()}>
                                <AlignJustify className="h-4 w-4 mr-2" /> Justificar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Right section: Export/Actions */}
            <div className="flex items-center gap-1 px-4">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800" onClick={onExport}>
                    <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800" onClick={handleCopyText}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
        </header>
    )
}
