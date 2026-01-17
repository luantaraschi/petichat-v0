"use client"

import React from "react"
import {
    Search,
    MessageSquare,
    Gavel,
    FileText,
    Star,
    Briefcase,
    GitBranch,
    Brain,
    Mic,
    PenTool,
    Hammer,
    CheckCircle,
    MessageCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function AnalysisPage() {
    return (
        <div className="flex h-full min-h-[calc(100vh-4rem)]">
            {/* Secondary Sidebar */}
            <aside className="w-64 border-r border-border/50 pr-6 py-6 hidden lg:block space-y-8">

                {/* Section: Outros */}
                <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-3">Outros</h3>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground h-10 pl-3">
                            <MessageSquare className="h-4 w-4" />
                            Interação Livre
                        </Button>
                    </div>
                </div>

                {/* Section: Processos */}
                <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-3">Processos</h3>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground h-10 pl-3">
                            <Star className="h-4 w-4" />
                            Estratégia e Tomada de Decisão
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground h-10 pl-3">
                            <Briefcase className="h-4 w-4" />
                            Gestão e Escritório
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground h-10 pl-3">
                            <GitBranch className="h-4 w-4" />
                            Planejamento Processual
                        </Button>
                    </div>
                </div>

                {/* Section: Social & Linguístico */}
                <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-3">Social & Linguístico</h3>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground h-10 pl-3">
                            <Brain className="h-4 w-4" />
                            Compreensão do Processo
                        </Button>
                    </div>
                </div>

                {/* Section: Utilidades */}
                <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-3">Utilidades</h3>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground h-10 pl-3">
                            <Mic className="h-4 w-4" />
                            Atuação Oral
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground h-10 pl-3">
                            <PenTool className="h-4 w-4" />
                            Construção da Peça
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground h-10 pl-3">
                            <Hammer className="h-4 w-4" />
                            Preparação Técnica
                        </Button>
                    </div>
                </div>
                {/* Section: Validação */}
                <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-3">Validação</h3>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground h-10 pl-3">
                            <CheckCircle className="h-4 w-4" />
                            Validação Técnica e Qualidade
                        </Button>
                    </div>
                </div>

            </aside>

            {/* Main Content Area */}
            <main className="flex-1 py-6 px-6 md:px-8 lg:pl-8 space-y-8">

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <span className="opacity-50">Análises e Resumos</span>
                            </Link>
                            <span className="text-muted-foreground/50 text-sm">/</span>
                            <span className="text-sm font-medium">Minhas Análises</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                            Análises e Resumos
                        </h1>
                        <p className="text-muted-foreground mt-1">Envie um processo e obtenha uma análise, resumo e muito mais</p>
                    </div>

                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <div className="relative w-full lg:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Busque por funcionalidades..."
                                className="pl-9 bg-card border-border/50"
                            />
                        </div>
                        <Button className="bg-green-500 hover:bg-green-600 text-black font-medium gap-2 shrink-0">
                            <Star className="h-4 w-4" />
                            Minhas Análises
                        </Button>
                    </div>
                </div>

                {/* Section: Recomendados */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-muted-foreground">Recomendados</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">

                        {/* Card 1 */}
                        <Card className="border-0 bg-card hover:bg-accent/50 transition-all cursor-pointer group shadow-sm ring-1 ring-border/50 hover:ring-green-500/50">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                    <Gavel className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-yellow-500 text-black border-0 text-xs font-semibold px-2 py-0.5 pointer-events-none">Em alta</Badge>
                                    <Badge className="bg-green-500 text-black border-0 text-xs font-semibold px-2 py-0.5 pointer-events-none">Novo</Badge>
                                    <button className="text-muted-foreground hover:text-yellow-400 transition-colors">
                                        <Star className="h-4 w-4" />
                                    </button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-base font-bold mb-2 group-hover:text-green-500 transition-colors">Faça uma análise de sentença</CardTitle>
                                <CardDescription>Avalia fundamentos, coerência e impactos da decisão.</CardDescription>
                            </CardContent>
                        </Card>

                        {/* Card 2 */}
                        <Card className="border-0 bg-card hover:bg-accent/50 transition-all cursor-pointer group shadow-sm ring-1 ring-border/50 hover:ring-green-500/50">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-yellow-500 text-black border-0 text-xs font-semibold px-2 py-0.5 pointer-events-none">Em alta</Badge>
                                    <Badge className="bg-green-500 text-black border-0 text-xs font-semibold px-2 py-0.5 pointer-events-none">Novo</Badge>
                                    <button className="text-muted-foreground hover:text-yellow-400 transition-colors">
                                        <Star className="h-4 w-4" />
                                    </button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-base font-bold mb-2 group-hover:text-green-500 transition-colors">Resumo processual simples</CardTitle>
                                <CardDescription>Síntese objetiva para entendimento rápido do caso.</CardDescription>
                            </CardContent>
                        </Card>

                        {/* Card 3 */}
                        <Card className="border-0 bg-card hover:bg-accent/50 transition-all cursor-pointer group shadow-sm ring-1 ring-border/50 hover:ring-green-500/50">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                                    <MessageSquare className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-yellow-500 text-black border-0 text-xs font-semibold px-2 py-0.5 pointer-events-none">Em alta</Badge>
                                    <Badge className="bg-green-500 text-black border-0 text-xs font-semibold px-2 py-0.5 pointer-events-none">Novo</Badge>
                                    <button className="text-muted-foreground hover:text-yellow-400 transition-colors">
                                        <Star className="h-4 w-4" />
                                    </button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-base font-bold mb-2 group-hover:text-green-500 transition-colors">Simule argumentos da parte contrária</CardTitle>
                                <CardDescription>Mapeia teses adversas prováveis para preparo estratégico.</CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Section: Interação Livre Placeholder */}
                <div className="space-y-4 pt-4">
                    <h2 className="text-lg font-semibold text-muted-foreground">Interação Livre</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <Card className="border-0 bg-card hover:bg-accent/50 transition-all cursor-pointer group shadow-sm ring-1 ring-border/50 hover:ring-green-500/50">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-yellow-500 text-black border-0 text-xs font-semibold px-2 py-0.5 pointer-events-none">Em alta</Badge>
                                    <Badge className="bg-green-500 text-black border-0 text-xs font-semibold px-2 py-0.5 pointer-events-none">Novo</Badge>
                                    <button className="text-muted-foreground hover:text-yellow-400 transition-colors">
                                        <Star className="h-4 w-4" />
                                    </button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-base font-bold mb-2 group-hover:text-green-500 transition-colors">Chat com IA Jurídica</CardTitle>
                                <CardDescription>Converse livremente para tirar dúvidas ou brainstorming.</CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </main>
        </div>
    )
}
