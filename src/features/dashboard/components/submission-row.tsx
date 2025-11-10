import { Button } from "@/commons/components/ui/button";
import { TableCell, TableRow } from "@/commons/components/ui/table";
import { cn } from "@/commons/lib/utils";

type Submission = {
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

export function SubmissionRow({
  id,
  applicationName,
  date,
  status,
  updatedBy,
}: Submission) {
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
        <div className="flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-full", statusColors[status])} />
          <span>{status}</span>
        </div>
      </TableCell>
      <TableCell>{updatedBy}</TableCell>
    </TableRow>
  );
}
