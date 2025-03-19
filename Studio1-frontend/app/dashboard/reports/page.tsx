import { Button } from "@/components/ui/button"
import { ReportsFilters } from "@/components/reports-filters"
import { ReportsGrid } from "@/components/reports-grid"
import { Download, Plus } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>
      <ReportsFilters />
      <ReportsGrid />
    </div>
  )
}

