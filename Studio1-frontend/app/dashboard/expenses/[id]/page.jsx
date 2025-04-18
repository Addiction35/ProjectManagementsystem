"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { HierarchicalTable } from "@/components/ui/expandable-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, FileSpreadsheet, Printer, Edit, FileCheck } from "lucide-react"
import { usePDF } from "@/components/pdf/pdf-provider"
import { toast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock function to fetch expense details
const fetchExpenseDetails = async (id) => {
  // In a real app, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

  // Sample hierarchical data structure
  return {
    id: id,
    category: "Travel",
    description: "Business trip to New York",
    date: "2023-10-15",
    amount: "$1,250.75",
    status: "Approved",
    submittedBy: "John Smith",
    project: "Opollo Residence",
    reference: "EXP-REF-001",
    paymentMethod: "Company Card",
    notes: "Trip for client meeting and project site visit",
    vendorName: "Travel Agency Inc.",
    paidThrough: "Corporate Credit Card",
    customerName: "Opollo Construction Ltd.",

    // Level 1: Expense Categories
    children: [
      {
        id: "category-1",
        name: "Transportation",
        description: "All transportation expenses",
        amount: "$500.00",
        date: "2023-10-10",
        reference: "TR-001",
        vendorName: "Airlines Inc.",
        paidThrough: "Corporate Credit Card",
        customerName: "Opollo Construction Ltd.",
        status: "Approved",

        // Level 2: Expense Items
        children: [
          {
            id: "item-1",
            name: "Flight",
            description: "Round trip to New York",
            date: "2023-10-10",
            amount: "$450.00",
            receiptAttached: true,
            reference: "FL-001",
            vendorName: "Airlines Inc.",
            paidThrough: "Corporate Credit Card",
            customerName: "Opollo Construction Ltd.",
            status: "Approved",

            // Level 3: Details
            children: [
              {
                id: "detail-1",
                name: "Outbound Flight",
                description: "Economy class, Flight AA123",
                date: "2023-10-10",
                amount: "$225.00",
              },
              {
                id: "detail-2",
                name: "Return Flight",
                description: "Economy class, Flight AA456",
                date: "2023-10-14",
                amount: "$225.00",
              },
            ],
          },
          {
            id: "item-2",
            name: "Taxi",
            description: "Airport to hotel",
            date: "2023-10-10",
            amount: "$50.00",
            receiptAttached: true,
            reference: "TX-001",
            vendorName: "City Taxi Services",
            paidThrough: "Cash",
            customerName: "Opollo Construction Ltd.",
            status: "Approved",

            children: [],
          },
        ],
      },
      {
        id: "category-2",
        name: "Accommodation",
        description: "Hotel expenses",
        amount: "$600.00",
        date: "2023-10-11",
        reference: "AC-001",
        vendorName: "Hilton Hotels",
        paidThrough: "Corporate Credit Card",
        customerName: "Opollo Construction Ltd.",
        status: "Approved",

        children: [
          {
            id: "item-3",
            name: "Hotel",
            description: "3 nights at Hilton",
            date: "2023-10-11",
            amount: "$600.00",
            receiptAttached: true,
            reference: "HT-001",
            vendorName: "Hilton Hotels",
            paidThrough: "Corporate Credit Card",
            customerName: "Opollo Construction Ltd.",
            status: "Approved",

            children: [
              {
                id: "detail-3",
                name: "Room Charge",
                description: "Standard room, 3 nights",
                date: "2023-10-13",
                amount: "$540.00",
              },
              {
                id: "detail-4",
                name: "Room Service",
                description: "Dinner on Oct 11",
                date: "2023-10-11",
                amount: "$60.00",
              },
            ],
          },
        ],
      },
      {
        id: "category-3",
        name: "Meals",
        description: "Food expenses",
        amount: "$150.75",
        date: "2023-10-12",
        reference: "ME-001",
        vendorName: "Various Restaurants",
        paidThrough: "Corporate Credit Card",
        customerName: "Opollo Construction Ltd.",
        status: "Approved",

        children: [
          {
            id: "item-4",
            name: "Breakfast",
            description: "Daily breakfast",
            date: "2023-10-11",
            amount: "$45.25",
            receiptAttached: true,
            reference: "BF-001",
            vendorName: "Cafe Morning",
            paidThrough: "Corporate Credit Card",
            customerName: "Opollo Construction Ltd.",
            status: "Approved",

            children: [],
          },
          {
            id: "item-5",
            name: "Lunch",
            description: "Business lunch with client",
            date: "2023-10-12",
            amount: "$65.50",
            receiptAttached: true,
            reference: "LN-001",
            vendorName: "Business Bistro",
            paidThrough: "Corporate Credit Card",
            customerName: "Opollo Construction Ltd.",
            status: "Approved",

            children: [],
          },
          {
            id: "item-6",
            name: "Dinner",
            description: "Team dinner",
            date: "2023-10-13",
            amount: "$40.00",
            receiptAttached: false,
            reference: "DN-001",
            vendorName: "Steakhouse Grill",
            paidThrough: "Cash",
            customerName: "Opollo Construction Ltd.",
            status: "Pending",

            children: [],
          },
        ],
      },
    ],

    // Additional data for other tabs
    attachments: [
      { id: 1, name: "Flight_Receipt.pdf", size: "245 KB", uploadedBy: "John Smith", date: "2023-10-15" },
      { id: 2, name: "Hotel_Invoice.pdf", size: "198 KB", uploadedBy: "John Smith", date: "2023-10-15" },
      { id: 3, name: "Meal_Receipts.pdf", size: "156 KB", uploadedBy: "John Smith", date: "2023-10-15" },
    ],

    history: [
      { id: 1, action: "Created", user: "John Smith", date: "2023-10-15 09:30", notes: "Initial submission" },
      {
        id: 2,
        action: "Submitted for Approval",
        user: "John Smith",
        date: "2023-10-15 10:15",
        notes: "Sent to manager",
      },
      { id: 3, action: "Approved", user: "Jane Doe", date: "2023-10-16 14:22", notes: "Approved as requested" },
    ],
  }
}

export default function ExpenseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { openPDF } = usePDF()
  const [expense, setExpense] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")

  useEffect(() => {
    const loadExpense = async () => {
      try {
        setLoading(true)
        const data = await fetchExpenseDetails(params.id)
        setExpense(data)
      } catch (error) {
        console.error("Error loading expense details:", error)
        toast({
          title: "Error",
          description: "Failed to load expense details. " + error.message,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadExpense()
  }, [params.id])

  const handleBack = () => {
    router.back()
  }

  const handleViewPDF = () => {
    if (!expense) return

    // Prepare data for PDF generation
    const pdfData = {
      type: "expense",
      title: `Expense Report - ${expense.id}`,
      id: expense.id,
      category: expense.category,
      description: expense.description,
      date: expense.date,
      submittedBy: expense.submittedBy,
      status: expense.status,
      project: expense.project,
      reference: expense.reference,
      details: expense.children.flatMap((category) =>
        category.children.map((item) => ({
          item: item.name,
          amount: item.amount,
        })),
      ),
      amount: expense.amount,
    }

    // Open the PDF viewer with the data
    openPDF(pdfData)
  }

  const handleExportExcel = () => {
    toast({
      title: "Excel Generated",
      description: `Expense ${params.id} has been exported as Excel.`,
    })
  }

  const handlePrint = () => {
    toast({
      title: "Print Requested",
      description: `Expense ${params.id} has been sent to printer.`,
    })
  }

  const handleConvertToBill = () => {
    toast({
      title: "Converted to Bill",
      description: `Expense ${params.id} has been converted to a bill.`,
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <Badge variant="outline">Approved</Badge>
      case "Pending":
        return <Badge variant="secondary">Pending</Badge>
      case "Reimbursed":
        return <Badge variant="default">Reimbursed</Badge>
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Define columns for the history table
  const historyColumns = [
    {
      key: "action",
      header: "Action",
    },
    {
      key: "user",
      header: "User",
    },
    {
      key: "date",
      header: "Date & Time",
    },
    {
      key: "notes",
      header: "Notes",
    },
  ]

  // Define columns for the attachments table
  const attachmentColumns = [
    {
      key: "name",
      header: "File Name",
    },
    {
      key: "size",
      header: "Size",
    },
    {
      key: "uploadedBy",
      header: "Uploaded By",
    },
    {
      key: "date",
      header: "Date",
    },
  ]

  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Loading Expense..." text="Please wait while we load the details." />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardShell>
    )
  }

  if (!expense) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Expense Not Found" text="The requested expense could not be found." />
        <Button onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Expenses
        </Button>
      </DashboardShell>
    )
  }

  // Flatten the expense items for the table
  const flattenedExpenseItems = expense.children.flatMap((category) =>
    category.children.map((item) => ({
      date: item.date,
      expenseAccount: category.name,
      reference: item.reference,
      vendorName: item.vendorName,
      paidThrough: item.paidThrough,
      customerName: item.customerName,
      status: item.status,
      amount: item.amount,
      description: item.description,
    })),
  )

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleViewPDF}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" onClick={handleExportExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" onClick={handleConvertToBill}>
            <FileCheck className="mr-2 h-4 w-4" />
            Convert to Bill
          </Button>
          <Button asChild>
            <Link href={`/expenses/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <DashboardHeader
        heading={`Expense: ${expense.id}`}
        text={`Category: ${expense.category} | Submitted By: ${expense.submittedBy}`}
      />

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Expense Summary</CardTitle>
          <CardDescription>Overview of the expense details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Category</h3>
              <p>{expense.category}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Submitted By</h3>
              <p>{expense.submittedBy}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
              <p>{getStatusBadge(expense.status)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Date</h3>
              <p>{expense.date}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Project</h3>
              <p>{expense.project}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Amount</h3>
              <p className="font-medium">{expense.amount}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Reference</h3>
              <p>{expense.reference}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Payment Method</h3>
              <p>{expense.paymentMethod}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
              <p>{expense.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {flattenedExpenseItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.expenseAccount}</TableCell>
                    <TableCell>{item.reference}</TableCell>
                    <TableCell>{item.vendorName}</TableCell>
                    <TableCell>{item.paidThrough}</TableCell>
                    <TableCell>{item.customerName}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={7} className="text-right font-medium">
                    Subtotal
                  </TableCell>
                  <TableCell className="font-medium">
                    {expense.children
                      .reduce((sum, category) => sum + Number.parseFloat(category.amount.replace(/[^0-9.-]+/g, "")), 0)
                      .toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7} className="text-right font-medium">
                    VAT (16%)
                  </TableCell>
                  <TableCell className="font-medium">
                    {(
                      expense.children.reduce(
                        (sum, category) => sum + Number.parseFloat(category.amount.replace(/[^0-9.-]+/g, "")),
                        0,
                      ) * 0.16
                    ).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7} className="text-right font-bold">
                    Total
                  </TableCell>
                  <TableCell className="font-bold">
                    {Number.parseFloat(expense.amount.replace(/[^0-9.-]+/g, "")).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <HierarchicalTable data={expense.history} columns={historyColumns} childrenField="children" />
        </TabsContent>

        <TabsContent value="attachments" className="mt-6">
          <HierarchicalTable
            data={expense.attachments}
            columns={attachmentColumns}
            childrenField="children"
            renderRowActions={(data) => (
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast({ title: "Download", description: `Downloading ${data.name}` })}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
          />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
