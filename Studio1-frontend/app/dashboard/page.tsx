import { DashboardCards } from "@/components/dashboard-cards"
import { DashboardCharts } from "@/components/dashboard-charts"
import { ProjectsTable } from "@/components/projects-table"
import { TasksOverview } from "@/components/tasks-overview"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <DashboardCards />
      <div className="grid gap-6 md:grid-cols-2">
        <DashboardCharts />
        <TasksOverview />
      </div>
      <ProjectsTable />
    </div>
  )
}

