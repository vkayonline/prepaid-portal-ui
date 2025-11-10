import { Button } from "@/commons/components/ui/button";
import { Input } from "@/commons/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/commons/components/ui/pagination";
import { Skeleton } from "@/commons/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/commons/components/ui/table";
import { apiClient } from "@/services/api";
import { cn } from "@/commons/lib/utils";
import { Filter, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Application = {
  id: string;
  applicationName: string;
  date: string;
  status: "Approved" | "Pending Approval" | "Rejected";
  updatedBy: string;
};

const statusColors = {
  Approved: "bg-green-500",
  "Pending Approval": "bg-yellow-500",
  Rejected: "bg-red-500",
};

function ApplicationRow({
  id,
  applicationName,
  date,
  status,
  updatedBy,
}: Application) {
  return (
    <TableRow>
      <TableCell>
        <Button variant="link" className="px-0">
          {id}
        </Button>
      </TableCell>
      <TableCell>{applicationName}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        <div className="inline-flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-full", statusColors[status])} />
          <span>{status}</span>
        </div>
      </TableCell>
      <TableCell>{updatedBy}</TableCell>
    </TableRow>
  );
}

function ApplicationSkeletonRow() {
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

const ITEMS_PER_PAGE = 5;

export function ApplicationsTable() {
  const [data, setData] = useState<Application[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    apiClient.getApplications().then(setData);
  }, []);

  const { currentData, totalPages } = useMemo(() => {
    if (!data) return { currentData: [], totalPages: 0 };
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return { currentData: data.slice(startIndex, endIndex), totalPages };
  }, [data, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const startResult = data ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const endResult = data ? Math.min(currentPage * ITEMS_PER_PAGE, data.length) : 0;

  return (
    <div className="mt-6 bg-card rounded-lg border">
      <div className="flex justify-between items-center gap-2 p-4 border-b">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="w-full pl-9"
            placeholder="Search by Application Name or ID..."
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>
      <div className="px-4">
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
              Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                <ApplicationSkeletonRow key={i} />
              ))
            ) : currentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((app) => <ApplicationRow key={app.id} {...app} />)
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between p-4">
        <p className="text-sm text-muted-foreground whitespace-nowrap">
          {data && data.length > 0
            ? `Showing ${startResult} to ${endResult} of ${data.length} results`
            : "No results"}
        </p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
