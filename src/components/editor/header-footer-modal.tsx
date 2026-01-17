"use client"

import { useState, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Type, Minus, Plus, MoreHorizontal, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeaderFooterModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (config: HeaderFooterConfig) => void
    initialConfig?: HeaderFooterConfig
    initialTab?: 'header' | 'footer'
    initialContentType?: 'image' | 'text'
}

export interface HeaderFooterConfig {
    header: {
        type: 'image' | 'text' | null
        content: string
        fontSize: number
    }
    footer: {
        type: 'image' | 'text' | null
        content: string
        fontSize: number
    }
}

export function HeaderFooterModal({
    isOpen,
    onClose,
    onSave,
    initialConfig,
    initialTab = 'header',
    initialContentType = 'text'
}: HeaderFooterModalProps) {
    const [activeTab, setActiveTab] = useState<'header' | 'footer'>(initialTab)
    const [contentType, setContentType] = useState<'image' | 'text'>(initialContentType)
    const [fontSize, setFontSize] = useState(14)
    const [headerText, setHeaderText] = useState(initialConfig?.header.content || '')
    const [footerText, setFooterText] = useState(initialConfig?.footer.content || '')
    const [headerImage, setHeaderImage] = useState<string | null>(null)
    const [footerImage, setFooterImage] = useState<string | null>(null)

    const handleSave = () => {
        const config: HeaderFooterConfig = {
            header: {
                type: contentType,
                content: activeTab === 'header' ? (contentType === 'text' ? headerText : (headerImage || '')) : headerText,
                fontSize
            },
            footer: {
                type: contentType,
                content: activeTab === 'footer' ? (contentType === 'text' ? footerText : (footerImage || '')) : footerText,
                fontSize
            }
        }
        onSave(config)
        onClose()
    }

    const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const result = event.target?.result as string
                if (activeTab === 'header') {
                    setHeaderImage(result)
                } else {
                    setFooterImage(result)
                }
            }
            reader.readAsDataURL(file)
        }
    }, [activeTab])

    const currentImage = activeTab === 'header' ? headerImage : footerImage

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Configurar Cabeçalho e Rodapé</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        Personalize suas peças com imagens de textos no cabeçalho e no rodapé
                    </p>
                </DialogHeader>

                {/* Tabs: Cabeçalho / Rodapé */}
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'header' | 'footer')}>
                    <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
                        <TabsTrigger
                            value="header"
                            className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400"
                        >
                            Cabeçalho
                        </TabsTrigger>
                        <TabsTrigger
                            value="footer"
                            className="data-[state=active]:bg-slate-200 dark:data-[state=active]:bg-slate-700"
                        >
                            Rodapé
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="header" className="mt-4 space-y-4">
                        {/* Content Type Selection */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setContentType('image')}
                                className={cn(
                                    "flex items-start gap-3 p-4 rounded-lg border transition-colors text-left",
                                    contentType === 'image'
                                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                                        : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                )}
                            >
                                <div className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5",
                                    contentType === 'image' ? "border-emerald-500" : "border-slate-300 dark:border-slate-600"
                                )}>
                                    {contentType === 'image' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
                                </div>
                                <div>
                                    <span className="font-medium">Imagem</span>
                                    <p className="text-sm text-muted-foreground">Insira uma imagem no cabeçalho</p>
                                </div>
                            </button>

                            <button
                                onClick={() => setContentType('text')}
                                className={cn(
                                    "flex items-start gap-3 p-4 rounded-lg border transition-colors text-left",
                                    contentType === 'text'
                                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                                        : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                )}
                            >
                                <div className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5",
                                    contentType === 'text' ? "border-emerald-500" : "border-slate-300 dark:border-slate-600"
                                )}>
                                    {contentType === 'text' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
                                </div>
                                <div>
                                    <span className="font-medium">Texto</span>
                                    <p className="text-sm text-muted-foreground">Insira um texto no cabeçalho</p>
                                </div>
                            </button>
                        </div>

                        {/* Content Input */}
                        {contentType === 'text' ? (
                            <div className="space-y-3">
                                {/* Font Controls */}
                                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg w-fit">
                                    <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-sm">
                                        <Type className="h-4 w-4" />
                                        Arial
                                    </Button>
                                    <div className="w-px h-5 bg-slate-300 dark:bg-slate-600" />
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFontSize(Math.max(8, fontSize - 1))}>
                                        <Minus className="h-3.5 w-3.5" />
                                    </Button>
                                    <span className="text-sm w-6 text-center tabular-nums">{fontSize}</span>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFontSize(Math.min(72, fontSize + 1))}>
                                        <Plus className="h-3.5 w-3.5" />
                                    </Button>
                                    <div className="w-px h-5 bg-slate-300 dark:bg-slate-600" />
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>

                                {/* Text Area */}
                                <Textarea
                                    value={headerText}
                                    onChange={(e) => setHeaderText(e.target.value)}
                                    placeholder="Digite o texto do cabeçalho..."
                                    className="min-h-[150px] resize-none bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                    style={{ fontSize: `${fontSize}px` }}
                                />
                            </div>
                        ) : (
                            /* Image Upload */
                            <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors min-h-[180px]">
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                                {currentImage ? (
                                    <img src={currentImage} alt="Preview" className="max-h-32 object-contain" />
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                            <Upload className="h-5 w-5 text-slate-500" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-medium">Envie um arquivo</p>
                                            <p className="text-sm text-muted-foreground">Arraste e solte ou clique para fazer upload</p>
                                        </div>
                                    </>
                                )}
                            </label>
                        )}
                    </TabsContent>

                    <TabsContent value="footer" className="mt-4 space-y-4">
                        {/* Same structure as header */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setContentType('image')}
                                className={cn(
                                    "flex items-start gap-3 p-4 rounded-lg border transition-colors text-left",
                                    contentType === 'image'
                                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                                        : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                )}
                            >
                                <div className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5",
                                    contentType === 'image' ? "border-emerald-500" : "border-slate-300 dark:border-slate-600"
                                )}>
                                    {contentType === 'image' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
                                </div>
                                <div>
                                    <span className="font-medium">Imagem</span>
                                    <p className="text-sm text-muted-foreground">Insira uma imagem no rodapé</p>
                                </div>
                            </button>

                            <button
                                onClick={() => setContentType('text')}
                                className={cn(
                                    "flex items-start gap-3 p-4 rounded-lg border transition-colors text-left",
                                    contentType === 'text'
                                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                                        : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                )}
                            >
                                <div className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5",
                                    contentType === 'text' ? "border-emerald-500" : "border-slate-300 dark:border-slate-600"
                                )}>
                                    {contentType === 'text' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
                                </div>
                                <div>
                                    <span className="font-medium">Texto</span>
                                    <p className="text-sm text-muted-foreground">Insira um texto no rodapé</p>
                                </div>
                            </button>
                        </div>

                        {contentType === 'text' ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg w-fit">
                                    <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-sm">
                                        <Type className="h-4 w-4" />
                                        Arial
                                    </Button>
                                    <div className="w-px h-5 bg-slate-300 dark:bg-slate-600" />
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFontSize(Math.max(8, fontSize - 1))}>
                                        <Minus className="h-3.5 w-3.5" />
                                    </Button>
                                    <span className="text-sm w-6 text-center tabular-nums">{fontSize}</span>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFontSize(Math.min(72, fontSize + 1))}>
                                        <Plus className="h-3.5 w-3.5" />
                                    </Button>
                                    <div className="w-px h-5 bg-slate-300 dark:bg-slate-600" />
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>

                                <Textarea
                                    value={footerText}
                                    onChange={(e) => setFooterText(e.target.value)}
                                    placeholder="Digite o texto do rodapé..."
                                    className="min-h-[150px] resize-none bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                    style={{ fontSize: `${fontSize}px` }}
                                />
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors min-h-[180px]">
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                                {currentImage ? (
                                    <img src={currentImage} alt="Preview" className="max-h-32 object-contain" />
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                            <Upload className="h-5 w-5 text-slate-500" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-medium">Envie um arquivo</p>
                                            <p className="text-sm text-muted-foreground">Arraste e solte ou clique para fazer upload</p>
                                        </div>
                                    </>
                                )}
                            </label>
                        )}
                    </TabsContent>
                </Tabs>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                        Salvar Alterações
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
