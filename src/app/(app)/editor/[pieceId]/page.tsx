"use client"

import { Editor } from "@/components/editor/editor"
import { useState } from "react"

export default function EditorPage({ params }: { params: { pieceId: string } }) {
    // In a real app, we would fetch the piece data here
    const [documentTitle, setDocumentTitle] = useState("Atropelamento com Fraturas Bilaterais")

    const initialContent = `
    <h1>ABERTURA DE PROCESSO ADMINISTRATIVO</h1>
    <h2>1. DOS FATOS</h2>
    <p>João, pessoa física, vítima de atropelamento ocorrido enquanto se dirigia à padaria, sofreu fraturas em ambas as pernas em razão do impacto sofrido nas vias urbanas.</p>
    <p>O acidente ocorreu em contexto urbano marcado por tráfego intenso e insuficiência de infraestrutura adequada para pedestres...</p>
    <h2>2. DA COMPETÊNCIA</h2>
    <p>A competência para análise deste pleito é deste órgão, conforme legislação vigente.</p>
    <h2>3. DOS PEDIDOS</h2>
    <p>Diante do exposto, requer a abertura de processo administrativo para apuração dos fatos.</p>
  `

    return (
        <div className="h-[calc(100vh-60px)] flex flex-col">
            <Editor
                initialContent={initialContent}
                documentTitle={documentTitle}
                onTitleChange={setDocumentTitle}
            />
        </div>
    )
}
