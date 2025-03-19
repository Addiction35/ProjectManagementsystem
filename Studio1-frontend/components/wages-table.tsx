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
import { Copy, Download, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { useState } from "react"

export function WagesTable() {
  const [payrolls, setPayrolls] = useState([
    {
      id: "PAY-1234",
      period: "Sep 1-15, 2023",
      employees: 12,
      status: "Paid",
      amount: "$24,850",
      date: "2023-09-15",
    },
    {
      id: "PAY-1235",
      period: "Aug 16-31, 2023",
      employees: 12,
      status: "Paid",
      amount: "$25,200",
      date: "2023-08-31",
    },
    {
      id: "PAY-1236",
      period: "Aug 1-15, 2023",
      employees: 11,
      status: "Paid",
      amount: "$23,750",
      date: "2023-08-15",
    },
    {
      id: "PAY-1237",
      period: "Jul 16-31, 2023",
      employees: 11,
      status: "Paid",
      amount: "$22,980",
      date: "2023-07-31",
    },
    {
      id: "PAY-1238",
      period: "Jul 1-15, 2023",
      employees: 10,
      status: "Paid",
      amount: "$21,450",
      date: "2023-07-15",
    },
  ])

  const handleDelete = (id: string) => {
    setPayrolls(payrolls.filter((payroll) => payroll.id !== id))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Payroll Period</TableHead>
            <TableHead className="hidden md:table-cell">Employees</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payrolls.map((payroll) => (
            <TableRow key={payroll.id}>
              <TableCell className="font-medium">
                <div>
                  <div className="font-medium">{payroll.period}</div>
                  <div className="text-xs text-muted-foreground">{payroll.id}</div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{payroll.employees}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    payroll.status === "Paid" ? "outline" : payroll.status === "Processing" ? "default" : "secondary"
                  }
                >
                  {payroll.status}
                </Badge>
              </TableCell>
              <TableCell>{payroll.amount}</TableCell>
              <TableCell className="hidden md:table-cell">{payroll.date}</TableCell>
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
                    <DropdownMenuItem onClick={() => window.open(`/api/payroll/${payroll.id}/pdf`, "_blank")}>
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
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(payroll.id)}>
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

