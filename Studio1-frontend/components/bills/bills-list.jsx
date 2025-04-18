"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, Download, FileSpreadsheet, Printer, Edit, Trash, CheckCircle, MoreHorizontal } from "lucide-react"
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

// Dummy data for bills
const bills = [
  {
    id: "BILL-2023-001",
    vendor: "Office Supplies Inc.",
    description: "Monthly office supplies",
    date: "2023-10-15",
    dueDate: "2023-11-15",
    amount: "$1,234.56",
    status: "Pending",
    source: "Purchase Order",
    sourceId: "PO-2023-001",
    items: [
      { name: "Paper", quantity: 10, price: "$45.67" },
      { name: "Pens", quantity: 50, price: "$123.45" },
      { name: "Notebooks", quantity: 20, price: "$234.56" },
    ],
  },
  {
    id: "BILL-2023-002",
    vendor: "Tech Solutions Ltd.",
    description: "IT equipment purchase",
    date: "2023-10-10",
    dueDate: "2023-11-10",
    amount: "$5,678.90",
    status: "Paid",
    source: "Purchase Order",
    sourceId: "PO-2023-002",
    items: [
      { name: "Laptops", quantity: 2, price: "$2,345.67" },
      { name: "Monitors", quantity: 4, price: "$1,234.56" },
      { name: "Keyboards", quantity: 5, price: "$345.67" },
    ],
  },
  {
    id: "BILL-2023-003",
    vendor: "Payroll Services",
    description: "Monthly wages",
    date: "2023-10-05",
    dueDate: "2023-10-15",
    amount: "$23,456.78",
    status: "Paid",
    source: "Wages",
    sourceId: "WG-2023-001",
    items: [
      { name: "Regular Hours", quantity: 1, price: "$20,000.00" },
      { name: "Overtime", quantity: 1, price: "$3,456.78" },
    ],
  },
  {
    id: "BILL-2023-004",
    vendor: "Travel Agency",
    description: "Business trip expenses",
    date: "2023-09-28",
    dueDate: "2023-10-28",
    amount: "$1,250.75",
    status: "Overdue",
    source: "Expense",
    sourceId: "EXP-2023-001",
    items: [
      { name: "Flight", quantity: 1, price: "$450.00" },
      { name: "Hotel", quantity: 1, price: "$600.00" },
      { name: "Meals", quantity: 1, price: "$150.75" },
      { name: "Transportation", quantity: 1, price: "$50.00" },
    ],
  },
]

export function BillsList() {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedBill, setSelectedBill] = useState(null)
  const [payDialogOpen, setPayDialogOpen] = useState(false)
  const { openPDF } = usePDF()

  const handleDelete = () => {
    // In a real app, you would call an API to delete the bill
    toast({
      title: "Bill Deleted",
      description: `Bill ${selectedBill} has been deleted.`,
    })
    setDeleteDialogOpen(false)
  }

  const handlePay = () => {
    // In a real app, you would call an API to mark the bill as paid
    toast({
      title: "Bill Marked as Paid",
      description: `Bill ${selectedBill} has been marked as paid.`,
    })
    setPayDialogOpen(false)
  }

  // Update the handleViewPDF function to include more bill details
  const handleViewPDF = (bill) => {
    // Prepare data for PDF generation
    const pdfData = {
      type: "bill",
      title: `Bill - ${bill.id}`,
      id: bill.id,
      vendor: bill.vendor,
      description: bill.description,
      date: bill.date,
      dueDate: bill.dueDate,
      status: bill.status,
      source: bill.source,
      sourceId: bill.sourceId,
      project: "Opollo Residence", // Add project information
      items: bill.items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description || "",
        quantity: item.quantity,
        price: typeof item.price === "string" ? item.price : `$${item.price.toFixed(2)}`,
      })),
      amount: bill.amount,
    }

    // Open the PDF viewer with the data
    openPDF(pdfData)
  }

  const handleExportExcel = (id) => {
    // In a real app, you would generate and download an Excel file
    toast({
      title: "Excel Generated",
      description: `Bill ${id} has been exported as Excel.`,
    })
  }

  const handlePrint = (id) => {
    // In a real app, you would open a print dialog
    toast({
      title: "Print Requested",
      description: `Bill ${id} has been sent to printer.`,
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return <Badge variant="default">Paid</Badge>
      case "Pending":
        return <Badge variant="outline">Pending</Badge>
      case "Overdue":
        return <Badge variant="destructive">Overdue</Badge>
      case "Yet to be Approved":
        return <Badge variant="secondary">Yet to be Approved</Badge>
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
            <TableHead>Vendor</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => (
            <TableRow
              key={bill.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => router.push(`/dashboard/bills/${bill.id}`)}
            >
              <TableCell className="font-medium">{bill.id}</TableCell>
              <TableCell>{bill.vendor}</TableCell>
              <TableCell>{bill.description}</TableCell>
              <TableCell>{bill.date}</TableCell>
              <TableCell>{bill.dueDate}</TableCell>
              <TableCell>{bill.amount}</TableCell>
              <TableCell>{getStatusBadge(bill.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleViewPDF(bill)}>
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
                        <Link href={`/bills/${bill.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewPDF(bill)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportExcel(bill.id)}>
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Export Excel
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePrint(bill.id)}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </DropdownMenuItem>
                      {bill.status !== "Paid" && (
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedBill(bill.id)
                            setPayDialogOpen(true)
                          }}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Paid
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setSelectedBill(bill.id)
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
              This action cannot be undone. This will permanently delete the bill {selectedBill} and remove it from our
              servers.
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

      {/* Pay Dialog */}
      <Dialog open={payDialogOpen} onOpenChange={setPayDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Bill as Paid</DialogTitle>
            <DialogDescription>
              This will change the status of bill {selectedBill} to "Paid". Do you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPayDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePay}>Mark as Paid</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
