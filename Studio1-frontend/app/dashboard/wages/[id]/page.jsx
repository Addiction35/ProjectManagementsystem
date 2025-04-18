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

// Mock function to fetch wage details
const fetchWageDetails = async (id) => {
  // In a real app, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

  // Sample hierarchical data structure
  return {
    id: id,
    employee: "John Smith",
    department: "Engineering",
    payPeriod: "Oct 1-15, 2023",
    amount: "$3,500.00",
    status: "Paid",
    date: "2023-10-16",
    project: "Opollo Residence",
    reference: "WG-REF-001",
    paymentMethod: "Bank Transfer",
    bankAccount: "XXXX-XXXX-XXXX-1234",
    notes: "Regular bi-weekly payment",

    // Level 1: Earnings Categories
    children: [
      {
        id: "earnings",
        name: "Earnings",
        description: "All earnings for the pay period",
        amount: "$3,800.00",

        // Level 2: Earnings Items
        children: [
          {
            id: "regular",
            name: "Regular Hours",
            description: "Standard working hours",
            quantity: 80,
            rate: "$40.00",
            amount: "$3,200.00",

            // Level 3: Details
            children: [
              {
                id: "regular-detail-1",
                name: "Week 1",
                description: "Oct 1-7, 2023",
                hours: 40,
                amount: "$1,600.00",
              },
              {
                id: "regular-detail-2",
                name: "Week 2",
                description: "Oct 8-15, 2023",
                hours: 40,
                amount: "$1,600.00",
              },
            ],
          },
          {
            id: "overtime",
            name: "Overtime Hours",
            description: "Additional hours worked",
            quantity: 5,
            rate: "$60.00",
            amount: "$300.00",

            children: [
              {
                id: "overtime-detail-1",
                name: "Week 1",
                description: "Oct 1-7, 2023",
                hours: 2,
                amount: "$120.00",
              },
              {
                id: "overtime-detail-2",
                name: "Week 2",
                description: "Oct 8-15, 2023",
                hours: 3,
                amount: "$180.00",
              },
            ],
          },
          {
            id: "allowances",
            name: "Allowances",
            description: "Additional benefits",
            amount: "$300.00",

            children: [
              {
                id: "allowance-1",
                name: "Transport Allowance",
                description: "Monthly transportation benefit",
                amount: "$200.00",
              },
              {
                id: "allowance-2",
                name: "Phone Allowance",
                description: "Monthly phone benefit",
                amount: "$100.00",
              },
            ],
          },
        ],
      },
      {
        id: "deductions",
        name: "Deductions",
        description: "All deductions for the pay period",
        amount: "$500.00",

        children: [
          {
            id: "tax",
            name: "Income Tax",
            description: "PAYE tax deduction",
            amount: "$300.00",

            children: [],
          },
          {
            id: "insurance",
            name: "Health Insurance",
            description: "Employee contribution",
            amount: "$150.00",

            children: [],
          },
          {
            id: "pension",
            name: "Pension Contribution",
            description: "Employee pension contribution",
            amount: "$50.00",

            children: [],
          },
        ],
      },
    ],

    // Additional data for other tabs
    attachments: [
      { id: 1, name: "Timesheet.pdf", size: "145 KB", uploadedBy: "Jane Doe", date: "2023-10-15" },
      { id: 2, name: "Approval.pdf", size: "98 KB", uploadedBy: "Robert Johnson", date: "2023-10-16" },
    ],

    history: [
      { id: 1, action: "Created", user: "Jane Doe", date: "2023-10-15 09:30", notes: "Initial creation" },
      { id: 2, action: "Submitted for Approval", user: "Jane Doe", date: "2023-10-15 10:15", notes: "Sent to manager" },
      { id: 3, action: "Approved", user: "Robert Johnson", date: "2023-10-16 11:22", notes: "Approved as requested" },
      { id: 4, action: "Paid", user: "Finance System", date: "2023-10-16 14:30", notes: "Payment processed" },
    ],
  }
}

export default function WageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { openPDF } = usePDF()
  const [wage, setWage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")

  useEffect(() => {
    const loadWage = async () => {
      try {
        setLoading(true)
        const data = await fetchWageDetails(params.id)
        setWage(data)
      } catch (error) {
        console.error("Error loading wage details:", error)
        toast({
          title: "Error",
          description: "Failed to load wage details. " + error.message,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadWage()
  }, [params.id])

  const handleBack = () => {
    router.back()
  }

  const handleViewPDF = () => {
    if (!wage) return

    // Prepare data for PDF generation
    const pdfData = {
      type: "wage",
      title: `Wage Record - ${wage.id}`,
      id: wage.id,
      employee: wage.employee,
      department: wage.department,
      payPeriod: wage.payPeriod,
      status: wage.status,
      project: wage.project,
      details: {
        regularHours: 80,
        overtimeHours: 5,
        regularRate: "$40.00",
        overtimeRate: "$60.00",
        deductions: "$500.00",
      },
      amount: wage.amount,
    }

    // Open the PDF viewer with the data
    openPDF(pdfData)
  }

  const handleExportExcel = () => {
    toast({
      title: "Excel Generated",
      description: `Wage record ${params.id} has been exported as Excel.`,
    })
  }

  const handlePrint = () => {
    toast({
      title: "Print Requested",
      description: `Wage record ${params.id} has been sent to printer.`,
    })
  }

  const handleConvertToBill = () => {
    toast({
      title: "Converted to Bill",
      description: `Wage record ${params.id} has been converted to a bill.`,
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

  // Define columns for the hierarchical table
  const earningsColumns = [
    {
      key: "name",
      header: "Name",
      render: (data, level) => {
        // Different rendering based on the level
        if (level === 0) return <span className="font-medium">{data.name || "Wage Details"}</span>
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
      header: "Hours/Quantity",
      render: (data) => data.quantity || data.hours || "",
    },
    {
      key: "rate",
      header: "Rate",
      render: (data) => data.rate || "",
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

  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Loading Wage Record..." text="Please wait while we load the details." />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardShell>
    )
  }

  if (!wage) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Wage Record Not Found" text="The requested wage record could not be found." />
        <Button onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Wages
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
            <Link href={`/wages/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <DashboardHeader
        heading={`Wage Record: ${wage.id}`}
        text={`Employee: ${wage.employee} | Department: ${wage.department}`}
      />

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Wage Summary</CardTitle>
          <CardDescription>Overview of the wage payment details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Employee</h3>
              <p>{wage.employee}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Department</h3>
              <p>{wage.department}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
              <p>{getStatusBadge(wage.status)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Pay Period</h3>
              <p>{wage.payPeriod}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Payment Date</h3>
              <p>{wage.date}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Net Amount</h3>
              <p className="font-medium">{wage.amount}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Project</h3>
              <p>{wage.project}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Reference</h3>
              <p>{wage.reference}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Payment Method</h3>
              <p>{wage.paymentMethod}</p>
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
                  <TableHead>Hours/Quantity</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Earnings Section */}
                <TableRow className="bg-muted/50">
                  <TableCell colSpan={5} className="font-bold">
                    Earnings
                  </TableCell>
                </TableRow>
                {wage.children[0].children.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.quantity || item.hours || ""}</TableCell>
                    <TableCell>{item.rate || ""}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-medium">
                    Total Earnings
                  </TableCell>
                  <TableCell className="font-medium">{wage.children[0].amount}</TableCell>
                </TableRow>

                {/* Deductions Section */}
                <TableRow className="bg-muted/50">
                  <TableCell colSpan={5} className="font-bold">
                    Deductions
                  </TableCell>
                </TableRow>
                {wage.children[1].children.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>{item.amount}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-medium">
                    Total Deductions
                  </TableCell>
                  <TableCell className="font-medium">{wage.children[1].amount}</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-bold">
                    Net Pay
                  </TableCell>
                  <TableCell className="font-bold">{wage.amount}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <HierarchicalTable data={wage.history} columns={historyColumns} childrenField="children" />
        </TabsContent>

        <TabsContent value="attachments" className="mt-6">
          <HierarchicalTable
            data={wage.attachments}
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
