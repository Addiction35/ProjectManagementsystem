"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, FileEdit, MoreHorizontal, FileCheck, Trash2, Download, FileSpreadsheet, Printer } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock data for expenses
const mockExpenses = [
  {
    id: "EXP-001",
    date: "2023-10-15",
    expenseAccount: "Travel",
    reference: "EXP-REF-001",
    vendorName: "Travel Agency Inc.",
    paidThrough: "Corporate Credit Card",
    customerName: "Opollo Construction Ltd.",
    status: "Approved",
    amount: "$1,250.75",
  },
  {
    id: "EXP-002",
    date: "2023-10-12",
    expenseAccount: "Office Supplies",
    reference: "EXP-REF-002",
    vendorName: "Office Depot",
    paidThrough: "Company Account",
    customerName: "Opollo Construction Ltd.",
    status: "Pending",
    amount: "$345.20",
  },
  {
    id: "EXP-003",
    date: "2023-10-10",
    expenseAccount: "Equipment Rental",
    reference: "EXP-REF-003",
    vendorName: "Construction Equipment Co.",
    paidThrough: "Bank Transfer",
    customerName: "Riverside Project",
    status: "Approved",
    amount: "$2,500.00",
  },
  {
    id: "EXP-004",
    date: "2023-10-08",
    expenseAccount: "Utilities",
    reference: "EXP-REF-004",
    vendorName: "City Power & Water",
    paidThrough: "Direct Debit",
    customerName: "Main Office",
    status: "Approved",
    amount: "$780.50",
  },
  {
    id: "EXP-005",
    date: "2023-10-05",
    expenseAccount: "Vehicle Maintenance",
    reference: "EXP-REF-005",
    vendorName: "Auto Repair Shop",
    paidThrough: "Company Account",
    customerName: "Fleet Management",
    status: "Rejected",
    amount: "$450.00",
  },
  {
    id: "EXP-006",
    date: "2023-10-03",
    expenseAccount: "Meals & Entertainment",
    reference: "EXP-REF-006",
    vendorName: "Restaurant Inc.",
    paidThrough: "Corporate Credit Card",
    customerName: "Client Meeting",
    status: "Approved",
    amount: "$325.75",
  },
  {
    id: "EXP-007",
    date: "2023-09-28",
    expenseAccount: "Professional Services",
    reference: "EXP-REF-007",
    vendorName: "Legal Consultants LLC",
    paidThrough: "Bank Transfer",
    customerName: "Corporate",
    status: "Pending",
    amount: "$1,800.00",
  },
  {
    id: "EXP-008",
    date: "2023-09-25",
    expenseAccount: "Marketing",
    reference: "EXP-REF-008",
    vendorName: "Digital Marketing Agency",
    paidThrough: "Company Account",
    customerName: "Marketing Campaign",
    status: "Approved",
    amount: "$3,500.00",
  },
  {
    id: "EXP-009",
    date: "2023-09-20",
    expenseAccount: "Insurance",
    reference: "EXP-REF-009",
    vendorName: "Insurance Provider Inc.",
    paidThrough: "Direct Debit",
    customerName: "Corporate",
    status: "Approved",
    amount: "$2,250.00",
  },
  {
    id: "EXP-010",
    date: "2023-09-15",
    expenseAccount: "Training & Development",
    reference: "EXP-REF-010",
    vendorName: "Training Solutions Ltd.",
    paidThrough: "Corporate Credit Card",
    customerName: "Staff Development",
    status: "Pending",
    amount: "$1,200.00",
  },
]

export function ExpensesList({ filters = {} }) {
  const [expenses, setExpenses] = useState(mockExpenses)
  const router = useRouter()

  // Function to handle viewing an expense
  const handleView = (id) => {
    router.push(`/dashboard/expenses/${id}`)
  }

  // Function to handle editing an expense
  const handleEdit = (id) => {
    router.push(`/dashboard/expenses/${id}/edit`)
  }

  // Function to handle deleting an expense
  const handleDelete = (id) => {
    // In a real app, this would call an API
    setExpenses(expenses.filter((expense) => expense.id !== id))
    toast({
      title: "Expense Deleted",
      description: `Expense ${id} has been deleted.`,
    })
  }

  // Function to handle converting an expense to a bill
  const handleConvertToBill = (id) => {
    toast({
      title: "Converted to Bill",
      description: `Expense ${id} has been converted to a bill.`,
    })
  }

  // Function to handle downloading a PDF
  const handleDownloadPDF = (id) => {
    toast({
      title: "PDF Downloaded",
      description: `Expense ${id} has been downloaded as PDF.`,
    })
  }

  // Function to handle exporting to Excel
  const handleExportExcel = (id) => {
    toast({
      title: "Excel Generated",
      description: `Expense ${id} has been exported as Excel.`,
    })
  }

  // Function to handle printing
  const handlePrint = (id) => {
    toast({
      title: "Print Requested",
      description: `Expense ${id} has been sent to printer.`,
    })
  }

  // Function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <Badge variant="outline">Approved</Badge>
      case "Pending":
        return <Badge variant="secondary">Pending</Badge>
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Expense Account</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Vendor Name</TableHead>
            <TableHead>Paid Through</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                No expenses found. Create your first expense to get started.
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense) => (
              <TableRow
                key={expense.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleView(expense.id)}
              >
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.expenseAccount}</TableCell>
                <TableCell>{expense.reference}</TableCell>
                <TableCell>{expense.vendorName}</TableCell>
                <TableCell>{expense.paidThrough}</TableCell>
                <TableCell>{expense.customerName}</TableCell>
                <TableCell>{getStatusBadge(expense.status)}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleView(expense.id)
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEdit(expense.id)
                        }}
                      >
                        <FileEdit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleConvertToBill(expense.id)
                        }}
                      >
                        <FileCheck className="mr-2 h-4 w-4" />
                        Convert to Bill
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDownloadPDF(expense.id)
                        }}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleExportExcel(expense.id)
                        }}
                      >
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Export Excel
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePrint(expense.id)
                        }}
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(expense.id)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
