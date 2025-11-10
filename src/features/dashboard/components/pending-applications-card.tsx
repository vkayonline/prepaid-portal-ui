import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/commons/components/ui/card";
import { Skeleton } from "@/commons/components/ui/skeleton";
import { apiClient } from "@/services/api";
import { useEffect, useState } from "react";

type PendingApplicationsData = {
  count: number;
  totalRecords: number;
};

export function PendingApplicationsCard() {
  const [data, setData] = useState<PendingApplicationsData | null>(null);

  useEffect(() => {
    apiClient.getPendingApplications().then(setData);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardDescription>Applications Pending Approval</CardDescription>
        {data ? (
          <CardTitle className="text-3xl font-bold">{data.count}</CardTitle>
        ) : (
          <Skeleton className="h-9 w-12" />
        )}
      </CardHeader>
      <CardContent>
        {data ? (
          <p className="text-sm text-muted-foreground">
            Total records: {data.totalRecords}
          </p>
        ) : (
          <Skeleton className="h-4 w-24" />
        )}
      </CardContent>
    </Card>
  );
}
