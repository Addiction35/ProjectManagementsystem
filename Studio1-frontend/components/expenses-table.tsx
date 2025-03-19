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
import { Copy, Download, Eye, MoreHorizontal, Pencil, Receipt, Trash } from "lucide-react"
import { useState } from "react"

export function ExpensesTable() {
  const [expenses, setExpenses] = useState([
    {
      id: "EXP-1234",
      description: "Building Materials",
      category: "Materials",
      project: "Riverside Apartments",
      amount: "$2,450",
      date: "2023-09-15",
      status: "Approved",
      submittedBy: "John Smith",
    },
    {
      id: "EXP-1235",
      description: "Equipment Rental",
      category: "Equipment",
      project: "Oakwood Office Complex",
      amount: "$1,850",
      date: "2023-09-12",
      status: "Pending",
      submittedBy: "Sarah Johnson",
    },
    {
      id: "EXP-1236",
      description: "Contractor Payment",
      category: "Labor",
      project: "Sunset Heights Condos",
      amount: "$3,750",
      date: "2023-09-08",
      status: "Approved",
      submittedBy: "Michael Scott",
    },
    {
      id: "EXP-1237",
      description: "Permit Fees",
      category: "Administrative",
      project: "Greenfield Shopping Mall",
      amount: "$850",
      date: "2023-09-05",
      status: "Rejected",
      submittedBy: "Jim Halpert",
    },
    {
      id: "EXP-1238",
      description: "Site Utilities",
      category: "Utilities",
      project: "Lakeside Medical Center",
      amount: "$1,250",
      date: "2023-09-01",
      status: "Pending",
      submittedBy: "Pam Beesly",
    },
  ])

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden md:table-cell">Project</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{expense.description}</div>
                    <div className="text-xs text-muted-foreground">{expense.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{expense.category}</TableCell>
              <TableCell className="hidden md:table-cell">{expense.project}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    expense.status === "Approved" ? "outline" : expense.status === "Pending" ? "default" : "destructive"
                  }
                >
                  {expense.status}
                </Badge>
              </TableCell>
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
                    <DropdownMenuItem onClick={() => window.open(`/api/expenses/${expense.id}/pdf`, "_blank")}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Receipt
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
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(expense.id)}>
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

