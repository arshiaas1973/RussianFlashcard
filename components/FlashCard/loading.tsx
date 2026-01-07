import { Skeleton } from "../ui/skeleton";

export const FlashCardLoading = () => {
    return (
        <>
            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-row gap-3 justify-center items-center flex-wrap">
                    <Skeleton className="w-50! h-12! bg-zinc-700! animate-pulse rounded-md" />
                    <Skeleton className="w-42 h-12 bg-zinc-700! animate-pulse rounded-md" />
                </div>
                <Skeleton className="w-30 h-8 bg-zinc-700! animate-pulse rounded-md" />
                <Skeleton className="w-24 h-7 bg-zinc-700! animate-pulse rounded-md" />
                <Skeleton className="w-150 h-18 bg-zinc-700! animate-pulse rounded-md" />
            </div>
            <Skeleton className="w-40 h-9 bg-zinc-800! animate-pulse rounded-md" />
        </>
    );
}