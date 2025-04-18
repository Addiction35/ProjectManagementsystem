import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { BillsList } from "@/components/bills/bills-list"
import { BillsFilters } from "@/components/bills/bills-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function BillsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Bills" text="Manage your bills and payments.">
        <Button asChild>
          <Link href="/dashboard/bills/new">
            <Plus className="mr-2 h-4 w-4" />
            New Bill
          </Link>
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <BillsFilters />
        <BillsList />
      </div>
    </DashboardShell>
  )
}
