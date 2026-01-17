"use client"

import { useState } from "react"
import { ArrowLeft, Plus, FileText, Link2, FileJson, History, Mic, Undo2, Redo2, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, Copy, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// Writing tones with emojis
const writingTones = [
    { id: "juridico", label: "Jurídico", emoji: "⚖️", popular: false },
    { id: "persuasivo", label: "Persuasivo", emoji: "🎯", popular: true },
    { id: "emotivo", label: "Emotivo", emoji: "❤️", popular: true },
    { id: "impositivo", label: "Impositivo", emoji: "💪", popular: false },
    { id: "conversacional", label: "Conversacional", emoji: "💬", popular: false },
    { id: "conciliador", label: "Conciliador", emoji: "🤝", popular: false },
    { id: "criativo", label: "Criativo", emoji: "🎨", popular: false },
    { id: "enfatico", label: "Enfático", emoji: "❗", popular: false },
    { id: "direto", label: "Direto", emoji: "🎯", popular: false },
    { id: "profissional", label: "Profissional", emoji: "💼", popular: false },
    { id: "discreto", label: "Discreto", emoji: "🔒", popular: false },
    { id: "inspirador", label: "Inspirador", emoji: "🌟", popular: false },
]

const creativityLevels = [
    { id: "original", label: "Original", description: "" },
    { id: "criativo", label: "Criativo", description: "Reformula com mais liberdade, trazendo variações na estrutura e estilo, sem fugir do conteúdo." },
    { id: "mais-criativo", label: "+ Criativo", description: "" },
]

const pointOfViews = [
    { id: "primeira", label: "1ª Pessoa (Eu/Nós)", description: "Função: Criar intimidade, subjetividade e uma conexão pessoal com a experiência contada" },
    { id: "segunda", label: "2ª Pessoa (Você/Tu)", description: "Função: Gerar uma experiência imersiva, interativa ou instrucional, fazendo o leitor sentir-se parte da narrativa." },
    { id: "terceira", label: "3ª Pessoa (Ele/Ela/Eles)", description: "Função: Permitir uma visão mais ampla, objetiva (ou aparentemente objetiva) e explorar múltiplos personagens e cenários" },
]

export default function RewritePage() {
    const [activeTab, setActiveTab] = useState<"new" | "history">("new")
    const [showForm, setShowForm] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [text, setText] = useState("")
    const [rewrittenText, setRewrittenText] = useState("")
    const [documentTitle, setDocumentTitle] = useState("Texto Reescrito")
    const [creativityLevel, setCreativityLevel] = useState("criativo")
    const [selectedTones, setSelectedTones] = useState<string[]>([])
    const [pointOfView, setPointOfView] = useState("primeira")
    const [isLoading, setIsLoading] = useState(false)
    const [sidebarTab, setSidebarTab] = useState<"config" | "chat">("config")

    const toggleTone = (toneId: string) => {
        setSelectedTones(prev =>
            prev.includes(toneId)
                ? prev.filter(t => t !== toneId)
                : [...prev, toneId]
        )
    }

    const handleRewrite = async () => {
        if (!text.trim()) return

        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1500))

        setRewrittenText(`Você estava a caminho da padaria — passos leves, pensamento distraído com o cheiro do pão ainda por vir — quando tudo mudou: ${text}`)
        setDocumentTitle("Reescrita do texto")
        setShowResult(true)
        setIsLoading(false)
    }

    const handleCopyText = () => {
        navigator.clipboard.writeText(rewrittenText)
        toast.success("Texto copiado!")
    }

    // Empty state view
    const EmptyState = () => (
        <div className="flex-1 flex items-center justify-center p-8">
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-12 max-w-lg text-center border border-slate-200 dark:border-slate-700/50">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                        <Link2 className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <FileJson className="h-5 w-5 text-orange-500" />
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Ainda não há nada aqui. Vamos criar algo incrível!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                    Vamos criar sua primeira reescrita, clique no botão abaixo.
                </p>

                <Button
                    onClick={() => setShowForm(true)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white border-0"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Reescrita
                </Button>
            </div>
        </div>
    )

    // Sidebar panel for the result view
    const SidebarPanel = () => (
        <div className="w-80 lg:w-96 bg-slate-100 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden">
            {/* Agent Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">Agente de Reescrita de Texto</h3>
                        <p className="text-xs text-slate-500">Especialista</p>
                    </div>
                </div>

                {/* Sidebar Tabs */}
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={() => setSidebarTab("config")}
                        className={cn(
                            "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                            sidebarTab === "config"
                                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                        )}
                    >
                        Pré-definições
                    </button>
                    <button
                        onClick={() => setSidebarTab("chat")}
                        className={cn(
                            "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                            sidebarTab === "chat"
                                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                        )}
                    >
                        Chat com IA
                    </button>
                </div>
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {sidebarTab === "config" ? (
                    <>
                        {/* Text input */}
                        <div className="mb-6">
                            <label htmlFor="sidebar-text-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Texto a ser reescrito
                            </label>
                            <div className="relative">
                                <Textarea
                                    id="sidebar-text-input"
                                    name="sidebar-text-input"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Insira o texto a ser reescrito..."
                                    className="min-h-[100px] bg-white dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 placeholder:text-slate-500 resize-none rounded-xl text-sm"
                                />
                                <button type="button" className="absolute bottom-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                                    <Mic className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Creativity Level */}
                        <div className="mb-6">
                            <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Nível de Criatividade
                            </span>
                            <p className="text-xs text-slate-500 mb-3">
                                Selecione o nível de criatividade desejado para a reescrita
                            </p>
                            <div className="space-y-2">
                                {creativityLevels.map((level) => (
                                    <button
                                        key={level.id}
                                        type="button"
                                        onClick={() => setCreativityLevel(level.id)}
                                        className={cn(
                                            "w-full text-left p-3 rounded-xl border transition-all",
                                            creativityLevel === level.id
                                                ? "bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/30"
                                                : "bg-white dark:bg-slate-800/30 border-slate-300 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                                                creativityLevel === level.id
                                                    ? "border-emerald-500"
                                                    : "border-slate-400 dark:border-slate-500"
                                            )}>
                                                {creativityLevel === level.id && (
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                )}
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{level.label}</span>
                                                {level.description && (
                                                    <p className="text-xs text-slate-500 mt-0.5">{level.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Writing Tones */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-1">
                                <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Tons de escrita
                                </span>
                                <span className="text-xs text-slate-500">
                                    {selectedTones.length} selecionado{selectedTones.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mb-3">
                                Selecione os tons de escrita desejados
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                {writingTones.slice(0, 6).map((tone) => (
                                    <button
                                        key={tone.id}
                                        type="button"
                                        onClick={() => toggleTone(tone.id)}
                                        className={cn(
                                            "flex items-center justify-between p-2 rounded-lg border transition-all text-left text-xs",
                                            selectedTones.includes(tone.id)
                                                ? "bg-emerald-500/10 border-emerald-500/50"
                                                : "bg-white dark:bg-slate-800/30 border-slate-300 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600"
                                        )}
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-sm">{tone.emoji}</span>
                                            <span className="text-slate-900 dark:text-slate-200">{tone.label}</span>
                                        </div>
                                        <div className={cn(
                                            "w-3.5 h-3.5 rounded border flex items-center justify-center",
                                            selectedTones.includes(tone.id)
                                                ? "bg-emerald-500 border-emerald-500"
                                                : "border-slate-400 dark:border-slate-600"
                                        )}>
                                            {selectedTones.includes(tone.id) && (
                                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Point of View */}
                        <div className="mb-6">
                            <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Ponto de Vista
                            </span>
                            <div className="space-y-2">
                                {pointOfViews.map((pov) => (
                                    <button
                                        key={pov.id}
                                        type="button"
                                        onClick={() => setPointOfView(pov.id)}
                                        className={cn(
                                            "w-full text-left p-3 rounded-xl border transition-all",
                                            pointOfView === pov.id
                                                ? "bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/30"
                                                : "bg-white dark:bg-slate-800/30 border-slate-300 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600"
                                        )}
                                    >
                                        <div className="flex items-start gap-2">
                                            <div className={cn(
                                                "w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0",
                                                pointOfView === pov.id
                                                    ? "border-emerald-500"
                                                    : "border-slate-400 dark:border-slate-500"
                                            )}>
                                                {pointOfView === pov.id && (
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                )}
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{pov.label}</span>
                                                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{pov.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                        Chat com IA em breve...
                    </div>
                )}
            </div>

            {/* Fixed Submit Button */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <Button
                    onClick={handleRewrite}
                    disabled={!text.trim() || isLoading}
                    className="w-full h-10 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl disabled:opacity-50"
                >
                    {isLoading ? "Reescrevendo..." : "Reescrever"}
                </Button>
            </div>
        </div>
    )

    // Result view with split screen
    const ResultView = () => (
        <div className="flex h-full">
            <SidebarPanel />

            {/* Right Content - Editor */}
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-950">
                {/* Toolbar */}
                <div className="flex items-center gap-2 p-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                            <Undo2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                            <Redo2 className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />

                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                            <Bold className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                            <Italic className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                            <Underline className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />

                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                            <AlignLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                            <AlignCenter className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                            <AlignRight className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                            <AlignJustify className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />

                    <Button variant="ghost" size="icon" className="h-8 w-8" type="button" onClick={handleCopyText}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>

                {/* Editor Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-3xl mx-auto">
                        <div
                            className="prose prose-slate dark:prose-invert max-w-none text-slate-900 dark:text-slate-200"
                            contentEditable
                            suppressContentEditableWarning
                        >
                            <p>{rewrittenText}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    // Rewrite form view (full page)
    const RewriteForm = () => (
        <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6">
                <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="font-medium">Nova Reescrita</span>
                </button>

                {/* Text input */}
                <div className="mb-8">
                    <label htmlFor="main-text-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                        Texto a ser reescrito
                    </label>
                    <div className="relative">
                        <Textarea
                            id="main-text-input"
                            name="main-text-input"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Insira o texto a ser reescrito..."
                            className="min-h-[150px] bg-white dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 placeholder:text-slate-500 resize-none rounded-xl"
                        />
                        <button type="button" className="absolute bottom-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                            <Mic className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Creativity Level */}
                <div className="mb-8">
                    <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Nível de Criatividade
                    </span>
                    <p className="text-xs text-slate-500 mb-4">
                        Selecione o nível de criatividade desejado para a reescrita
                    </p>
                    <div className="space-y-2">
                        {creativityLevels.map((level) => (
                            <button
                                key={level.id}
                                type="button"
                                onClick={() => setCreativityLevel(level.id)}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl border transition-all",
                                    creativityLevel === level.id
                                        ? "bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/30"
                                        : "bg-white dark:bg-slate-800/30 border-slate-300 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                                        creativityLevel === level.id
                                            ? "border-emerald-500"
                                            : "border-slate-400 dark:border-slate-500"
                                    )}>
                                        {creativityLevel === level.id && (
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        )}
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{level.label}</span>
                                        {level.description && (
                                            <p className="text-xs text-slate-500 mt-0.5">{level.description}</p>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Writing Tones */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-1">
                        <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Tons de escrita
                        </span>
                        <span className="text-xs text-slate-500">
                            {selectedTones.length} tons selecionado{selectedTones.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">
                        Selecione os tons de escrita desejados para a reescrita
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {writingTones.map((tone) => (
                            <button
                                key={tone.id}
                                type="button"
                                onClick={() => toggleTone(tone.id)}
                                className={cn(
                                    "flex items-center justify-between p-3 rounded-lg border transition-all text-left",
                                    selectedTones.includes(tone.id)
                                        ? "bg-emerald-500/10 border-emerald-500/50"
                                        : "bg-white dark:bg-slate-800/30 border-slate-300 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600"
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <span>{tone.emoji}</span>
                                    <div>
                                        <span className="text-sm text-slate-900 dark:text-slate-200">{tone.label}</span>
                                        {tone.popular && (
                                            <p className="text-[10px] text-slate-500">Mais usado</p>
                                        )}
                                    </div>
                                </div>
                                <div className={cn(
                                    "w-4 h-4 rounded border flex items-center justify-center",
                                    selectedTones.includes(tone.id)
                                        ? "bg-emerald-500 border-emerald-500"
                                        : "border-slate-400 dark:border-slate-600"
                                )}>
                                    {selectedTones.includes(tone.id) && (
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Point of View */}
                <div className="mb-8">
                    <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Ponto de Vista
                    </span>
                    <p className="text-xs text-slate-500 mb-4">
                        Selecione o ponto de vista desejado para a reescrita
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {pointOfViews.map((pov) => (
                            <button
                                key={pov.id}
                                type="button"
                                onClick={() => setPointOfView(pov.id)}
                                className={cn(
                                    "text-left p-4 rounded-xl border transition-all",
                                    pointOfView === pov.id
                                        ? "bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/30"
                                        : "bg-white dark:bg-slate-800/30 border-slate-300 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600"
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={cn(
                                        "w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0",
                                        pointOfView === pov.id
                                            ? "border-emerald-500"
                                            : "border-slate-400 dark:border-slate-500"
                                    )}>
                                        {pointOfView === pov.id && (
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        )}
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{pov.label}</span>
                                        <p className="text-xs text-slate-500 mt-1">{pov.description}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="sticky bottom-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-slate-50 dark:via-slate-950 to-transparent pt-4 pb-6 -mx-6 px-6">
                    <Button
                        onClick={handleRewrite}
                        disabled={!text.trim() || isLoading}
                        className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white text-base font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Reescrevendo..." : "Reescrever"}
                    </Button>
                </div>
            </div>
        </div>
    )

    // If showing result, render split view
    if (showResult) {
        return (
            <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                    <button
                        type="button"
                        onClick={() => setShowResult(false)}
                        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{documentTitle}</span>
                </div>

                <ResultView />
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
            {/* Header */}
            <div className="p-6 pb-0">
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Reescrever Textos</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Reescreva e melhore textos jurídicos com IA
                </p>

                {/* Tabs */}
                <div className="flex gap-2 mt-6">
                    <button
                        type="button"
                        onClick={() => { setActiveTab("new"); setShowForm(false); }}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            activeTab === "new"
                                ? "bg-white text-slate-900 shadow-sm"
                                : "bg-slate-200 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                        )}
                    >
                        <FileText className="h-4 w-4" />
                        Nova Reescrita
                    </button>
                    <button
                        type="button"
                        onClick={() => { setActiveTab("history"); setShowForm(false); }}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            activeTab === "history"
                                ? "bg-white text-slate-900 shadow-sm"
                                : "bg-slate-200 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                        )}
                    >
                        <History className="h-4 w-4" />
                        Histórico
                    </button>
                </div>
            </div>

            {/* Content */}
            {activeTab === "new" && !showForm && <EmptyState />}
            {activeTab === "new" && showForm && <RewriteForm />}
            {activeTab === "history" && (
                <div className="flex-1 flex items-center justify-center p-8">
                    <p className="text-slate-500">Nenhuma reescrita no histórico.</p>
                </div>
            )}
        </div>
    )
}
