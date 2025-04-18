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

// Update the dummy data to include all the required fields
const purchaseOrders = [
  {
    id: "PO-2023-001",
    vendor: "Office Supplies Inc.",
    date: "2023-10-15",
    expectedDelivery: "2023-10-30",
    amount: "$1,234.56",
    status: "Pending",
    project: "Opollo Residence",
    reference: "REF-001",
    billed: "No",
    companyName: "Studio 1:1 Construction LTD",
    items: [
      { name: "Paper", quantity: 10, price: "$45.67" },
      { name: "Pens", quantity: 50, price: "$123.45" },
      { name: "Notebooks", quantity: 20, price: "$234.56" },
    ],
  },
  {
    id: "PO-2023-002",
    vendor: "Tech Solutions Ltd.",
    date: "2023-10-10",
    expectedDelivery: "2023-11-10",
    amount: "$5,678.90",
    status: "Approved",
    project: "Marina Complex",
    reference: "REF-002",
    billed: "Yes",
    companyName: "Studio 1:1 Construction LTD",
    items: [
      { name: "Laptops", quantity: 2, price: "$2,345.67" },
      { name: "Monitors", quantity: 4, price: "$1,234.56" },
      { name: "Keyboards", quantity: 5, price: "$345.67" },
    ],
  },
  {
    id: "PO-2023-003",
    vendor: "Furniture Depot",
    date: "2023-10-05",
    expectedDelivery: "2023-11-15",
    amount: "$3,456.78",
    status: "Received",
    project: "Office Renovation",
    reference: "REF-003",
    billed: "Partial",
    companyName: "Studio 1:1 Construction LTD",
    items: [
      { name: "Desks", quantity: 3, price: "$1,234.56" },
      { name: "Chairs", quantity: 6, price: "$567.89" },
      { name: "Filing Cabinets", quantity: 2, price: "$789.01" },
    ],
  },
  {
    id: "PO-2023-004",
    vendor: "Cleaning Services Co.",
    date: "2023-09-28",
    expectedDelivery: "2023-10-05",
    amount: "$890.12",
    status: "Paid",
    project: "Commercial Building",
    reference: "REF-004",
    billed: "Yes",
    companyName: "Studio 1:1 Construction LTD",
    items: [
      { name: "Monthly Cleaning", quantity: 1, price: "$567.89" },
      { name: "Window Cleaning", quantity: 1, price: "$234.56" },
      { name: "Carpet Cleaning", quantity: 1, price: "$87.67" },
    ],
  },
]

export function PurchaseOrderList() {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPO, setSelectedPO] = useState(null)
  const [convertDialogOpen, setConvertDialogOpen] = useState(false)
  const { openPDF } = usePDF()

  const handleDelete = () => {
    // In a real app, you would call an API to delete the purchase order
    toast({
      title: "Purchase Order Deleted",
      description: `Purchase Order ${selectedPO} has been deleted.`,
    })
    setDeleteDialogOpen(false)
  }

  const handleConvertToBill = () => {
    // In a real app, you would call an API to convert the purchase order to a bill
    toast({
      title: "Converted to Bill",
      description: `Purchase Order ${selectedPO} has been converted to a bill.`,
    })
    setConvertDialogOpen(false)
  }

  const handleViewPDF = (po) => {
    // Prepare data for PDF generation
    const pdfData = {
      type: "purchase-order",
      title: `Purchase Order - ${po.id}`,
      id: po.id,
      vendor: po.vendor,
      date: po.date,
      expectedDelivery: po.expectedDelivery || "22 Mar 2025",
      status: po.status,
      project: po.project, // Add project information
      ref: po.reference, // Add reference information
      mainSupplier: "Mombasa Town", // Add main supplier information
      // Convert string prices to numbers for proper calculation
      items: po.items.map((item) => ({
        ...item,
        price: Number.parseFloat(item.price.replace ? item.price.replace("$", "") : item.price),
        unit: "Bags", // Add unit information
      })),
      amount: po.amount,
    }

    // Open the PDF viewer with the data
    openPDF(pdfData)
  }

  const handleExportExcel = (id) => {
    // In a real app, you would generate and download an Excel file
    toast({
      title: "Excel Generated",
      description: `Purchase Order ${id} has been exported as Excel.`,
    })
  }

  const handlePrint = (id) => {
    // In a real app, you would open a print dialog
    toast({
      title: "Print Requested",
      description: `Purchase Order ${id} has been sent to printer.`,
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <Badge variant="outline">Approved</Badge>
      case "Pending":
        return <Badge variant="secondary">Pending</Badge>
      case "Received":
        return <Badge variant="default">Received</Badge>
      case "Paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Update the table headers and rows to match the requested structure
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Purchase Order Number</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Vendor Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Billed</TableHead>
            <TableHead>Delivery Date</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchaseOrders.map((po) => (
            <TableRow
              key={po.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => router.push(`/dashboard/purchase-orders/${po.id}`)}
            >
              <TableCell>{po.date}</TableCell>
              <TableCell>{po.project}</TableCell>
              <TableCell className="font-medium">{po.id}</TableCell>
              <TableCell>{po.reference}</TableCell>
              <TableCell>{po.amount}</TableCell>
              <TableCell>{po.vendor}</TableCell>
              <TableCell>{getStatusBadge(po.status)}</TableCell>
              <TableCell>{po.billed}</TableCell>
              <TableCell>{po.expectedDelivery}</TableCell>
              <TableCell>{po.companyName}</TableCell>
              <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleViewPDF(po)}>
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
                        <Link href={`/purchase-orders/${po.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/purchase-orders/${po.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewPDF(po)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportExcel(po.id)}>
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Export Excel
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePrint(po.id)}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedPO(po.id)
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
                          setSelectedPO(po.id)
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
              This action cannot be undone. This will permanently delete the purchase order {selectedPO} and remove it
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
              This will create a new bill based on purchase order {selectedPO}. Do you want to continue?
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
