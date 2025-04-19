"use client"

import { useEffect, useState } from "react"
import { DashboardCards } from "@/components/dashboard-cards"
import { DashboardCharts } from "@/components/dashboard-charts"
import { TasksOverview } from "@/components/tasks-overview"
import { FinancialSummary } from "@/components/financial-summary"
import { useProject } from "@/contexts/project-context"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  const { selectedProject, isLoading } = useProject()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72 mt-2" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            {isLoading
              ? "Loading project information..."
              : selectedProject
                ? `Overview of ${selectedProject.name}`
                : "Select a project to see detailed information"}
          </p>
        </div>
      </div>
      <DashboardCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <DashboardCharts className="lg:col-span-4" />
        <TasksOverview className="lg:col-span-3" />
      </div>
      <FinancialSummary />
    </div>
  )
}
