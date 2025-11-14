import { Button } from "@/commons/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/commons/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { ApplicationsTable } from "../components/applications-table";
import { DraftsTable } from "../components/drafts-table";

export function ApplicationsPage() {
  return (
    <div className="flex-1 p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Application History
            </h1>
            <p className="text-muted-foreground">
              Track and manage all submitted and draft applications.
            </p>
          </div>
          <Button className="gap-2">
            <PlusCircle />
            <span className="truncate">Create New Application</span>
          </Button>
        </div>
        <Tabs defaultValue="submitted">
          <TabsList>
            <TabsTrigger value="submitted">Submitted Applications</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          <TabsContent value="submitted" className="mt-4">
            <ApplicationsTable />
          </TabsContent>
          <TabsContent value="drafts" className="mt-4">
            <DraftsTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
