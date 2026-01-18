"use client"

import { Editor } from "@/components/editor/editor"
import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import { useParams } from "next/navigation"

export default function EditorPage() {
    const params = useParams<{ pieceId: string }>()
    const pieceId = params.pieceId

    const [isLoading, setIsLoading] = useState(true)
    const [title, setTitle] = useState("Carregando...")
    const [content, setContent] = useState("")
    const [error, setError] = useState<string | null>(null)

    // Load piece data
    useEffect(() => {
        async function loadPiece() {
            // Handle demo mode
            if (pieceId === "demo") {
                const demoContent = `
                    <h1>ABERTURA DE PROCESSO ADMINISTRATIVO</h1>
                    <h2>1. DOS FATOS</h2>
                    <p>João, pessoa física, vítima de atropelamento ocorrido enquanto se dirigia à padaria, sofreu fraturas em ambas as pernas em razão do impacto sofrido nas vias urbanas.</p>
                    <p>O acidente ocorreu em contexto urbano marcado por tráfego intenso e insuficiência de infraestrutura adequada para pedestres...</p>
                    <h2>2. DA COMPETÊNCIA</h2>
                    <p>A competência para análise deste pleito é deste órgão, conforme legislação vigente.</p>
                    <h2>3. DOS PEDIDOS</h2>
                    <p>Diante do exposto, requer a abertura de processo administrativo para apuração dos fatos.</p>
                `
                setTitle("Documento de Demonstração")
                setContent(demoContent)
                setIsLoading(false)
                return
            }

            // Fetch real piece from API
            try {
                const response = await fetch(`/api/pieces/${pieceId}`)
                if (!response.ok) {
                    if (response.status === 404) {
                        setError("Documento não encontrado")
                    } else {
                        setError("Erro ao carregar documento")
                    }
                    setIsLoading(false)
                    return
                }

                const piece = await response.json()
                setTitle(piece.title || piece.template?.title || "Documento")

                // Convert contentJson to HTML string if needed
                if (piece.contentJson) {
                    // If it's a TipTap JSON, we'll pass it as-is and let the editor handle it
                    setContent(typeof piece.contentJson === 'string'
                        ? piece.contentJson
                        : JSON.stringify(piece.contentJson))
                } else {
                    setContent("<p>Comece a escrever sua peça jurídica...</p>")
                }
            } catch (err) {
                console.error('Error loading piece:', err)
                setError("Erro ao carregar documento")
            } finally {
                setIsLoading(false)
            }
        }

        loadPiece()
    }, [pieceId])

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

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">Carregando documento...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <a href="/dashboard" className="text-emerald-500 hover:underline">
                        Voltar ao dashboard
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="h-[calc(100vh-60px)] flex flex-col">
            <Editor
                pieceId={pieceId}
                initialContent={content}
                documentTitle={title}
                onTitleChange={handleTitleChange}
                onSave={handleSave}
            />
        </div>
    )
}
