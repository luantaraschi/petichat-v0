"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import { FontSize } from './extensions/font-size'
import { TextSelection } from '@tiptap/pm/state'
import { useState, useRef } from 'react'
import { Image, Type } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { AiAssistantModal } from './ai-assistant-modal'
import { DocumentSidebar } from './document-sidebar'
import { HeaderFooterModal, HeaderFooterConfig } from './header-footer-modal'
import { AiSuggestionPopup } from './ai-suggestion-popup'
import { EditorToolbar } from './editor-toolbar'
import { EditorBubbleMenu } from './editor-bubble-menu'
import { useAiSuggestion, useDocumentHeadings } from './hooks'

interface EditorProps {
    initialContent: string
    documentTitle?: string
    pieceId?: string
    onTitleChange?: (newTitle: string) => void
    onSave?: (contentJson: unknown) => void
}

export function Editor({ initialContent, documentTitle = "Documento", pieceId, onTitleChange, onSave }: EditorProps) {
    // Title state
    const [title, setTitle] = useState(documentTitle)
    const [showTitleDialog, setShowTitleDialog] = useState(false)
    const [editingTitle, setEditingTitle] = useState(documentTitle)

    // Font state
    const [fontSize] = useState(14)
    const [currentFont, setCurrentFont] = useState('Arial')
    const [selectionFontSize, setSelectionFontSize] = useState(14)

    // AI Modal state
    const [showAiModal, setShowAiModal] = useState(false)
    const [selectedText, setSelectedText] = useState("")

    // Header/Footer state
    const [showHeaderFooterModal, setShowHeaderFooterModal] = useState(false)
    const [headerFooterInitialType, setHeaderFooterInitialType] = useState<'image' | 'text'>('text')
    const [headerFooterConfig, setHeaderFooterConfig] = useState<HeaderFooterConfig | null>(null)

    const editorScrollRef = useRef<HTMLDivElement>(null)

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
                const target = event.target as HTMLElement
                if (target.tagName === 'P') {
                    const $pos = view.state.doc.resolve(pos)
                    const start = $pos.start($pos.depth)
                    const end = $pos.end($pos.depth)
                    const selection = TextSelection.create(view.state.doc, start, end)
                    view.dispatch(view.state.tr.setSelection(selection))
                    return true
                }
                return false
            },
        },
    })

    // Custom hooks
    const { headings, activeHeadingId, scrollToHeading } = useDocumentHeadings({
        editor,
        scrollContainerRef: editorScrollRef,
    })

    const aiSuggestion = useAiSuggestion({
        editor,
        pieceId,
        onSave,
    })

    // Handlers
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

    const handleEditTitle = () => {
        setEditingTitle(title)
        setShowTitleDialog(true)
    }

    if (!editor) {
        return null
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200">
            <EditorToolbar
                editor={editor}
                title={title}
                currentFont={currentFont}
                selectionFontSize={selectionFontSize}
                onFontChange={setCurrentFont}
                onFontSizeChange={setSelectionFontSize}
                onOpenAiModal={handleOpenAiModal}
                onExport={handleExport}
                onEditTitle={handleEditTitle}
            />

            <div className="flex flex-1 overflow-hidden">
                <DocumentSidebar
                    headings={headings}
                    title={title}
                    activeHeadingId={activeHeadingId}
                    onHeadingClick={scrollToHeading}
                    className="hidden lg:flex print:hidden"
                />

                <div ref={editorScrollRef} className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-100 dark:bg-slate-950 print:bg-white flex justify-center">
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
                        {/* Header Banner */}
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

                <EditorBubbleMenu
                    editor={editor}
                    onRequestAiSuggestion={aiSuggestion.requestSuggestion}
                    onOpenAiModal={handleOpenAiModal}
                />
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

            <AiAssistantModal
                isOpen={showAiModal}
                onClose={() => setShowAiModal(false)}
                selectedText={selectedText}
                onInsert={handleInsertAiText}
            />

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

            <AiSuggestionPopup
                isOpen={aiSuggestion.isOpen}
                isLoading={aiSuggestion.isLoading}
                originalText={aiSuggestion.originalText}
                suggestedText={aiSuggestion.suggestedText}
                actionType={aiSuggestion.actionType}
                suggestionId={aiSuggestion.suggestionId}
                position={aiSuggestion.position}
                onAccept={aiSuggestion.acceptSuggestion}
                onReject={aiSuggestion.rejectSuggestion}
                onRegenerate={aiSuggestion.regenerateSuggestion}
            />
        </div>
    )
}
