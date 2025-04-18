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
import { ArrowLeft, Download, FileSpreadsheet, Printer, Edit, CheckCircle } from "lucide-react"
import { usePDF } from "@/components/pdf/pdf-provider"
import { toast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock function to fetch bill details
const fetchBillDetails = async (id) => {
  // In a real app, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

  // Sample hierarchical data structure
  return {
    id: id,
    vendor: "Office Supplies Inc.",
    description: "Monthly office supplies",
    date: "2023-10-15",
    dueDate: "2023-11-15",
    amount: "$1,234.56",
    status: "Pending",
    source: "Purchase Order",
    sourceId: "PO-2023-001",
    project: "Opollo Residence",
    reference: "BILL-REF-001",
    paymentMethod: "Bank Transfer",
    notes: "Regular monthly supplies order",

    // Level 1: Bill Categories
    children: [
      {
        id: "category-1",
        name: "Office Supplies",
        description: "General office supplies",
        amount: "$567.89",

        // Level 2: Bill Items
        children: [
          {
            id: "item-1",
            name: "Paper",
            description: "A4 printing paper",
            quantity: 10,
            unit: "Box",
            unitPrice: "$45.67",
            amount: "$456.70",

            // Level 3: Details
            children: [
              {
                id: "detail-1",
                name: "Specifications",
                description: "80gsm, white, 500 sheets per ream, 5 reams per box",
                manufacturer: "PaperCo",
                sku: "PAP-A4-80-W",
              },
              {
                id: "detail-2",
                name: "Delivery Information",
                description: "Delivered on Oct 15, 2023",
                deliveryNote: "DN-2023-123",
              },
            ],
          },
          {
            id: "item-2",
            name: "Pens",
            description: "Blue ballpoint pens",
            quantity: 50,
            unit: "Box",
            unitPrice: "$1.23",
            amount: "$61.50",

            children: [
              {
                id: "detail-3",
                name: "Specifications",
                description: "Blue ink, medium point, 12 pens per box",
                manufacturer: "PenCo",
                sku: "PEN-BP-BLU-MED",
              },
            ],
          },
        ],
      },
      {
        id: "category-2",
        name: "Stationery",
        description: "Notebooks and folders",
        amount: "$666.67",

        children: [
          {
            id: "item-3",
            name: "Notebooks",
            description: "Spiral notebooks",
            quantity: 20,
            unit: "Piece",
            unitPrice: "$3.45",
            amount: "$69.00",

            children: [],
          },
          {
            id: "item-4",
            name: "Folders",
            description: "Document folders",
            quantity: 30,
            unit: "Piece",
            unitPrice: "$2.59",
            amount: "$77.70",

            children: [],
          },
          {
            id: "item-5",
            name: "Binders",
            description: "3-ring binders",
            quantity: 15,
            unit: "Piece",
            unitPrice: "$4.99",
            amount: "$74.85",

            children: [],
          },
        ],
      },
    ],

    // Additional data for other tabs
    attachments: [
      { id: 1, name: "Invoice.pdf", size: "245 KB", uploadedBy: "John Doe", date: "2023-10-15" },
      { id: 2, name: "Delivery_Note.pdf", size: "198 KB", uploadedBy: "John Doe", date: "2023-10-15" },
    ],

    history: [
      { id: 1, action: "Created", user: "John Doe", date: "2023-10-15 09:30", notes: "Created from PO-2023-001" },
      { id: 2, action: "Submitted for Approval", user: "John Doe", date: "2023-10-15 10:15", notes: "Sent to finance" },
      { id: 3, action: "Approved", user: "Jane Smith", date: "2023-10-16 14:22", notes: "Approved for payment" },
    ],

    payments: [
      {
        id: "payment-1",
        date: "2023-10-20",
        amount: "$500.00",
        method: "Bank Transfer",
        reference: "PAY-2023-001",
        status: "Completed",

        children: [
          {
            id: "payment-detail-1",
            name: "Bank Details",
            accountName: "Office Supplies Inc.",
            accountNumber: "XXXX-XXXX-XXXX-1234",
            bankName: "First National Bank",
            swiftCode: "FNBKUS123",
          },
        ],
      },
      {
        id: "payment-2",
        date: "2023-11-05",
        amount: "$734.56",
        method: "Check",
        reference: "PAY-2023-002",
        status: "Pending",

        children: [],
      },
    ],
  }
}

export default function BillDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { openPDF } = usePDF()
  const [bill, setBill] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")

  useEffect(() => {
    const loadBill = async () => {
      try {
        setLoading(true)
        const data = await fetchBillDetails(params.id)
        setBill(data)
      } catch (error) {
        console.error("Error loading bill details:", error)
        toast({
          title: "Error",
          description: "Failed to load bill details. " + error.message,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadBill()
  }, [params.id])

  const handleBack = () => {
    router.back()
  }

  const handleViewPDF = () => {
    if (!bill) return

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
      project: bill.project,
      items: bill.children.flatMap((category) =>
        category.children.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description || "",
          quantity: item.quantity,
          price: typeof item.unitPrice === "string" ? item.unitPrice : `${item.unitPrice.toFixed(2)}`,
        })),
      ),
      amount: bill.amount,
    }

    // Open the PDF viewer with the data
    openPDF(pdfData)
  }

  const handleExportExcel = () => {
    toast({
      title: "Excel Generated",
      description: `Bill ${params.id} has been exported as Excel.`,
    })
  }

  const handlePrint = () => {
    toast({
      title: "Print Requested",
      description: `Bill ${params.id} has been sent to printer.`,
    })
  }

  const handleMarkAsPaid = () => {
    toast({
      title: "Bill Marked as Paid",
      description: `Bill ${params.id} has been marked as paid.`,
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
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Define columns for the hierarchical table
  const billColumns = [
    {
      key: "name",
      header: "Name",
      render: (data, level) => {
        // Different rendering based on the level
        if (level === 0) return <span className="font-medium">{data.name || "Bill Details"}</span>
        if (level === 1) return <span className="font-medium">{data.name}</span>
        return data.name
      },
    },
    {
      key: "description",
      header: "Description",
    },
    {
      key: "quantity",
      header: "Quantity",
      render: (data) => data.quantity || "",
    },
    {
      key: "unit",
      header: "Unit",
      render: (data) => data.unit || "",
    },
    {
      key: "unitPrice",
      header: "Unit Price",
      render: (data) => data.unitPrice || "",
    },
    {
      key: "amount",
      header: "Amount",
      render: (data) => data.amount || "",
    },
  ]

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

  // Define columns for the payments table
  const paymentColumns = [
    {
      key: "date",
      header: "Date",
    },
    {
      key: "amount",
      header: "Amount",
    },
    {
      key: "method",
      header: "Method",
    },
    {
      key: "reference",
      header: "Reference",
    },
    {
      key: "status",
      header: "Status",
      render: (data) => (data.status ? getStatusBadge(data.status) : ""),
    },
  ]

  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Loading Bill..." text="Please wait while we load the details." />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardShell>
    )
  }

  if (!bill) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Bill Not Found" text="The requested bill could not be found." />
        <Button onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bills
        </Button>
      </DashboardShell>
    )
  }

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
          {bill.status !== "Paid" && (
            <Button variant="outline" onClick={handleMarkAsPaid}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Paid
            </Button>
          )}
          <Button asChild>
            <Link href={`/bills/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <DashboardHeader
        heading={`Bill: ${bill.id}`}
        text={`Vendor: ${bill.vendor} | Source: ${bill.source} ${bill.sourceId}`}
      />

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Bill Summary</CardTitle>
          <CardDescription>Overview of the bill details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Vendor</h3>
              <p>{bill.vendor}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Date</h3>
              <p>{bill.date}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
              <p>{getStatusBadge(bill.status)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Due Date</h3>
              <p>{bill.dueDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Project</h3>
              <p>{bill.project}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Amount</h3>
              <p className="font-medium">{bill.amount}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Source</h3>
              <p>
                {bill.source} ({bill.sourceId})
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Reference</h3>
              <p>{bill.reference}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Payment Method</h3>
              <p>{bill.paymentMethod}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bill.children.flatMap((category) =>
                  category.children.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.unitPrice}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                    </TableRow>
                  )),
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6} className="text-right font-medium">
                    Subtotal
                  </TableCell>
                  <TableCell className="font-medium">
                    {bill.children
                      .reduce((sum, category) => sum + Number.parseFloat(category.amount.replace(/[^0-9.-]+/g, "")), 0)
                      .toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} className="text-right font-medium">
                    VAT (16%)
                  </TableCell>
                  <TableCell className="font-medium">
                    {(
                      bill.children.reduce(
                        (sum, category) => sum + Number.parseFloat(category.amount.replace(/[^0-9.-]+/g, "")),
                        0,
                      ) * 0.16
                    ).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} className="text-right font-bold">
                    Total
                  </TableCell>
                  <TableCell className="font-bold">
                    {Number.parseFloat(bill.amount.replace(/[^0-9.-]+/g, "")).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bill.payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{payment.reference}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-medium">
                    Total Paid
                  </TableCell>
                  <TableCell className="font-medium">
                    {bill.payments
                      .filter((payment) => payment.status === "Completed")
                      .reduce((sum, payment) => sum + Number.parseFloat(payment.amount.replace(/[^0-9.-]+/g, "")), 0)
                      .toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-bold">
                    Balance Due
                  </TableCell>
                  <TableCell className="font-bold">
                    {(
                      Number.parseFloat(bill.amount.replace(/[^0-9.-]+/g, "")) -
                      bill.payments
                        .filter((payment) => payment.status === "Completed")
                        .reduce((sum, payment) => sum + Number.parseFloat(payment.amount.replace(/[^0-9.-]+/g, "")), 0)
                    ).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <HierarchicalTable data={bill.history} columns={historyColumns} childrenField="children" />
        </TabsContent>

        <TabsContent value="attachments" className="mt-6">
          <HierarchicalTable
            data={bill.attachments}
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
