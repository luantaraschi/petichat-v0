import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
    return (
        <div className="space-y-8 relative min-h-full pb-20 pt-10">
            {/* Header Area Skeleton */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>

                <div className="w-full md:w-96">
                    <Skeleton className="h-11 w-full rounded-md" />
                </div>
            </div>

            {/* Action Bar Skeleton */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="bg-muted/30 p-1 rounded-lg flex items-center gap-1">
                    <Skeleton className="h-9 w-24 rounded-md" />
                    <Skeleton className="h-9 w-28 rounded-md" />
                </div>

                <Skeleton className="h-4 w-64" />
            </div>

            {/* Categories Skeleton */}
            <div className="py-2">
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-24 rounded-md" />
                    ))}
                </div>
            </div>

            {/* Section Header Skeleton */}
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="h-4 w-24 ml-7" />
            </div>

            {/* Template Grid Skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-[200px] rounded-xl border border-border/50 bg-card p-6 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                                <Skeleton className="h-5 w-5 rounded-sm" />
                                <Skeleton className="h-5 w-40" />
                            </div>
                            <Skeleton className="h-4 w-4 rounded-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-[90%]" />
                            <Skeleton className="h-4 w-[60%]" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
