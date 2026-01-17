"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Settings, Sun, Moon, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AppHeader() {
    const { setTheme, theme } = useTheme()

    return (
        <header className="flex items-center justify-end px-6 py-3 bg-transparent absolute top-0 right-0 z-50 w-full pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
                {/* Academmy & Support Icons (Optionally included based on usual header patterns, but user asked specifically for Settings & Theme. 
                    Looking at the image crop 0_1768575199841.png, it shows:
                    [GraduationCap]? [Headphones]? [Sun/Moon] [Settings]
                    Actually the image shows: "Academmy", "Suporte", "Modo Claro", "Settings" icons?
                    Wait, let me re-examine the tiny image crop 0_1768575199841.png.
                    It shows 4 icons. 
                    1. Mortarboard/GraduationCap (Academmy)
                    2. Headphones (Suporte)
                    3. Sun (Theme)
                    4. Settings (Gear)
                    The user said: "coloque esses icones no canto superior direito... com as configurações e a opção de mudar do modo claro para escuro"
                    And "remova as configurações do menu lateral".
                    It seems they want the top right to replace those sidebar items.
                    I will include all 4 seen in the image if possible, or at least the referenced ones.
                    The user said "coloque esses icones", implying the ones in the image.
                    The image has 4 icons.
                 */}


                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Headphones className="h-5 w-5" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="text-muted-foreground hover:text-foreground"
                >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Alternar Tema</span>
                </Button>

                <Link href="/settings">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Settings className="h-5 w-5" />
                    </Button>
                </Link>
            </div>
        </header>
    )
}
