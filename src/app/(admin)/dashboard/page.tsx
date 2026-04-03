"use client";

import StatsCards from "@/components/admin/Dashboard/StatsCards";
import ProjectsChart from "@/components/admin/Dashboard/ProjectsChart";
import UsersChart from "@/components/admin/Dashboard/UsersChart";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Overview of your platform metrics
        </p>
      </div>
      <StatsCards />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ProjectsChart />
        <UsersChart />
      </div>
    </div>
  );
}
