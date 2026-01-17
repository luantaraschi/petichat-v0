"use client"

import * as React from "react"
import { Search, Plus, Star, FileText, ChevronRight, MessageSquarePlus, History, Folder, MessageCircle, Megaphone, MoreHorizontal } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { categories, templates, getTemplatesByCategory, getTemplateCounts, Template } from "@/data/templates"

// Template Card Component
function TemplateCard({ template }: { template: Template }) {
    return (
        <Link href={`/wizard/${template.id}`}>
            <Card className="h-full border-0 bg-card hover:bg-accent/50 transition-all cursor-pointer group relative overflow-hidden ring-1 ring-border/50 hover:ring-green-500/50 shadow-sm">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-1">
                                <FileText className="h-5 w-5 text-foreground group-hover:text-green-400 transition-colors" />
                            </div>
                            <CardTitle className="text-base font-semibold text-foreground leading-snug group-hover:text-green-400 transition-colors line-clamp-2">
                                {template.title}
                            </CardTitle>
                        </div>
                        <div className="text-muted-foreground hover:text-yellow-400 transition-colors shrink-0">
                            <Star className="h-4 w-4" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <CardDescription className="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
                        {template.description}
                    </CardDescription>
                </CardContent>

                {template.isPopular && (
                    <div className="px-6 pb-4">
                        <Badge className="bg-yellow-500 text-black hover:bg-yellow-600 border-0 font-medium">
                            Popular
                        </Badge>
                    </div>
                )}
            </Card>
        </Link>
    )
}

// Category Section Component for "Todos" view
function CategorySection({ category, templates }: { category: string; templates: Template[] }) {
    // Get icon for category
    const getCategoryIcon = (cat: string) => {
        switch (cat) {
            case "Digital": return "💻"
            case "Diversos": return "•••"
            case "Eleitoral": return "⭐"
            case "Empresarial": return "🏢"
            case "Família": return "👨‍👩‍👧"
            case "Penal": return "⚖️"
            case "Trabalhista": return "👷"
            case "Tributário": return "💰"
            default: return <Folder className="h-4 w-4" />
        }
    }

    return (
        <div className="space-y-4">
            {/* Category Header */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-muted-foreground">{typeof getCategoryIcon(category) === 'string' ? getCategoryIcon(category) : getCategoryIcon(category)}</span>
                    <h2 className="text-lg font-bold tracking-tight text-foreground">
                        {category}
                    </h2>
                </div>
                <p className="text-muted-foreground text-xs ml-6">
                    {templates.length} templates disponíveis
                </p>
            </div>

            {/* Template Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {templates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                ))}
            </div>
        </div>
    )
}

export default function DashboardPage() {
    const [selectedCategory, setSelectedCategory] = React.useState("Todos")
    const [searchQuery, setSearchQuery] = React.useState("")

    // Filter templates by category and search
    const filteredTemplates = React.useMemo(() => {
        let result = getTemplatesByCategory(selectedCategory)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            result = result.filter(t =>
                t.title.toLowerCase().includes(query) ||
                t.description.toLowerCase().includes(query)
            )
        }
        return result
    }, [selectedCategory, searchQuery])

    // Group templates by category for "Todos" view
    const groupedTemplates = React.useMemo(() => {
        if (selectedCategory !== "Todos" || searchQuery.trim()) {
            return null // Don't group when filtering by category or searching
        }

        const groups: Record<string, Template[]> = {}
        categories.filter(c => c !== "Todos").forEach(category => {
            const categoryTemplates = templates.filter(t => t.category === category)
            if (categoryTemplates.length > 0) {
                groups[category] = categoryTemplates
            }
        })
        return groups
    }, [selectedCategory, searchQuery])

    const templateCounts = React.useMemo(() => getTemplateCounts(), [])

    return (
        <div className="flex-1 space-y-8 p-6 md:p-8 relative min-h-full pb-20 pt-10">

            {/* Main Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Peças Jurídicas</h1>
                    <p className="text-muted-foreground mt-1">Modelos jurídicos estruturados conforme exigências legais</p>
                </div>

                <div className="relative w-full md:w-96">
                    <div className="relative">
                        <Input
                            placeholder="Procure aqui a peça desejada..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-card/50 border-input/50 pl-4 pr-16 h-11 focus-visible:ring-green-500/50 transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                            <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                <span className="text-xs">Ctrl</span>
                            </kbd>
                            <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                <span className="text-xs">K</span>
                            </kbd>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Bar - Redesigned to match reference */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Criar/Histórico Toggle - New design matching reference */}
                <div className="bg-gray-100 dark:bg-zinc-900/80 p-1.5 rounded-xl flex items-center shadow-sm border border-gray-200 dark:border-zinc-700/50">
                    <button
                        className="flex items-center gap-2 px-8 py-2.5 rounded-lg text-sm font-medium transition-all bg-green-100 dark:bg-green-600 text-green-800 dark:text-white hover:bg-green-200 dark:hover:bg-green-500"
                    >
                        <Plus className="h-4 w-4" />
                        Criar
                    </button>
                    <Link
                        href="/dashboard/history"
                        className="flex items-center gap-2 px-8 py-2.5 rounded-lg text-sm font-medium transition-all text-gray-600 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700/50"
                    >
                        <History className="h-4 w-4" />
                        Histórico
                    </Link>
                </div>

                <button className="flex items-center gap-2 text-sm text-green-500 hover:text-green-400 transition-colors">
                    <Megaphone className="h-4 w-4" />
                    Não encontrou a peça desejada? Clique aqui e sugira!
                </button>
            </div>

            {/* Filter Categories */}
            <div className="py-2">
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                                "px-4 py-2 rounded-md text-xs font-medium transition-all duration-200",
                                selectedCategory === category
                                    ? "bg-green-500 text-black shadow-md shadow-green-500/20 font-bold ring-0"
                                    : "bg-card text-card-foreground hover:bg-accent/50 hover:text-accent-foreground border border-border/50 shadow-sm"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Templates Display */}
            {groupedTemplates ? (
                // Grouped by category view for "Todos"
                <div className="space-y-12">
                    {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
                        <CategorySection
                            key={category}
                            category={category}
                            templates={categoryTemplates}
                        />
                    ))}
                </div>
            ) : (
                // Filtered view (single category or search)
                <>
                    {/* Section Header */}
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Folder className="h-5 w-5 text-muted-foreground" />
                            <h2 className="text-xl font-bold tracking-tight text-foreground">
                                {selectedCategory === "Todos" ? "Resultados da Pesquisa" : selectedCategory}
                            </h2>
                        </div>
                        <p className="text-muted-foreground text-sm ml-7">
                            {filteredTemplates.length} templates disponíveis
                        </p>
                    </div>

                    {/* Template Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredTemplates.map((template) => (
                            <TemplateCard key={template.id} template={template} />
                        ))}
                    </div>
                </>
            )}

            {/* Floating Action Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <Button
                    size="icon"
                    className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-black shadow-lg shadow-green-500/30 transition-transform hover:scale-105"
                >
                    <MessageCircle className="h-7 w-7" />
                </Button>
            </div>
        </div>
    )
}
