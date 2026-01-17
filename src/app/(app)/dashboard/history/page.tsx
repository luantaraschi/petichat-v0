"use client"

import { useState } from "react"
import { Search, Plus, History, ChevronDown, ArrowUpDown, MoreHorizontal, Eye, Trash2, Folder, FileText, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { toast } from "sonner"

// Mock data for demonstration
const mockPetitions = [
    {
        id: "1",
        name: "Atropelamento com Fraturas Bilaterais",
        createdAt: "16/01/2026 15:37",
        status: "Finalizada",
        type: "Abertura de Processo Adminis...",
        area: "Administrativo",
    },
    {
        id: "2",
        name: "Atropelamento Pedestre: Indenização Devida",
        createdAt: "15/01/2026 18:19",
        status: "Finalizada",
        type: "Abertura de Processo Adminis...",
        area: "Administrativo",
    },
    {
        id: "3",
        name: "Recurso Administrativo - Multa de Trânsito",
        createdAt: "14/01/2026 10:45",
        status: "Rascunho",
        type: "Recurso Administrativo",
        area: "Trânsito",
    },
    {
        id: "4",
        name: "Petição Inicial - Danos Morais",
        createdAt: "12/01/2026 09:30",
        status: "Finalizada",
        type: "Petição Inicial",
        area: "Cível",
    },
]

export default function HistoryPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")
    const [areaFilter, setAreaFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [activeTab, setActiveTab] = useState<"criar" | "historico">("historico")

    const filteredPetitions = mockPetitions.filter((petition) => {
        const matchesSearch = petition.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || petition.status.toLowerCase() === statusFilter
        const matchesType = typeFilter === "all" || petition.type.toLowerCase().includes(typeFilter)
        const matchesArea = areaFilter === "all" || petition.area.toLowerCase() === areaFilter
        return matchesSearch && matchesStatus && matchesType && matchesArea
    })

    const totalPages = Math.ceil(filteredPetitions.length / rowsPerPage)
    const paginatedPetitions = filteredPetitions.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

    const handleDelete = (id: string) => {
        toast.success("Peça excluída com sucesso!")
    }

    return (
        <div className="p-6 md:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Histórico de Peças Jurídicas</h1>
                    <p className="text-muted-foreground text-sm">Histórico de peças jurídicas criadas</p>
                </div>
                <div className="w-72">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar histórico de peças..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Tabs and Help Link - Matching dashboard design */}
            <div className="flex items-center justify-between">
                {/* Criar/Histórico Toggle - Same design as dashboard */}
                <div className="bg-gray-100 dark:bg-zinc-900/80 p-1.5 rounded-xl flex items-center shadow-sm border border-gray-200 dark:border-zinc-700/50">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-8 py-2.5 rounded-lg text-sm font-medium transition-all text-gray-600 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700/50"
                    >
                        <Plus className="h-4 w-4" />
                        Criar
                    </Link>
                    <button
                        className="flex items-center gap-2 px-8 py-2.5 rounded-lg text-sm font-medium transition-all bg-green-100 dark:bg-green-600 text-green-800 dark:text-white hover:bg-green-200 dark:hover:bg-green-500 border border-green-200 dark:border-transparent"
                    >
                        <History className="h-4 w-4" />
                        Histórico
                    </button>
                </div>
                <Button variant="link" className="text-green-600 hover:text-green-700">
                    <span className="mr-1">💡</span>
                    Não encontrou a peça desejada? Clique aqui e sugira!
                </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Todos os status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos os status</SelectItem>
                            <SelectItem value="finalizada">Finalizada</SelectItem>
                            <SelectItem value="rascunho">Rascunho</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Tipo</label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Todos os tipos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos os tipos</SelectItem>
                            <SelectItem value="abertura">Abertura de Processo</SelectItem>
                            <SelectItem value="recurso">Recurso</SelectItem>
                            <SelectItem value="petição">Petição Inicial</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Área</label>
                    <Select value={areaFilter} onValueChange={setAreaFilter}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Todas as áreas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas as áreas</SelectItem>
                            <SelectItem value="administrativo">Administrativo</SelectItem>
                            <SelectItem value="cível">Cível</SelectItem>
                            <SelectItem value="trânsito">Trânsito</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-[300px]">
                                <Button variant="ghost" size="sm" className="h-8 gap-1 -ml-3">
                                    Nome
                                    <ArrowUpDown className="h-3 w-3" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" size="sm" className="h-8 gap-1 -ml-3">
                                    Data de Criação
                                    <ArrowUpDown className="h-3 w-3" />
                                </Button>
                            </TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Tipos</TableHead>
                            <TableHead>Área</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedPetitions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                    Nenhuma peça encontrada.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedPetitions.map((petition) => (
                                <TableRow key={petition.id}>
                                    <TableCell>
                                        <Link
                                            href={`/editor/${petition.id}`}
                                            className="flex items-center gap-2 hover:text-green-600 transition-colors"
                                        >
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium hover:underline">{petition.name}</span>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {petition.createdAt}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                petition.status === "Finalizada"
                                                    ? "bg-green-50 text-green-700 border-green-200"
                                                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                            }
                                        >
                                            {petition.status === "Finalizada" && "✓ "}
                                            {petition.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground max-w-[200px] truncate">
                                        {petition.type}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Folder className="h-4 w-4" />
                                            {petition.area}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/editor/${petition.id}`} className="flex items-center gap-2">
                                                        <Eye className="h-4 w-4" />
                                                        Ver peça
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-600 focus:text-red-600"
                                                    onClick={() => handleDelete(petition.id)}
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Excluir
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end gap-6">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Linhas por Página</span>
                    <Select value={rowsPerPage.toString()} onValueChange={(v) => setRowsPerPage(Number(v))}>
                        <SelectTrigger className="w-16 h-8">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">
                        Página {currentPage} de {totalPages || 1}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
