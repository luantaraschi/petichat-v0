"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import {
    BadgeCheck,
    GraduationCap,
    Sun,
    Moon,
    Headphones,
    LifeBuoy,
    Bot,
    ChevronUp,
    FileSignature,
    FileText,
    LayoutGrid,
    LogOut,
    MessageSquare,
    Mic,
    PenTool,
    Scale,
    Settings,
    User,
    Sparkles,
    PanelLeftClose,
    PanelLeft
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function AppSidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    const { setTheme, theme } = useTheme()
    const [isCollapsed, setIsCollapsed] = React.useState(false)

    // Load collapsed state from localStorage
    React.useEffect(() => {
        const stored = localStorage.getItem("sidebar-collapsed")
        if (stored !== null) {
            setIsCollapsed(stored === "true")
        }
    }, [])

    // Save collapsed state to localStorage
    const toggleCollapsed = () => {
        const newState = !isCollapsed
        setIsCollapsed(newState)
        localStorage.setItem("sidebar-collapsed", String(newState))
    }

    const NavButton = ({ href, icon: Icon, label, badge, disabled }: {
        href?: string
        icon: React.ElementType
        label: string
        badge?: { text: string; variant?: "new" | "soon" }
        disabled?: boolean
    }) => {
        const isActive = href ? pathname === href : false
        const content = (
            <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                    "w-full transition-all duration-300 ease-in-out",
                    isCollapsed ? "justify-center px-2" : "justify-start",
                    isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                        : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                    disabled && "cursor-not-allowed opacity-70"
                )}
            >
                <Icon className={cn(
                    "h-4 w-4 shrink-0 transition-all duration-300 ease-in-out",
                    !isCollapsed && "mr-3",
                    badge?.variant === "new" && "text-green-400"
                )} />
                {!isCollapsed && (
                    <>
                        {label}
                        {badge && (
                            <Badge
                                className={cn(
                                    "ml-auto text-[10px] h-5 px-1.5",
                                    badge.variant === "new"
                                        ? "bg-green-500/20 text-green-400 border-0"
                                        : "opacity-70"
                                )}
                                variant={badge.variant === "soon" ? "secondary" : undefined}
                            >
                                {badge.text}
                            </Badge>
                        )}
                    </>
                )}
            </Button>
        )

        if (isCollapsed) {
            return (
                <Tooltip>
                    <TooltipTrigger asChild>
                        {href ? <Link href={href}>{content}</Link> : content}
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        {label}
                        {badge && ` (${badge.text})`}
                    </TooltipContent>
                </Tooltip>
            )
        }

        return href ? <Link href={href}>{content}</Link> : content
    }

    return (
        <TooltipProvider delayDuration={0}>
            <div className={cn(
                "flex flex-col h-screen text-sidebar-foreground bg-sidebar border-r border-sidebar-border sticky top-0 transition-all duration-300 ease-in-out",
                isCollapsed ? "w-16" : "w-64",
                className
            )}>
                {/* Header with Toggle */}
                <div className={cn(
                    "p-4 flex items-center justify-between transition-all duration-300 ease-in-out",
                    isCollapsed ? "px-2 flex-col gap-2" : "p-4"
                )}>
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="h-8 w-8 rounded-lg bg-green-500 flex items-center justify-center shadow-lg shadow-green-900/20 shrink-0 transition-all duration-300">
                            <Scale className="h-5 w-5 text-white" />
                        </div>
                        <span className={cn(
                            "text-xl font-bold tracking-tight bg-gradient-to-r from-sidebar-foreground to-sidebar-foreground/60 bg-clip-text text-transparent whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden",
                            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                        )}>
                            PetiChat
                        </span>
                    </Link>

                    {/* Toggle Button */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleCollapsed}
                                className="h-8 w-8 shrink-0"
                            >
                                {isCollapsed ? (
                                    <PanelLeft className="h-4 w-4" />
                                ) : (
                                    <PanelLeftClose className="h-4 w-4" />
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {isCollapsed ? "Expandir menu" : "Recolher menu"}
                        </TooltipContent>
                    </Tooltip>
                </div>

                {/* Scrollable Menu */}
                <ScrollArea className="flex-1 px-2">
                    <div className="space-y-6 pb-6">

                        {/* Início Group */}
                        <div>
                            {!isCollapsed && (
                                <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-sidebar-foreground/50 tracking-wider">
                                    Início
                                </h3>
                            )}
                            <div className="space-y-1">
                                <NavButton href="/" icon={LayoutGrid} label="Início" />
                                <NavButton icon={Sparkles} label="GPT" badge={{ text: "Novo", variant: "new" }} />
                                <NavButton icon={MessageSquare} label="PetiChat no WhatsApp" />
                            </div>
                        </div>

                        {/* Principal Group */}
                        <div>
                            {!isCollapsed && (
                                <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-sidebar-foreground/50 tracking-wider">
                                    Principal
                                </h3>
                            )}
                            <div className="space-y-1">
                                <NavButton href="/dashboard" icon={FileText} label="Peças Jurídicas" />
                                <NavButton href="/rewrite" icon={PenTool} label="Reescrever Textos" />
                                <NavButton icon={FileSignature} label="Contratos" badge={{ text: "Em breve", variant: "soon" }} disabled />
                            </div>
                        </div>

                        {/* Complementar Group */}
                        <div>
                            {!isCollapsed && (
                                <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-sidebar-foreground/50 tracking-wider">
                                    Complementar
                                </h3>
                            )}
                            <div className="space-y-1">
                                <NavButton href="/jurisprudence" icon={Scale} label="Jurisprudências" />
                                <NavButton icon={Mic} label="Transcrição de Mídia" />
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                {/* Footer User Profile */}
                <div className="p-2 border-t border-sidebar-border mt-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            {isCollapsed ? (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" className="w-full h-auto py-2 px-2 flex justify-center hover:bg-sidebar-accent text-sidebar-foreground/90" suppressHydrationWarning>
                                            <Avatar className="h-8 w-8 border border-sidebar-border">
                                                <AvatarFallback className="bg-green-600 text-white text-xs">LT</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        Luan Taraschi
                                    </TooltipContent>
                                </Tooltip>
                            ) : (
                                <Button variant="ghost" className="w-full h-auto py-3 px-2 flex justify-start gap-3 hover:bg-sidebar-accent text-sidebar-foreground/90" suppressHydrationWarning>
                                    <Avatar className="h-9 w-9 border border-sidebar-border">
                                        <AvatarFallback className="bg-green-600 text-white">LT</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-start text-sm truncate max-w-[140px]">
                                        <span className="font-medium truncate">Luan Taraschi</span>
                                        <span className="text-xs text-sidebar-foreground/60 truncate">luantaraschi@gmail.com</span>
                                    </div>
                                    <ChevronUp className="ml-auto h-4 w-4 text-sidebar-foreground/50" />
                                </Button>
                            )}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 mb-2 p-2 bg-popover border-border text-popover-foreground" align="start" forceMount side="top">
                            <div className="px-2 py-1.5 text-sm">
                                <div className="font-semibold">Luan Taraschi</div>
                                <div className="text-xs text-muted-foreground truncate">luantaraschi@gmail.com</div>
                            </div>
                            <DropdownMenuSeparator className="bg-border" />

                            <DropdownMenuItem className="focus:bg-green-500/10 focus:text-green-500 cursor-pointer">
                                <BadgeCheck className="mr-2 h-4 w-4" />
                                <span>Conta</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="focus:bg-green-500/10 focus:text-green-500 cursor-pointer">
                                <GraduationCap className="mr-2 h-4 w-4" />
                                <span>Academmy</span>
                            </DropdownMenuItem>


                            <DropdownMenuSeparator className="bg-border" />

                            <Link href="/api/auth/signout">
                                <DropdownMenuItem className="text-muted-foreground focus:text-foreground focus:bg-red-500/10 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" /> Sair
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </TooltipProvider>
    )
}
