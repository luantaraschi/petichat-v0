"use client"

import { useState, useEffect } from "react"
import { Search, Plus, History, ChevronDown, ArrowUpDown, MoreHorizontal, Eye, Trash2, Folder, FileText, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2 } from "lucide-react"
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
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Piece {
    id: string
    title: string | null
    status: string
    createdAt: string
    template: {
        title: string
        category: string
    }
}

export default function HistoryPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")
    const [areaFilter, setAreaFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [pieces, setPieces] = useState<Piece[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    // Fetch pieces from API
    useEffect(() => {
        async function fetchPieces() {
            setIsLoading(true)
            try {
                const params = new URLSearchParams({
                    page: currentPage.toString(),
                    limit: rowsPerPage.toString(),
                })

                if (searchQuery) params.set('search', searchQuery)
                if (statusFilter !== 'all') params.set('status', statusFilter)

                const response = await fetch(`/api/pieces?${params}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch pieces')
                }

                const data = await response.json()
                setPieces(data.pieces || [])
                setTotalPages(data.totalPages || 1)
                setTotal(data.total || 0)
            } catch (error) {
                console.error('Error fetching pieces:', error)
                toast.error('Erro ao carregar peças')
            } finally {
                setIsLoading(false)
            }
        }

        fetchPieces()
    }, [currentPage, rowsPerPage, searchQuery, statusFilter])

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: ptBR })
        } catch {
            return dateString
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return { label: 'Finalizada', className: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700' }
            case 'draft':
                return { label: 'Rascunho', className: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700' }
            case 'generating':
                return { label: 'Gerando', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700' }
            default:
                return { label: status, className: 'bg-gray-50 text-gray-700 border-gray-200' }
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/pieces/${id}`, { method: 'DELETE' })
            if (response.ok) {
                setPieces(pieces.filter(p => p.id !== id))
                toast.success("Peça excluída com sucesso!")
            } else {
                toast.error("Erro ao excluir peça")
            }
        } catch (error) {
            toast.error("Erro ao excluir peça")
        }
    }

    return (
        <div className="p-6 md:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Histórico de Peças Jurídicas</h1>
                    <p className="text-muted-foreground text-sm">
                        {total > 0 ? `${total} peça(s) encontrada(s)` : 'Histórico de peças jurídicas criadas'}
                    </p>
                </div>
                <div className="w-72">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="search-history"
                            name="search"
                            placeholder="Buscar histórico de peças..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Tabs and Help Link */}
            <div className="flex items-center justify-between">
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
                    <label htmlFor="status-filter" className="text-xs text-muted-foreground">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger id="status-filter" className="w-40">
                            <SelectValue placeholder="Todos os status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos os status</SelectItem>
                            <SelectItem value="completed">Finalizada</SelectItem>
                            <SelectItem value="draft">Rascunho</SelectItem>
                            <SelectItem value="generating">Gerando</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <label htmlFor="type-filter" className="text-xs text-muted-foreground">Tipo</label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger id="type-filter" className="w-40">
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
                    <label htmlFor="area-filter" className="text-xs text-muted-foreground">Área</label>
                    <Select value={areaFilter} onValueChange={setAreaFilter}>
                        <SelectTrigger id="area-filter" className="w-40">
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
                            <TableHead>Modelo</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span className="text-muted-foreground">Carregando...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : pieces.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                    <div className="space-y-2">
                                        <p>Nenhuma peça encontrada.</p>
                                        <Link href="/dashboard">
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <Plus className="h-4 w-4" />
                                                Criar nova peça
                                            </Button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            pieces.map((piece) => {
                                const statusBadge = getStatusBadge(piece.status)
                                return (
                                    <TableRow key={piece.id}>
                                        <TableCell>
                                            <Link
                                                href={`/editor/${piece.id}`}
                                                className="flex items-center gap-2 hover:text-green-600 transition-colors"
                                            >
                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium hover:underline">
                                                    {piece.title || piece.template.title}
                                                </span>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {formatDate(piece.createdAt)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={statusBadge.className}>
                                                {piece.status === 'completed' && '✓ '}
                                                {statusBadge.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground max-w-[200px] truncate">
                                            {piece.template.title}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Folder className="h-4 w-4" />
                                                {piece.template.category}
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
                                                        <Link href={`/editor/${piece.id}`} className="flex items-center gap-2">
                                                            <Eye className="h-4 w-4" />
                                                            Ver peça
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-red-600 focus:text-red-600"
                                                        onClick={() => handleDelete(piece.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Excluir
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end gap-6">
                <div className="flex items-center gap-2">
                    <label htmlFor="rows-per-page" className="text-sm text-muted-foreground">Linhas por Página</label>
                    <Select value={rowsPerPage.toString()} onValueChange={(v) => setRowsPerPage(Number(v))}>
                        <SelectTrigger id="rows-per-page" className="w-16 h-8">
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
