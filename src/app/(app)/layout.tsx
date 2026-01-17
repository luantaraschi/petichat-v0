
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen w-full dark:bg-background overflow-hidden">
            <AppSidebar className="hidden lg:flex shrink-0" />
            <div className="flex flex-col h-full overflow-hidden relative flex-1 transition-all duration-300 ease-in-out">
                <AppHeader />
                <main className="flex-1 overflow-y-auto bg-muted/10 pt-16 pl-4">
                    {children}
                </main>
            </div>
        </div>
    )
}
