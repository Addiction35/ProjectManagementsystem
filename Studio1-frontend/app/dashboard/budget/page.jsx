import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { BudgetOverview } from "@/components/budget/budget-overview"
import { BudgetCategories } from "@/components/budget/budget-categories"
import { BudgetTransactions } from "@/components/budget/budget-transactions"
import { BudgetFilters } from "@/components/budget/budget-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function BudgetPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Budget Management" text="Track, allocate, and analyze your project budgets.">
        <Button asChild>
          <Link href="/dashboard/budget/new">
            <Plus className="mr-2 h-4 w-4" />
            New Budget
          </Link>
        </Button>
      </DashboardHeader>
      <div className="space-y-6">
        <BudgetFilters />
        <BudgetOverview />
        <div className="grid gap-6 md:grid-cols-7">
          <BudgetCategories className="md:col-span-3" />
          <BudgetTransactions className="md:col-span-4" />
        </div>
      </div>
    </DashboardShell>
  )
}
