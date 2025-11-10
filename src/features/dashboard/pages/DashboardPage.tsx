import { Header } from "@/layout/header";
import { BalanceCard } from "@/features/dashboard/components/balance-card";
import { DraftApplications } from "@/features/dashboard/components/draft-applications";
import { PendingApplicationsCard } from "@/features/dashboard/components/pending-applications-card";
import { RecentSubmissions } from "@/features/dashboard/components/recent-submissions";

export function DashboardPage() {
  return (
    <>
      <Header title="Maker Dashboard" />
      <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BalanceCard />
            <PendingApplicationsCard />
          </div>
          <div className="flex flex-col gap-4">
            <DraftApplications />
          </div>
          <div className="flex flex-col gap-6">
            <RecentSubmissions />
          </div>
        </div>
      </div>
    </>
  );
}
