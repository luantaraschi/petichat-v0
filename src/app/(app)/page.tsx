"use client"

import Link from "next/link"
import { Search, Bot, Scale, FileText, Sparkles, MoveRight, BookOpen, PenTool, Mic, Plus, MessageSquare, PlayCircle, BarChart3, Clock, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HomePage() {
    return (
        <div className="space-y-8 pb-10 max-w-7xl mx-auto bg-dot-pattern min-h-screen">

            {/* Greeting Header */}
            <div className="flex flex-col items-center justify-center space-y-6 pt-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-900/40">
                        {/* Using a generic icon that looks like the logo */}
                        <Bot className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">
                        Bem-vindo(a) de volta, <span className="text-primary">Luan!</span>
                    </h1>
                </div>

                {/* Search Bar */}
                <div className="relative w-full max-w-2xl">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="O que você quer fazer agora?"
                        className="pl-12 h-12 bg-background/50 border-input focus-visible:ring-green-500 rounded-xl text-base shadow-sm"
                    />
                </div>
            </div>

            {/* Section: Faça agora */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-muted-foreground" />
                    <h2 className="text-lg font-semibold text-muted-foreground">Faça agora</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <Link href="/dashboard" className="block h-full">
                        <Card className="bg-card hover:bg-accent/50 border-border hover:border-accent transition-all group h-full cursor-pointer">
                            <CardHeader>
                                <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3">
                                    <FileText className="h-6 w-6 text-orange-500" />
                                </div>
                                <CardTitle className="text-card-foreground">Crie uma Peça Jurídica</CardTitle>
                                <CardDescription className="text-muted-foreground">Peça pronta, estruturada e fundamentada</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="secondary" className="w-full justify-start bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border/50">
                                    <Plus className="mr-2 h-4 w-4" /> Criar Peça
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Card 2 */}
                    <Link href="/analysis" className="block h-full">
                        <Card className="bg-card hover:bg-accent/50 border-border hover:border-accent transition-all group h-full cursor-pointer">
                            <CardHeader>
                                <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-3">
                                    <Scale className="h-6 w-6 text-indigo-400" />
                                </div>
                                <CardTitle className="text-card-foreground">Analise um Processo</CardTitle>
                                <CardDescription className="text-muted-foreground">Pontos-chave, riscos e estratégia</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="secondary" className="w-full justify-start bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border/50">
                                    <MoveRight className="mr-2 h-4 w-4 -rotate-45" /> Iniciar Análise
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Card 3 */}
                    <Link href="/agents" className="block h-full">
                        <Card className="bg-card hover:bg-accent/50 border-border hover:border-accent transition-all group h-full cursor-pointer">
                            <CardHeader>
                                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-3">
                                    <MessageSquare className="h-6 w-6 text-green-500" />
                                </div>
                                <CardTitle className="text-card-foreground">Interaja com Agentes de IA</CardTitle>
                                <CardDescription className="text-muted-foreground">IA treinada por área do Direito</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="secondary" className="w-full justify-start bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border/50">
                                    <MoveRight className="mr-2 h-4 w-4 -rotate-45" /> Ver Agentes
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>

            {/* Section: Atalhos */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <h2 className="text-lg font-semibold text-muted-foreground">Atalhos</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Shortcut 1 */}
                    <Card className="bg-card/50 border-border hover:bg-accent/40 transition-all cursor-pointer">
                        <CardHeader className="p-4 pb-2">
                            <div className="h-8 w-8 rounded bg-accent flex items-center justify-center mb-2">
                                <PlayCircle className="h-4 w-4 text-accent-foreground" />
                            </div>
                            <CardTitle className="text-sm font-semibold text-card-foreground">Transcrição de Mídia</CardTitle>
                            <CardDescription className="text-xs text-muted-foreground/80">Extraia texto de áudios e vídeos</CardDescription>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0">
                            <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full mt-2">Abrir</span>
                        </CardFooter>
                    </Card>

                    {/* Shortcut 2 */}
                    <Card className="bg-card/50 border-border hover:bg-accent/40 transition-all cursor-pointer">
                        <CardHeader className="p-4 pb-2">
                            <div className="h-8 w-8 rounded bg-accent flex items-center justify-center mb-2">
                                <Scale className="h-4 w-4 text-accent-foreground" />
                            </div>
                            <CardTitle className="text-sm font-semibold text-card-foreground">Busca por Jurisprudências</CardTitle>
                            <CardDescription className="text-xs text-muted-foreground/80">+9M Jurisprudências reais</CardDescription>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0">
                            <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full mt-2">Abrir</span>
                        </CardFooter>
                    </Card>

                    {/* Shortcut 3 */}
                    <Card className="bg-card/50 border-border hover:bg-accent/40 transition-all cursor-pointer">
                        <CardHeader className="p-4 pb-2">
                            <div className="h-8 w-8 rounded bg-accent flex items-center justify-center mb-2">
                                <PenTool className="h-4 w-4 text-accent-foreground" />
                            </div>
                            <CardTitle className="text-sm font-semibold text-card-foreground">Reescrita</CardTitle>
                            <CardDescription className="text-xs text-muted-foreground/80">Reescreva com ajuda da IA</CardDescription>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0">
                            <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full mt-2">Abrir</span>
                        </CardFooter>
                    </Card>

                    {/* Add Shortcut */}
                    <Card className="bg-transparent border-dashed border-border hover:bg-accent/20 transition-all cursor-pointer flex items-center justify-center h-full min-h-[140px]">
                        <Button variant="ghost" className="text-muted-foreground hover:bg-transparent">
                            <Plus className="mr-2 h-4 w-4" /> Adicionar Atalho
                        </Button>
                    </Card>
                </div>
            </div>

            {/* Section: Aprenda */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <h2 className="text-lg font-semibold text-muted-foreground">Aprenda</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Mock Learning Cards - Simplified */}
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="bg-card border-border overflow-hidden group">
                            <div className="h-24 bg-gradient-to-br from-green-500/20 to-blue-500/20 w-full relative">
                                {/* Decorate with some opacity patterns or solid color */}
                                <div className="absolute inset-0 bg-black/5 dark:bg-black/40" />
                            </div>
                            <CardHeader className="p-4">
                                <CardTitle className="text-sm text-card-foreground line-clamp-2 leading-snug">Como elaborar uma peça jurídica perfeita com IA</CardTitle>
                                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" /> 4 min de leitura
                                </div>
                            </CardHeader>
                            <CardFooter className="p-4 pt-0">
                                <Button size="sm" variant="secondary" className="w-full text-xs h-8 bg-secondary hover:bg-secondary/80 text-secondary-foreground">
                                    Aprender
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Section: Stats */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-muted-foreground" />
                    <h2 className="text-lg font-semibold text-muted-foreground">A IA já trabalhou por você</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Stat 1 */}
                    <Card className="bg-card border-border p-4 flex flex-col justify-between h-32 relative overflow-hidden">
                        <div className="flex justify-between items-start z-10">
                            <div className="h-8 w-8 rounded bg-accent flex items-center justify-center">
                                <Clock className="h-4 w-4 text-foreground" />
                            </div>
                            {/* Mock Sparkline */}
                            <svg className="w-16 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M0 20 L5 18 L10 22 L15 10 L20 15 L25 5 L30 15 L35 10" />
                            </svg>
                        </div>
                        <div className="z-10 mt-auto">
                            <div className="text-2xl font-bold text-foreground">0h</div>
                            <div className="text-xs text-muted-foreground">Horas Poupadas</div>
                        </div>
                    </Card>

                    {/* Stat 2 */}
                    <Card className="bg-card border-border p-4 flex flex-col justify-between h-32 relative overflow-hidden">
                        <div className="flex justify-between items-start z-10">
                            <div className="h-8 w-8 rounded bg-accent flex items-center justify-center">
                                <FileCheck className="h-4 w-4 text-foreground" />
                            </div>
                            <svg className="w-16 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M0 20 L10 25 L20 15 L35 5" />
                            </svg>
                        </div>
                        <div className="z-10 mt-auto">
                            <div className="text-2xl font-bold text-foreground">1</div>
                            <div className="text-xs text-muted-foreground">Peças Criadas com IA</div>
                        </div>
                    </Card>

                    {/* Stat 3 */}
                    <Card className="bg-card border-border p-4 flex flex-col justify-between h-32 relative overflow-hidden">
                        <div className="flex justify-between items-start z-10">
                            <div className="h-8 w-8 rounded bg-accent flex items-center justify-center">
                                <MessageSquare className="h-4 w-4 text-foreground" />
                            </div>
                            <svg className="w-16 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M0 15 L10 15 L15 10 L25 20 L35 15" />
                            </svg>
                        </div>
                        <div className="z-10 mt-auto">
                            <div className="text-2xl font-bold text-foreground">0</div>
                            <div className="text-xs text-muted-foreground">Interações com a IA</div>
                        </div>
                    </Card>

                    {/* Stat 4 */}
                    <Card className="bg-card border-border p-4 flex flex-col justify-between h-32 relative overflow-hidden">
                        <div className="flex justify-between items-start z-10">
                            <div className="h-8 w-8 rounded bg-accent flex items-center justify-center">
                                <Scale className="h-4 w-4 text-foreground" />
                            </div>
                            <svg className="w-16 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M0 25 L10 20 L15 10 L25 10 L35 5" />
                            </svg>
                        </div>
                        <div className="z-10 mt-auto">
                            <div className="text-2xl font-bold text-foreground">0</div>
                            <div className="text-xs text-muted-foreground">Processos Analisados</div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Floating Chat Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <Button
                    size="icon"
                    className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-black shadow-lg shadow-green-500/30 transition-transform hover:scale-105"
                >
                    <MessageSquare className="h-7 w-7" />
                </Button>
            </div>
        </div>
    )
}
