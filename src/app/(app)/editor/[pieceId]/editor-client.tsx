"use client"

import { Editor } from "@/components/editor/editor"
import { useState, useCallback } from "react"
import { toast } from "sonner"

interface EditorClientProps {
    pieceId: string
    initialContent: string
    documentTitle: string
}

export function EditorClient({ pieceId, initialContent, documentTitle }: EditorClientProps) {
    const [title, setTitle] = useState(documentTitle)

    const handleTitleChange = useCallback(async (newTitle: string) => {
        setTitle(newTitle)

        if (pieceId === "demo") return

        try {
            await fetch(`/api/pieces/${pieceId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTitle }),
            })
        } catch (error) {
            console.error('Error saving title:', error)
        }
    }, [pieceId])

    const handleSave = useCallback(async (contentJson: unknown) => {
        if (pieceId === "demo") return

        try {
            await fetch(`/api/pieces/${pieceId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contentJson }),
            })
        } catch (error) {
            console.error('Error saving content:', error)
            toast.error('Erro ao salvar documento')
        }
    }, [pieceId])

    return (
        <div className="h-[calc(100vh-60px)] flex flex-col">
            <Editor
                pieceId={pieceId}
                initialContent={initialContent}
                documentTitle={title}
                onTitleChange={handleTitleChange}
                onSave={handleSave}
            />
        </div>
    )
}
