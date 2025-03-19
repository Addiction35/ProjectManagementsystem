"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronDown,
  ChevronRight,
  Edit,
  Eye,
  FileText,
  MoreHorizontal,
  Plus,
  Trash,
  Download,
  FileSpreadsheet,
  ShoppingCart,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EstimateSummaryDrawer } from "@/components/estimate-summary-drawer"
import { CreatePODialog } from "@/components/create-po-dialog"
import { ImportExcelDialog } from "@/components/import-excel-dialog"
import { useEstimates } from "@/hooks/use-estimates"
import { useToast } from "@/hooks/use-toast"

// Define types for our estimate hierarchy
type SubSection = {
  id: string
  code: string
  description: string
  quantity: number
  unit: string
  rate: number
  total: number
}

type Section = {
  id: string
  code: string
  description: string
  subsections: SubSection[]
  expanded: boolean
  total: number
}

type EstimateGroup = {
  id: string
  code: string
  description: string
  sections: Section[]
  expanded: boolean
  total: number
}

type Estimate = {
  id: string
  name: string
  client: string
  date: string
  status: string
  groups: EstimateGroup[]
  expanded: boolean
  total: number
}

export function EstimateHierarchy() {
  // State for the summary drawer
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null)

  // State for the create PO dialog
  const [createPOOpen, setCreatePOOpen] = useState(false)

  // State for the import Excel dialog
  const [importExcelOpen, setImportExcelOpen] = useState(false)

  const { toast } = useToast()

  // Use TanStack Query hook for estimates
  const {
    data: estimates,
    isLoading,
    isError,
    error,
    toggleEstimate,
    toggleGroup,
    toggleSection,
    exportToExcel,
  } = useEstimates()

  // Open summary drawer for an estimate
  const openSummary = (estimate: Estimate) => {
    setSelectedEstimate(estimate)
    setSummaryOpen(true)
  }

  // Open create PO dialog for an estimate
  const openCreatePO = (estimate: Estimate) => {
    setSelectedEstimate(estimate)
    setCreatePOOpen(true)
  }

  // Handle Excel export
  const handleExportToExcel = (estimateId: string) => {
    exportToExcel(estimateId)
    toast({
      title: "Export successful",
      description: "The estimate has been exported to Excel",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-4 border border-destructive/50 rounded-md bg-destructive/10 text-destructive">
        <h3 className="font-medium">Error loading estimates</h3>
        <p className="text-sm">{error?.message || "An unknown error occurred"}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">All Estimates</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setImportExcelOpen(true)}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Import Excel
          </Button>
        </div>
      </div>

      {estimates?.map((estimate) => (
        <Card key={estimate.id} className="overflow-hidden">
          <div className="bg-muted p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleEstimate(estimate.id)}>
                  {estimate.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{estimate.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {estimate.client} • {estimate.date}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    estimate.status === "Approved" ? "outline" : estimate.status === "Sent" ? "default" : "secondary"
                  }
                >
                  {estimate.status}
                </Badge>
                <div className="font-medium">${estimate.total.toLocaleString()}</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => openSummary(estimate)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Summary
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View as PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openCreatePO(estimate)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Create Purchase Order
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleExportToExcel(estimate.id)}>
                        <Download className="mr-2 h-4 w-4" />
                        Export to Excel
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>

          {estimate.expanded && (
            <CardContent className="p-0">
              {/* Groups */}
              {estimate.groups.map((group) => (
                <div key={group.id} className="border-t">
                  <div className="flex items-center justify-between p-4 pl-8 hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => toggleGroup(estimate.id, group.id)}
                      >
                        {group.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </Button>
                      <div className="flex items-center gap-3">
                        <div className="font-medium w-16">{group.code}</div>
                        <div>{group.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-medium">${group.total.toLocaleString()}</div>
                      <Button variant="ghost" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Sections */}
                  {group.expanded &&
                    group.sections.map((section) => (
                      <div key={section.id} className="border-t">
                        <div className="flex items-center justify-between p-4 pl-12 hover:bg-muted/50">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => toggleSection(estimate.id, group.id, section.id)}
                            >
                              {section.expanded ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                            <div className="flex items-center gap-3">
                              <div className="font-medium w-16">{section.code}</div>
                              <div>{section.description}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="font-medium">${section.total.toLocaleString()}</div>
                            <Button variant="ghost" size="icon">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Subsections */}
                        {section.expanded && (
                          <div className="border-t">
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b bg-muted/50">
                                    <th className="px-4 py-2 text-left w-16">Code</th>
                                    <th className="px-4 py-2 text-left">Description</th>
                                    <th className="px-4 py-2 text-right">Quantity</th>
                                    <th className="px-4 py-2 text-left">Unit</th>
                                    <th className="px-4 py-2 text-right">Rate</th>
                                    <th className="px-4 py-2 text-right">Total</th>
                                    <th className="px-4 py-2 text-right w-10"></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {section.subsections.map((subsection) => (
                                    <tr key={subsection.id} className="border-b hover:bg-muted/50">
                                      <td className="px-4 py-2 text-left">{subsection.code}</td>
                                      <td className="px-4 py-2 text-left">{subsection.description}</td>
                                      <td className="px-4 py-2 text-right">{subsection.quantity}</td>
                                      <td className="px-4 py-2 text-left">{subsection.unit}</td>
                                      <td className="px-4 py-2 text-right">${subsection.rate.toLocaleString()}</td>
                                      <td className="px-4 py-2 text-right">${subsection.total.toLocaleString()}</td>
                                      <td className="px-4 py-2 text-right">
                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </td>
                                    </tr>
                                  ))}
                                  <tr>
                                    <td colSpan={7} className="px-4 py-2">
                                      <Button variant="ghost" size="sm" className="w-full">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Subsection
                                      </Button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                  {group.expanded && (
                    <div className="p-4 pl-12">
                      <Button variant="ghost" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Section
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              <div className="p-4 pl-8">
                <Button variant="ghost" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Group
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      {/* Summary Drawer */}
      <EstimateSummaryDrawer open={summaryOpen} onOpenChange={setSummaryOpen} estimate={selectedEstimate} />

      {/* Create PO Dialog */}
      <CreatePODialog open={createPOOpen} onOpenChange={setCreatePOOpen} estimate={selectedEstimate} />

      {/* Import Excel Dialog */}
      <ImportExcelDialog open={importExcelOpen} onOpenChange={setImportExcelOpen} />
    </div>
  )
}

