"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, Eye, FileText, MoreHorizontal, Pencil, Send, Trash } from "lucide-react"

export function EstimatesTable() {
  const estimates = [
    {
      id: "EST-1234",
      name: "Riverside Apartments - Foundation",
      client: "Riverside Development Corp",
      category: "Residential/New Construction/Multi Family",
      status: "Draft",
      amount: "$245,000",
      date: "2023-09-15",
    },
    {
      id: "EST-1235",
      name: "Oakwood Office Complex - Electrical",
      client: "Oakwood Enterprises",
      category: "Commercial/Office Buildings/Medium",
      status: "Sent",
      amount: "$178,500",
      date: "2023-09-12",
    },
    {
      id: "EST-1236",
      name: "Sunset Heights Condos - Plumbing",
      client: "Sunset Properties LLC",
      category: "Residential/New Construction/Multi Family",
      status: "Approved",
      amount: "$92,750",
      date: "2023-09-08",
    },
    {
      id: "EST-1237",
      name: "Greenfield Shopping Mall - HVAC",
      client: "Greenfield Retail Group",
      category: "Commercial/Retail/Mall",
      status: "Rejected",
      amount: "$320,000",
      date: "2023-09-05",
    },
    {
      id: "EST-1238",
      name: "Lakeside Medical Center - Interior",
      client: "Lakeside Healthcare",
      category: "Commercial/Office Buildings/Large",
      status: "Draft",
      amount: "$415,000",
      date: "2023-09-01",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Estimate</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {estimates.map((estimate) => (
            <TableRow key={estimate.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{estimate.name}</div>
                    <div className="text-xs text-muted-foreground">{estimate.client}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="text-xs">{estimate.category}</div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    estimate.status === "Approved"
                      ? "outline"
                      : estimate.status === "Sent"
                        ? "default"
                        : estimate.status === "Rejected"
                          ? "destructive"
                          : "secondary"
                  }
                >
                  {estimate.status}
                </Badge>
              </TableCell>
              <TableCell>{estimate.amount}</TableCell>
              <TableCell className="hidden md:table-cell">{estimate.date}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => window.open(`/api/estimates/${estimate.id}/pdf`, "_blank")}>
                      <Eye className="mr-2 h-4 w-4" />
                      View as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Send className="mr-2 h-4 w-4" />
                      Send to Client
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

