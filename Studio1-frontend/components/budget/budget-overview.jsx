"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Download, FileSpreadsheet, Printer } from "lucide-react"
import { BudgetChart } from "@/components/budget/budget-chart"

export function BudgetOverview() {
  const [view, setView] = useState("summary")

  // Sample budget data
  const budgetData = {
    totalBudget: 1250000,
    totalSpent: 875000,
    remaining: 375000,
    percentSpent: 70,
    status: "On Budget",
    categories: [
      { name: "Materials", budget: 500000, spent: 425000, percent: 85 },
      { name: "Labor", budget: 350000, spent: 280000, percent: 80 },
      { name: "Equipment", budget: 150000, spent: 90000, percent: 60 },
      { name: "Subcontractors", budget: 200000, spent: 60000, percent: 30 },
      { name: "Overhead", budget: 50000, spent: 20000, percent: 40 },
    ],
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (percent) => {
    if (percent < 70) return "bg-green-500"
    if (percent < 90) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Budget Overview</CardTitle>
            <CardDescription>Opollo Residence - Q1 2025</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <Tabs defaultValue="summary" className="w-full" onValueChange={setView}>
        <div className="px-6 pt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
        </div>

        <CardContent>
          <TabsContent value="summary" className="mt-0">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Total Budget</h3>
                <p className="text-2xl font-bold">{formatCurrency(budgetData.totalBudget)}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Total Spent</h3>
                <p className="text-2xl font-bold">{formatCurrency(budgetData.totalSpent)}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Remaining</h3>
                <p className="text-2xl font-bold">{formatCurrency(budgetData.remaining)}</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Budget Utilization</h3>
                <span className="text-sm font-medium">{budgetData.percentSpent}%</span>
              </div>
              <Progress value={budgetData.percentSpent} className="h-2" />
            </div>

            <div className="mt-8">
              <BudgetChart />
            </div>
          </TabsContent>

          <TabsContent value="categories" className="mt-0">
            <div className="space-y-6">
              {budgetData.categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{category.name}</h3>
                    <span className="text-sm">
                      {formatCurrency(category.spent)} / {formatCurrency(category.budget)}
                    </span>
                  </div>
                  <Progress value={category.percent} className={`h-2 ${getStatusColor(category.percent)}`} />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{category.percent}% Used</span>
                    <span>{formatCurrency(category.budget - category.spent)} Remaining</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-0">
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Budget trends visualization will be displayed here</p>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}
