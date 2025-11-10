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

type BalanceData = {
  balance: number;
  lastUpdated: string;
};

export function BalanceCard() {
  const [data, setData] = useState<BalanceData | null>(null);

  useEffect(() => {
    apiClient.getBalance().then(setData);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardDescription>Available Balance</CardDescription>
        {data ? (
          <CardTitle className="text-3xl font-bold">
            ${data.balance.toLocaleString()}
          </CardTitle>
        ) : (
          <Skeleton className="h-9 w-48" />
        )}
      </CardHeader>
      <CardContent>
        {data ? (
          <p className="text-sm text-muted-foreground">
            Last updated: {data.lastUpdated}
          </p>
        ) : (
          <Skeleton className="h-4 w-32" />
        )}
      </CardContent>
    </Card>
  );
}
