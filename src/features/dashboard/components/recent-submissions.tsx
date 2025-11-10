import { Button } from "@/commons/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/commons/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/commons/components/ui/table";
import { Skeleton } from "@/commons/components/ui/skeleton";
import { apiClient } from "@/services/api";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmissionRow } from "./submission-row";

type Submission = {
  id: string;
  applicationName: string;
  date: string;
  status: "Approved" | "Pending Approval" | "Rejected";
  updatedBy: string;
};

function SubmissionSkeletonRow() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-6 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-28" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-20" />
      </TableCell>
    </TableRow>
  );
}

export function RecentSubmissions() {
  const [data, setData] = useState<Submission[] | null>(null);

  useEffect(() => {
    apiClient.getRecentSubmissions().then(setData);
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Submissions</CardTitle>
        <Button variant="outline" className="gap-2">
          <MoreHorizontal className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application ID</TableHead>
              <TableHead>Application Name</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data === null ? (
              Array.from({ length: 5 }).map((_, i) => (
                <SubmissionSkeletonRow key={i} />
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((submission) => (
                <SubmissionRow key={submission.id} {...submission} />
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
