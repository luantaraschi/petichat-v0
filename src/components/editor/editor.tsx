"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import { FontSize } from './extensions/font-size'
import { TextSelection } from '@tiptap/pm/state'
import { useState, useEffect, useRef, useCallback } from 'react'
import {
    Bold, Italic, Underline as UnderlineIcon,
    ChevronLeft, ChevronDown, Undo2, Redo2,
    Minus, Plus, MoreHorizontal, Download, Share2, Copy,
    Image, Type, Wand2, AlignLeft, AlignCenter, AlignRight, AlignJustify,
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import Link from 'next/link'
import { AiAssistantModal } from './ai-assistant-modal'
import { DocumentSidebar } from './document-sidebar'
import { HeaderFooterModal, HeaderFooterConfig } from './header-footer-modal'

interface EditorProps {
    initialContent: string
    documentTitle?: string
    onTitleChange?: (newTitle: string) => void
}

// Helper to extract headings from editor
const extractHeadings = (editor: ReturnType<typeof useEditor>) => {
    if (!editor) return []
    const newHeadings: { id: string, text: string, level: number }[] = []
    let index = 0

    editor.state.doc.descendants((node) => {
        if (node.type.name === 'heading') {
            newHeadings.push({
                id: `heading-${index}`,
                text: node.textContent,
                level: node.attrs.level
            })
            index++
        }
    })
    return newHeadings
}

export function Editor({ initialContent, documentTitle = "Documento", onTitleChange }: EditorProps) {
    const [headings, setHeadings] = useState<{ id: string, text: string, level: number }[]>([])
    const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null)
    const [title, setTitle] = useState(documentTitle)
    const [fontSize, setFontSize] = useState(14)
    const [showAiModal, setShowAiModal] = useState(false)
    const [selectedText, setSelectedText] = useState("")
    const [showTitleDialog, setShowTitleDialog] = useState(false)
    const [editingTitle, setEditingTitle] = useState(documentTitle)
    const [showHeaderFooterModal, setShowHeaderFooterModal] = useState(false)
    const [headerFooterInitialType, setHeaderFooterInitialType] = useState<'image' | 'text'>('text')
    const [headerFooterConfig, setHeaderFooterConfig] = useState<HeaderFooterConfig | null>(null)
    const [currentFont, setCurrentFont] = useState('Arial')
    const [selectionFontSize, setSelectionFontSize] = useState(14)
    const editorScrollRef = useRef<HTMLDivElement>(null)

    // Available fonts
    const fonts = [
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

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            TextStyle,
            FontFamily,
            FontSize,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: 'Comece a escrever sua peça jurídica...',
            }),
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: 'editor-content prose prose-sm sm:prose-base dark:prose-invert focus:outline-none max-w-none w-full min-h-[500px] text-slate-800 dark:text-slate-200 selection:bg-emerald-200 dark:selection:bg-purple-500/30 print:text-black',
                style: `min-height: 100%;`
            },
            handleClick: (view, pos, event) => {
                // Click on paragraph to select all text in that paragraph
                const target = event.target as HTMLElement
                if (target.tagName === 'P') {
                    const $pos = view.state.doc.resolve(pos)
                    const start = $pos.start($pos.depth)
                    const end = $pos.end($pos.depth)

                    // Select the entire paragraph
                    const selection = TextSelection.create(view.state.doc, start, end)
                    view.dispatch(view.state.tr.setSelection(selection))
                    return true
                }
                return false
            },
        },
        onCreate: ({ editor }) => {
            setHeadings(extractHeadings(editor))
        },
        onUpdate: ({ editor }) => {
            setHeadings(extractHeadings(editor))
        }
    })

    // Track active heading with IntersectionObserver
    useEffect(() => {
        if (!editor) return

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = entry.target.getAttribute('data-heading-index')
                    if (idx !== null) {
                        setActiveHeadingId(`heading-${idx}`)
                    }
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, {
            root: editorScrollRef.current,
            rootMargin: '-10% 0px -70% 0px',
            threshold: 0
        })

        const timeout = setTimeout(() => {
            const domHeadings = editor.view.dom.querySelectorAll('h1, h2, h3, h4, h5, h6')
            domHeadings.forEach((el, idx) => {
                el.setAttribute('data-heading-index', String(idx))
                observer.observe(el)
            })
        }, 100)

        return () => {
            clearTimeout(timeout)
            observer.disconnect()
        }
    }, [editor, headings])

    const handleScrollToHeading = useCallback((id: string) => {
        if (!editor) return
        const index = parseInt(id.split('-')[1])
        if (isNaN(index)) return

        const domHeadings = editor.view.dom.querySelectorAll('h1, h2, h3, h4, h5, h6')
        const target = domHeadings[index]

        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [editor])

    const handleOpenAiModal = () => {
        if (!editor) return
        const selection = editor.state.selection
        if (selection.empty) {
            toast.error("Selecione um texto para usar a IA")
            return
        }
        const text = editor.state.doc.textBetween(selection.from, selection.to)
        setSelectedText(text)
        setShowAiModal(true)
    }

    const handleInsertAiText = (text: string) => {
        if (!editor) return
        editor.chain().focus().insertContent(text).run()
        toast.success("Texto inserido!")
    }

    const handleExport = async () => {
        if (!editor) return
        const html = editor.getHTML()
        const { asBlob } = await import('html-docx-js-typescript')
        const { saveAs } = await import('file-saver')
        const blob = await asBlob(html)
        saveAs(blob as Blob, `${title.replace(/\s+/g, '-')}.docx`)
        toast.success("Download iniciado!")
    }

    const handleSaveTitle = () => {
        if (editingTitle.trim()) {
            setTitle(editingTitle.trim())
            onTitleChange?.(editingTitle.trim())
            setShowTitleDialog(false)
            toast.success("Título atualizado!")
        }
    }

    if (!editor) {
        return null
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200">
            {/* Top Toolbar - Full Width */}
            <header className="flex items-center border-b border-slate-200 dark:border-slate-800 h-14 bg-white dark:bg-slate-950 z-10 shadow-sm shrink-0 print:hidden">
                {/* Left section: fixed width matching sidebar (256px = w-64) */}
                <div className="hidden lg:flex items-center gap-2 w-64 shrink-0 px-4 border-r border-slate-200 dark:border-slate-800/50">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Link>

                    {/* Clickable Title */}
                    <button
                        onClick={() => {
                            setEditingTitle(title)
                            setShowTitleDialog(true)
                        }}
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

                {/* Center section: Formatting Tools - Aligned with document */}
                <div className="flex-1 flex items-center justify-center gap-4 px-4">
                    {/* AI + Wand */}
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            className="h-7 px-3 text-[10px] font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 border-0"
                            onClick={handleOpenAiModal}
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
                                {fonts.map((font) => (
                                    <DropdownMenuItem
                                        key={font}
                                        onClick={() => {
                                            if (editor.state.selection.empty) {
                                                toast.info("Selecione um texto primeiro")
                                                return
                                            }
                                            editor.chain().focus().setFontFamily(font).run()
                                            setCurrentFont(font)
                                        }}
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

                        {/* Font Size Controls - Only for selected text */}
                        <Button
                            className="h-7 w-7 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                if (editor.state.selection.empty) {
                                    toast.info("Selecione um texto primeiro")
                                    return
                                }
                                const newSize = Math.max(8, selectionFontSize - 1)
                                editor.chain().focus().setFontSize(`${newSize}px`).run()
                                setSelectionFontSize(newSize)
                            }}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-xs w-8 text-center tabular-nums text-slate-700 dark:text-slate-300">{selectionFontSize}</span>
                        <Button
                            className="h-7 w-7 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                if (editor.state.selection.empty) {
                                    toast.info("Selecione um texto primeiro")
                                    return
                                }
                                const newSize = Math.min(72, selectionFontSize + 1)
                                editor.chain().focus().setFontSize(`${newSize}px`).run()
                                setSelectionFontSize(newSize)
                            }}
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
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800" onClick={handleExport}>
                        <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                        <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => {
                        const text = editor.state.doc.textBetween(0, editor.state.doc.content.size)
                        navigator.clipboard.writeText(text)
                        toast.success("Copiado!")
                    }}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </header>

            {/* Content Area: Sidebar + Document */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar - Navigation - Flush with document */}
                <DocumentSidebar
                    headings={headings}
                    title={title}
                    activeHeadingId={activeHeadingId}
                    onHeadingClick={handleScrollToHeading}
                    className="hidden lg:flex print:hidden"
                />

                {/* Editor Scroll Area with gray background */}
                <div ref={editorScrollRef} className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-100 dark:bg-slate-950 print:bg-white flex justify-center">
                    {/* Document Paper - Centered with defined borders */}
                    <div
                        className="bg-white dark:bg-slate-900 shadow-sm border-x border-slate-200 dark:border-slate-800 print:border-0 print:shadow-none print:bg-white print:text-black min-h-full overflow-hidden"
                        style={{
                            width: '100%',
                            maxWidth: '800px',
                            padding: '40px 60px',
                            fontSize: `${fontSize}px`,
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word'
                        }}
                    >
                        {/* Header Banner - like inspiration */}
                        <div className="mb-8 py-3 px-4 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center gap-4 print:hidden">
                            <span className="text-xs text-slate-600 dark:text-slate-300">Adicione um cabeçalho:</span>
                            <Button
                                size="sm"
                                className="h-7 text-xs bg-emerald-500 hover:bg-emerald-600 text-white border-0"
                                onClick={() => {
                                    setHeaderFooterInitialType('image')
                                    setShowHeaderFooterModal(true)
                                }}
                            >
                                <Image className="h-3 w-3 mr-1.5" /> Inserir Imagem
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs border-slate-400 dark:border-slate-500 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 hover:text-slate-900 dark:hover:text-white"
                                onClick={() => {
                                    setHeaderFooterInitialType('text')
                                    setShowHeaderFooterModal(true)
                                }}
                            >
                                <Type className="h-3 w-3 mr-1.5" /> Inserir Texto
                            </Button>
                        </div>

                        <EditorContent editor={editor} />
                    </div>
                </div>

                {/* Bubble Menu with formatting + alignment */}
                {editor && (
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

                        <Button
                            size="sm"
                            className="h-7 px-2 text-[10px] bg-purple-600 hover:bg-purple-700 text-white border-0"
                            onClick={handleOpenAiModal}
                        >
                            <Wand2 className="h-3 w-3 mr-1" /> Modificar
                        </Button>
                    </BubbleMenu>
                )}
            </div>

            {/* Title Edit Dialog */}
            <Dialog open={showTitleDialog} onOpenChange={setShowTitleDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Editar título da peça</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Input
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value.slice(0, 50))}
                            placeholder="Nome do documento"
                            className="border-emerald-500 focus-visible:ring-emerald-500"
                            maxLength={50}
                        />
                        <p className="text-xs text-muted-foreground">{editingTitle.length} / 50</p>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setShowTitleDialog(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleSaveTitle} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                            Salvar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* AI Assistant Modal */}
            <AiAssistantModal
                isOpen={showAiModal}
                onClose={() => setShowAiModal(false)}
                selectedText={selectedText}
                onInsert={handleInsertAiText}
            />

            {/* Header/Footer Configuration Modal */}
            <HeaderFooterModal
                isOpen={showHeaderFooterModal}
                onClose={() => setShowHeaderFooterModal(false)}
                onSave={(config) => {
                    setHeaderFooterConfig(config)
                    toast.success("Configurações salvas!")
                }}
                initialConfig={headerFooterConfig || undefined}
                initialContentType={headerFooterInitialType}
            />
        </div>
    )
}
