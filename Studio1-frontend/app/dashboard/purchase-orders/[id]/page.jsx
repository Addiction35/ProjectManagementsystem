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

// Mock function to fetch purchase order details
const fetchPurchaseOrderDetails = async (id) => {
  // In a real app, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

  // Sample hierarchical data structure
  return {
    id: id,
    date: "2023-10-15",
    vendor: "Office Supplies Inc.",
    project: "Opollo Residence",
    reference: "REF-001",
    amount: "$1,234.56",
    status: "Pending",
    billed: "No",
    expectedDelivery: "2023-10-30",
    companyName: "Studio 1:1 Construction LTD",
    notes: "Standard office supplies for Q4",
    createdBy: "John Doe",
    approvedBy: "Jane Smith",
    approvalDate: "2023-10-16",

    // Level 1: Sections/Categories
    children: [
      {
        id: "section-1",
        name: "Office Supplies",
        description: "General office supplies",
        amount: "$567.89",

        // Level 2: Items
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
                description: "To be delivered to main office reception",
                contact: "Reception Desk",
                specialInstructions: "Deliver during office hours (9am-5pm)",
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
        id: "section-2",
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

            children: [
              {
                id: "detail-4",
                name: "Specifications",
                description: "A5 size, 100 pages, ruled",
                manufacturer: "NoteCo",
                sku: "NB-A5-100-R",
              },
            ],
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
      { id: 1, name: "Quote.pdf", size: "245 KB", uploadedBy: "John Doe", date: "2023-10-14" },
      { id: 2, name: "Vendor_Catalog.pdf", size: "1.2 MB", uploadedBy: "John Doe", date: "2023-10-14" },
    ],

    history: [
      { id: 1, action: "Created", user: "John Doe", date: "2023-10-15 09:30", notes: "Initial creation" },
      { id: 2, action: "Submitted for Approval", user: "John Doe", date: "2023-10-15 10:15", notes: "Sent to manager" },
      { id: 3, action: "Approved", user: "Jane Smith", date: "2023-10-16 14:22", notes: "Approved as requested" },
    ],
  }
}

export default function PurchaseOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { openPDF } = usePDF()
  const [purchaseOrder, setPurchaseOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")

  useEffect(() => {
    const loadPurchaseOrder = async () => {
      try {
        setLoading(true)
        const data = await fetchPurchaseOrderDetails(params.id)
        setPurchaseOrder(data)
      } catch (error) {
        console.error("Error loading purchase order:", error)
        toast({
          title: "Error",
          description: "Failed to load purchase order details. " + error.message,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadPurchaseOrder()
  }, [params.id])

  const handleBack = () => {
    router.back()
  }

  const handleViewPDF = () => {
    if (!purchaseOrder) return

    // Prepare data for PDF generation
    const pdfData = {
      type: "purchase-order",
      title: `Purchase Order - ${purchaseOrder.id}`,
      id: purchaseOrder.id,
      vendor: purchaseOrder.vendor,
      date: purchaseOrder.date,
      expectedDelivery: purchaseOrder.expectedDelivery,
      status: purchaseOrder.status,
      project: purchaseOrder.project,
      ref: purchaseOrder.reference,
      mainSupplier: "Mombasa Town",
      items: purchaseOrder.children.flatMap((section) =>
        section.children.map((item) => ({
          name: item.name,
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          price: Number.parseFloat(item.unitPrice.replace("$", "")),
        })),
      ),
      amount: purchaseOrder.amount,
    }

    // Open the PDF viewer with the data
    openPDF(pdfData)
  }

  const handleExportExcel = () => {
    toast({
      title: "Excel Generated",
      description: `Purchase Order ${params.id} has been exported as Excel.`,
    })
  }

  const handlePrint = () => {
    toast({
      title: "Print Requested",
      description: `Purchase Order ${params.id} has been sent to printer.`,
    })
  }

  const handleConvertToBill = () => {
    toast({
      title: "Converted to Bill",
      description: `Purchase Order ${params.id} has been converted to a bill.`,
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

  // Define columns for the hierarchical table
  const itemColumns = [
    {
      key: "name",
      header: "Name",
      render: (data, level) => {
        // Different rendering based on the level
        if (level === 0) return <span className="font-medium">{data.name || "Purchase Order Details"}</span>
        if (level === 1) return <span className="font-medium">{data.name}</span>
        if (level === 2) return data.name
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
      render: (data) => (data.quantity ? data.quantity : ""),
    },
    {
      key: "unit",
      header: "Unit",
      render: (data) => (data.unit ? data.unit : ""),
    },
    {
      key: "unitPrice",
      header: "Unit Price",
      render: (data) => (data.unitPrice ? data.unitPrice : ""),
    },
    {
      key: "amount",
      header: "Amount",
      render: (data) => (data.amount ? data.amount : ""),
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

  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Loading Purchase Order..." text="Please wait while we load the details." />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardShell>
    )
  }

  if (!purchaseOrder) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Purchase Order Not Found" text="The requested purchase order could not be found." />
        <Button onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Purchase Orders
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
          <Button variant="outline" onClick={handleConvertToBill}>
            <FileCheck className="mr-2 h-4 w-4" />
            Convert to Bill
          </Button>
          <Button asChild>
            <Link href={`/purchase-orders/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <DashboardHeader
        heading={`Purchase Order: ${purchaseOrder.id}`}
        text={`Vendor: ${purchaseOrder.vendor} | Project: ${purchaseOrder.project}`}
      />

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Purchase Order Summary</CardTitle>
          <CardDescription>Overview of the purchase order details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Vendor</h3>
              <p>{purchaseOrder.vendor}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Date</h3>
              <p>{purchaseOrder.date}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
              <p>{getStatusBadge(purchaseOrder.status)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Project</h3>
              <p>{purchaseOrder.project}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Reference</h3>
              <p>{purchaseOrder.reference}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Amount</h3>
              <p className="font-medium">{purchaseOrder.amount}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Delivery Date</h3>
              <p>{purchaseOrder.expectedDelivery}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Billed</h3>
              <p>{purchaseOrder.billed}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Company</h3>
              <p>{purchaseOrder.companyName}</p>
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
                  <TableHead>Item</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseOrder.children.flatMap((section) =>
                  section.children.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
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
                  <TableCell colSpan={5} className="text-right font-medium">
                    Subtotal
                  </TableCell>
                  <TableCell className="font-medium">
                    {purchaseOrder.children
                      .reduce(
                        (sum, section) =>
                          sum +
                          section.children.reduce(
                            (sum, item) => sum + Number.parseFloat(item.amount.replace(/[^0-9.-]+/g, "")),
                            0,
                          ),
                        0,
                      )
                      .toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} className="text-right font-medium">
                    VAT (16%)
                  </TableCell>
                  <TableCell className="font-medium">
                    {(
                      purchaseOrder.children.reduce(
                        (sum, section) =>
                          sum +
                          section.children.reduce(
                            (sum, item) => sum + Number.parseFloat(item.amount.replace(/[^0-9.-]+/g, "")),
                            0,
                          ),
                        0,
                      ) * 0.16
                    ).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} className="text-right font-bold">
                    Total
                  </TableCell>
                  <TableCell className="font-bold">
                    {Number.parseFloat(purchaseOrder.amount.replace(/[^0-9.-]+/g, "")).toLocaleString("en-US", {
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
          <HierarchicalTable data={purchaseOrder.history} columns={historyColumns} childrenField="children" />
        </TabsContent>

        <TabsContent value="attachments" className="mt-6">
          <HierarchicalTable
            data={purchaseOrder.attachments}
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
