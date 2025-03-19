"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Download, FileBarChart, MoreHorizontal, PieChart } from "lucide-react"

export function ReportsGrid() {
  const reports = [
    {
      id: "REP-001",
      name: "Project Progress Summary",
      description: "Overview of all project timelines and completion status",
      type: "bar",
      updatedAt: "2 days ago",
      status: "Updated",
    },
    {
      id: "REP-002",
      name: "Budget Allocation",
      description: "Breakdown of budget allocation across projects",
      type: "pie",
      updatedAt: "1 week ago",
      status: "Updated",
    },
    {
      id: "REP-003",
      name: "Resource Utilization",
      description: "Analysis of resource usage efficiency",
      type: "bar",
      updatedAt: "3 days ago",
      status: "Updated",
    },
    {
      id: "REP-004",
      name: "Material Consumption",
      description: "Tracking of material usage across projects",
      type: "pie",
      updatedAt: "1 day ago",
      status: "Updated",
    },
    {
      id: "REP-005",
      name: "Financial Performance",
      description: "Financial metrics and performance indicators",
      type: "bar",
      updatedAt: "5 days ago",
      status: "Outdated",
    },
    {
      id: "REP-006",
      name: "Safety Compliance",
      description: "Safety incident reports and compliance metrics",
      type: "bar",
      updatedAt: "2 days ago",
      status: "Updated",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "bar":
        return <BarChart className="h-8 w-8 text-blue-500" />
      case "pie":
        return <PieChart className="h-8 w-8 text-green-500" />
      default:
        return <FileBarChart className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <Card key={report.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">{report.name}</CardTitle>
            <Badge variant={report.status === "Updated" ? "outline" : "secondary"}>{report.status}</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">{getIcon(report.type)}</div>
            <p className="text-sm text-muted-foreground">{report.description}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">{report.updatedAt}</div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

