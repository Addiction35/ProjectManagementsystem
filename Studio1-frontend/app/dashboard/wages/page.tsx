import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { WagesList } from "@/components/wages/wages-list"
import { WagesFilters } from "@/components/wages/wages-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function WagesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Wages" text="Manage employee wages and payments.">
        <Button asChild>
          <Link href="/dashboard/wages/new">
            <Plus className="mr-2 h-4 w-4" />
            New Wage 
          </Link>
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <WagesFilters />
        <WagesList />
      </div>
    </DashboardShell>
  )
}
