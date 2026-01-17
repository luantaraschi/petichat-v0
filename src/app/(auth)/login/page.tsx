"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, Loader2, Scale, Check } from "lucide-react" // Added Check, Eye, EyeOff
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox" // Assuming we have this, or simulate with div
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"

const formSchema = z.object({
    email: z.string().email({
        message: "Email inválido.",
    }),
    password: z.string().min(6, {
        message: "A senha deve ter pelo menos 6 caracteres.",
    }),
    keepConnected: z.boolean().default(false).optional(),
})

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            keepConnected: false,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        try {
            const result = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            })

            if (result?.error) {
                toast.error("Erro ao fazer login. Verifique suas credenciais.")
            } else {
                toast.success("Login realizado com sucesso!")
                router.push("/")
            }
        } catch (error) {
            toast.error("Ocorreu um erro inesperado.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = () => {
        setIsLoading(true)
        signIn("google", { callbackUrl: "/" })
    }

    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Left Column - Login Form (Dark) */}
            <div className="w-full lg:w-1/2 bg-[#020617] text-white flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32 relative">
                {/* Logo Top Left */}
                <div className="absolute top-8 left-8 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-green-500 flex items-center justify-center">
                        <Scale className="h-5 w-5 text-white" />
                    </div>
                    {/* Optional text logo if needed, screenshot shows just icon sometimes or 'PetiChat v2' */}
                </div>

                <div className="space-y-6 max-w-md w-full mx-auto">
                    <div className="space-y-1">
                        <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center mb-4 lg:hidden">
                            <Scale className="h-6 w-6 text-green-500" />
                        </div>
                        <h1 className="text-3xl font-semibold tracking-tight text-white">
                            Bem-vindo de volta, <br />
                            ao <span className="text-green-500">PetiChat</span>
                        </h1>
                        <p className="text-sm text-gray-400">
                            ENTRE COM SEU EMAIL:
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">E-mail</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=""
                                                {...field}
                                                className="bg-[#0f172a] border-gray-800 text-white focus-visible:ring-green-500 h-12"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">Senha</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder=""
                                                    {...field}
                                                    className="bg-[#0f172a] border-gray-800 text-white focus-visible:ring-green-500 h-12 pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-center justify-between">
                                <FormField
                                    control={form.control}
                                    name="keepConnected"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 text-sm">
                                            <FormControl>
                                                {/* Custom Toggle or Checkbox */}
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 border-gray-600"
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-gray-400 font-normal cursor-pointer">
                                                    Mantenha-me conectado
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-medium text-green-500 hover:text-green-400"
                                >
                                    Esqueceu a senha?
                                </Link>
                            </div>

                            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold h-12 text-base transition-all" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Entrar
                            </Button>
                        </form>
                    </Form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-800" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#020617] px-2 text-gray-500">
                                Ou
                            </span>
                        </div>
                    </div>

                    <Button variant="outline" type="button" disabled={isLoading} onClick={handleGoogleLogin} className="w-full bg-[#0f172a] border-gray-800 text-gray-300 hover:bg-[#1e293b] hover:text-white h-12">
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                        )}
                        Entrar com Google
                    </Button>

                    <div className="flex items-center justify-between pt-4">
                        <p className="text-gray-400 text-sm">Ainda não tem conta?</p>
                        <Link href="/register" className="text-green-500 hover:text-green-400 text-sm font-medium">
                            Cadastre-se
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Column - Branding (Green) */}
            <div className="hidden lg:flex w-1/2 bg-[#4ade80] items-center justify-center relative overflow-hidden text-black">
                {/* Plus Grid Pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M29 29h-8v2h8v8h2v-8h8v-2h-8v-8h-2v8z' fill='%23000000' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                }}></div>

                <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-16 w-16 rounded-2xl bg-[#020617] flex items-center justify-center shadow-2xl">
                            <Scale className="h-8 w-8 text-[#4ade80]" />
                        </div>
                        <h1 className="text-5xl font-bold tracking-tighter text-[#020617]">
                            PetiChat
                        </h1>
                    </div>
                </div>

                {/* Bottom right chat bubble decoration */}
                <div className="absolute bottom-12 right-12 h-14 w-14 bg-white rounded-full flex items-center justify-center shadow-xl animate-bounce">
                    <div className="bg-green-500 h-2 w-2 rounded-full mx-0.5" />
                    <div className="bg-green-500 h-2 w-2 rounded-full mx-0.5" />
                    <div className="bg-green-500 h-2 w-2 rounded-full mx-0.5" />
                </div>
            </div>
        </div>
    )
}
