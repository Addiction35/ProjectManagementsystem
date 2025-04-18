"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, Download, FileSpreadsheet, Printer, Edit, Trash, FileCheck, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import { usePDF } from "@/components/pdf/pdf-provider"

// Dummy data for wages
const wages = [
  {
    id: "WG-2023-001",
    employee: "John Smith",
    department: "Engineering",
    payPeriod: "Oct 1-15, 2023",
    amount: "$3,500.00",
    status: "Paid",
    details: {
      regularHours: 80,
      overtimeHours: 5,
      regularRate: "$40.00",
      overtimeRate: "$60.00",
      deductions: "$500.00",
    },
  },
  {
    id: "WG-2023-002",
    employee: "Jane Doe",
    department: "Marketing",
    payPeriod: "Oct 1-15, 2023",
    amount: "$2,800.00",
    status: "Pending",
    details: {
      regularHours: 80,
      overtimeHours: 0,
      regularRate: "$35.00",
      overtimeRate: "$52.50",
      deductions: "$400.00",
    },
  },
  {
    id: "WG-2023-003",
    employee: "Robert Johnson",
    department: "Finance",
    payPeriod: "Oct 1-15, 2023",
    amount: "$4,200.00",
    status: "Paid",
    details: {
      regularHours: 80,
      overtimeHours: 8,
      regularRate: "$45.00",
      overtimeRate: "$67.50",
      deductions: "$600.00",
    },
  },
  {
    id: "WG-2023-004",
    employee: "Emily Williams",
    department: "Human Resources",
    payPeriod: "Oct 1-15, 2023",
    amount: "$3,000.00",
    status: "Paid",
    details: {
      regularHours: 80,
      overtimeHours: 0,
      regularRate: "$37.50",
      overtimeRate: "$56.25",
      deductions: "$450.00",
    },
  },
]

export function WagesList() {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedWage, setSelectedWage] = useState(null)
  const [convertDialogOpen, setConvertDialogOpen] = useState(false)
  const { openPDF } = usePDF()

  const handleDelete = () => {
    // In a real app, you would call an API to delete the wage record
    toast({
      title: "Wage Record Deleted",
      description: `Wage record ${selectedWage} has been deleted.`,
    })
    setDeleteDialogOpen(false)
  }

  const handleConvertToBill = () => {
    // In a real app, you would call an API to convert the wage to a bill
    toast({
      title: "Converted to Bill",
      description: `Wage record ${selectedWage} has been converted to a bill.`,
    })
    setConvertDialogOpen(false)
  }

  const handleViewPDF = (wage) => {
    // Prepare data for PDF generation
    const pdfData = {
      type: "wage",
      title: `Wage Record - ${wage.id}`,
      id: wage.id,
      employee: wage.employee,
      department: wage.department,
      payPeriod: wage.payPeriod,
      status: wage.status,
      project: "Opollo Residence", // Add project information
      details: {
        ...wage.details,
        // Ensure these are properly formatted
        regularRate: wage.details.regularRate,
        overtimeRate: wage.details.overtimeRate,
        deductions: wage.details.deductions,
      },
      amount: wage.amount,
    }

    // Open the PDF viewer with the data
    openPDF(pdfData)
  }

  const handleExportExcel = (id) => {
    // In a real app, you would generate and download an Excel file
    toast({
      title: "Excel Generated",
      description: `Wage record ${id} has been exported as Excel.`,
    })
  }

  const handlePrint = (id) => {
    // In a real app, you would open a print dialog
    toast({
      title: "Print Requested",
      description: `Wage record ${id} has been sent to printer.`,
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return <Badge variant="default">Paid</Badge>
      case "Pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Pay Period</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wages.map((wage) => (
            <TableRow
              key={wage.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => router.push(`/dashboard/wages/${wage.id}`)}
            >
              <TableCell className="font-medium">{wage.id}</TableCell>
              <TableCell>{wage.employee}</TableCell>
              <TableCell>{wage.department}</TableCell>
              <TableCell>{wage.payPeriod}</TableCell>
              <TableCell>{wage.amount}</TableCell>
              <TableCell>{getStatusBadge(wage.status)}</TableCell>
              <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleViewPDF(wage)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View PDF</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/wages/${wage.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/wages/${wage.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewPDF(wage)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportExcel(wage.id)}>
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Export Excel
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePrint(wage.id)}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedWage(wage.id)
                          setConvertDialogOpen(true)
                        }}
                      >
                        <FileCheck className="mr-2 h-4 w-4" />
                        Convert to Bill
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setSelectedWage(wage.id)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the wage record {selectedWage} and remove it
              from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Convert to Bill Dialog */}
      <Dialog open={convertDialogOpen} onOpenChange={setConvertDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convert to Bill</DialogTitle>
            <DialogDescription>
              This will create a new bill based on wage record {selectedWage}. Do you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConvertDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConvertToBill}>Convert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
