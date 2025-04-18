import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PurchaseOrderList } from "@/components/purchase-orders/purchase-order-list"
import { PurchaseOrderFilters } from "@/components/purchase-orders/purchase-order-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function PurchaseOrdersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Purchase Orders" text="Manage your purchase orders.">
        <Button asChild>
          <Link href="/purchase-orders/new">
            <Plus className="mr-2 h-4 w-4" />
            New Purchase Order
          </Link>
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <PurchaseOrderFilters />
        <PurchaseOrderList />
      </div>
    </DashboardShell>
  )
}
