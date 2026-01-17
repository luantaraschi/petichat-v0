import { Skeleton } from "@/components/ui/skeleton"

export default function AnalysisLoading() {
    return (
        <div className="flex h-full min-h-[calc(100vh-4rem)]">
            {/* Secondary Sidebar Skeleton */}
            <aside className="w-64 border-r border-border/50 pr-6 py-6 hidden lg:block space-y-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-3">
                        <Skeleton className="h-4 w-20" />
                        <div className="space-y-2">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                ))}
            </aside>

            {/* Main Content Area Skeleton */}
            <main className="flex-1 py-6 lg:pl-8 space-y-8">
                {/* Header Skeleton */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-96" />
                    </div>

                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <Skeleton className="h-10 w-full lg:w-80" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>

                {/* Section Skeleton */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {/* Card Skeleton */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-32 rounded-xl border border-border/50 bg-card p-6 space-y-4">
                                <div className="flex justify-between">
                                    <Skeleton className="h-10 w-10 rounded-lg" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-5 w-12 rounded-full" />
                                        <Skeleton className="h-5 w-12 rounded-full" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-48" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
