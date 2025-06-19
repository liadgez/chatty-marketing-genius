
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function SkeletonCard() {
  return (
    <Card className="glass-effect border-white/10 bg-black/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24 bg-white/20" />
            <Skeleton className="h-8 w-16 bg-white/20" />
            <Skeleton className="h-3 w-12 bg-white/20" />
          </div>
          <Skeleton className="w-12 h-12 rounded-lg bg-white/20" />
        </div>
      </CardContent>
    </Card>
  );
}
