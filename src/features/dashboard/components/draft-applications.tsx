import { Button } from "@/commons/components/ui/button";
import { Card, CardContent } from "@/commons/components/ui/card";
import { Skeleton } from "@/commons/components/ui/skeleton";
import { apiClient } from "@/services/api";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { DraftApplicationCard } from "./draft-application-card";

type DraftApplication = {
  id: string;
  date: string;
  description: string;
};

function DraftApplicationSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl p-6 border">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-5 w-full" />
      <div className="flex items-center justify-end gap-2 mt-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
}

export function DraftApplications() {
  const [data, setData] = useState<DraftApplication[] | null>(null);

  useEffect(() => {
    apiClient.getDraftApplications().then(setData);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Draft Applications</h3>
        <Button variant="link" className="gap-2">
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data
          ? data.map((draft) => (
              <DraftApplicationCard key={draft.id} {...draft} />
            ))
          : Array.from({ length: 2 }).map((_, i) => (
              <DraftApplicationSkeleton key={i} />
            ))}
        <Card className="flex items-center justify-center gap-2 border-2 border-dashed bg-muted/40 hover:border-primary cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <div className="text-4xl text-muted-foreground">+</div>
            <p className="text-sm font-medium text-muted-foreground">
              Create New Application
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
