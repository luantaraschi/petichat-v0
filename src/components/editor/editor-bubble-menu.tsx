"use client"

import { Editor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import {
    Bold, Italic, Underline as UnderlineIcon,
    ChevronDown, Wand2, AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AiActionType } from './ai-suggestion-popup'

interface EditorBubbleMenuProps {
    editor: Editor
    onRequestAiSuggestion: (actionType: AiActionType) => void
    onOpenAiModal: () => void
}

export function EditorBubbleMenu({
    editor,
    onRequestAiSuggestion,
    onOpenAiModal,
}: EditorBubbleMenuProps) {
    return (
        <BubbleMenu editor={editor} className="flex items-center gap-0.5 overflow-hidden rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl p-1">
            <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 ${editor.isActive('bold') ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' : ''}`}
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold className="h-3.5 w-3.5" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 ${editor.isActive('italic') ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' : ''}`}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className="h-3.5 w-3.5" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 ${editor.isActive('underline') ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' : ''}`}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
                <UnderlineIcon className="h-3.5 w-3.5" />
            </Button>

            <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

            {/* Alignment buttons */}
            <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 ${editor.isActive({ textAlign: 'left' }) ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
            >
                <AlignLeft className="h-3.5 w-3.5" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 ${editor.isActive({ textAlign: 'center' }) ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
            >
                <AlignCenter className="h-3.5 w-3.5" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 ${editor.isActive({ textAlign: 'right' }) ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
            >
                <AlignRight className="h-3.5 w-3.5" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-slate-200 dark:bg-slate-700' : ''}`}
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            >
                <AlignJustify className="h-3.5 w-3.5" />
            </Button>

            <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

            {/* AI Actions Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="sm"
                        className="h-7 px-2 text-[10px] bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0 gap-1"
                    >
                        <Sparkles className="h-3 w-3" />
                        IA
                        <ChevronDown className="h-3 w-3" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => onRequestAiSuggestion('rewrite')}>
                        <Wand2 className="h-4 w-4 mr-2" /> Reescrever
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onRequestAiSuggestion('formalize')}>
                        <Wand2 className="h-4 w-4 mr-2" /> Formalizar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onRequestAiSuggestion('reduce')}>
                        <Wand2 className="h-4 w-4 mr-2" /> Reduzir
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onRequestAiSuggestion('cohesion')}>
                        <Wand2 className="h-4 w-4 mr-2" /> Melhorar Coesão
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onRequestAiSuggestion('fundamentation')}>
                        <Wand2 className="h-4 w-4 mr-2" /> Criar Fundamentação
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onOpenAiModal}>
                        <Wand2 className="h-4 w-4 mr-2" /> Prompt Personalizado...
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </BubbleMenu>
    )
}
