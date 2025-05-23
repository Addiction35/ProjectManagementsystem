import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ExpensesList } from "@/components/expenses/expenses-list"
import { ExpensesFilters } from "@/components/expenses/expenses-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ExpensesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Expenses" text="Manage your business expenses.">
        <Button asChild>
          <Link href="/dashboard/expenses/new">
            <Plus className="mr-2 h-4 w-4" />
            New Expense
          </Link>
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <ExpensesFilters />
        <ExpensesList />
      </div>
    </DashboardShell>
  )
}
