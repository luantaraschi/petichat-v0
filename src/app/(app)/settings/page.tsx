"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Upload, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function SettingsPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10 p-6 md:p-8">
            {/* Header */}
            <div className="space-y-4">
                <div>
                    <h1 className="text-2xl font-bold">Perfil</h1>
                    <p className="text-muted-foreground">Gerencie suas informações pessoais e configurações</p>
                </div>
                <Button className="bg-secondary/50 text-secondary-foreground hover:bg-secondary/70 border-0">
                    <User className="mr-2 h-4 w-4" /> Minha Conta
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start">

                {/* Left Column Description */}
                <div className="space-y-1 md:sticky md:top-24">
                    <h2 className="text-lg font-semibold">Informações Pessoais</h2>
                    <p className="text-sm text-muted-foreground">Atualize suas informações pessoais</p>
                </div>

                {/* Right Column Content */}
                <div className="space-y-8">
                    {/* Personal Info Card */}
                    <Card className="bg-card border-border">
                        <CardContent className="p-6 space-y-6">
                            {/* Avatar Section */}
                            <div className="flex items-center gap-6">
                                <Avatar className="h-24 w-24">
                                    <AvatarFallback className="text-2xl bg-muted text-muted-foreground">LT</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <Button variant="secondary" className="bg-green-500 hover:bg-green-600 text-black font-semibold h-9 px-4 text-sm">
                                        Alterar foto
                                    </Button>
                                    <p className="text-xs text-muted-foreground">JPG, PNG, Max 1MB</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Primeiro Nome</Label>
                                    <Input id="firstName" defaultValue="Luan" className="bg-muted/50 border-input" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Sobrenome</Label>
                                    <Input id="lastName" defaultValue="Taraschi" className="bg-muted/50 border-input" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input id="email" defaultValue="luantaraschi@gmail.com" className="bg-muted/50 border-input" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="whatsapp">WhatsApp</Label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-2.5">
                                            {/* Brazil Flag Icon Mock */}
                                            <span className="text-lg">🇧🇷</span>
                                        </div>
                                        <Input id="whatsapp" defaultValue="(71) 98467-5555" className="pl-10 bg-muted/50 border-input" />
                                        <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-yellow-500" />
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground">Número não validado.</span>
                                        <button className="text-muted-foreground underline hover:text-foreground">Clique aqui para validar.</button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="oab">OAB</Label>
                                        <span className="text-xs text-muted-foreground border border-border px-1.5 py-0.5 rounded-full">Opcional</span>
                                    </div>
                                    <Input id="oab" placeholder="Digite seu número de OAB" className="bg-muted/50 border-input placeholder:text-muted-foreground/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cpf">CPF/CNPJ</Label>
                                    <Input id="cpf" placeholder="Digite seu CPF/CNPJ" className="bg-muted/50 border-input placeholder:text-muted-foreground/50" />
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold">Editar</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start pt-4">
                <div className="space-y-1 md:sticky md:top-24">
                    <h2 className="text-lg font-semibold">Dados de atuação</h2>
                    <p className="text-sm text-muted-foreground">Atualize suas informações de atuação</p>
                </div>

                <div className="space-y-8">
                    <Card className="bg-card border-border">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="officeName">Nome do escritório</Label>
                                    <span className="text-xs text-muted-foreground border border-border px-1.5 py-0.5 rounded-full">Opcional</span>
                                </div>
                                <Input id="officeName" placeholder="Digite o nome do seu escritório" className="bg-muted/50 border-input placeholder:text-muted-foreground/50" />
                            </div>

                            <div className="space-y-2">
                                <Label>Logomarca do seu escritório</Label>
                                <div className="border-2 border-dashed border-border rounded-lg p-10 flex flex-col items-center justify-center text-center space-y-4 hover:bg-muted/10 transition-colors cursor-pointer">
                                    <div className="bg-muted/20 p-3 rounded-xl">
                                        <Upload className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Clique para fazer upload <span className="text-muted-foreground font-normal">ou arraste e solte</span></p>
                                        <p className="text-xs text-muted-foreground">SVG, PNG ou JPG (MAX. 800x400px)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="footer">Rodapé</Label>
                                    <span className="text-xs text-muted-foreground border border-border px-1.5 py-0.5 rounded-full">Opcional</span>
                                </div>
                                <Input id="footer" placeholder="Av. Amintas Barros, 1234 - Centro - São Paulo/SP" className="bg-muted/50 border-input placeholder:text-muted-foreground/50" />
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold">Editar</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start pt-4">
                <div className="space-y-1 md:sticky md:top-24">
                    <h2 className="text-lg font-semibold">Mude a sua senha</h2>
                    <p className="text-sm text-muted-foreground">Atualize sua senha associada com sua conta.</p>
                </div>

                <div className="space-y-8">
                    <Card className="bg-card border-border">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Senha Atual</Label>
                                <div className="relative">
                                    <Input
                                        id="currentPassword"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Senha Atual"
                                        className="bg-muted/50 border-input pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword">Nova Senha</Label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Digite aqui a sua senha"
                                        className="bg-muted/50 border-input pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirme a nova senha</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="********"
                                        className="bg-muted/50 border-input pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button className="bg-[#4ade80]/20 hover:bg-[#4ade80]/30 text-[#4ade80] font-medium border border-[#4ade80]/20">Salvar</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
