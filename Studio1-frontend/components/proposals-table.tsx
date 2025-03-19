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

export function ProposalsTable() {
  const proposals = [
    {
      id: "PROP-1234",
      name: "Riverside Apartments Development",
      client: "Riverside Development Corp",
      status: "Draft",
      amount: "$2,450,000",
      date: "2023-09-15",
      expiryDate: "2023-10-15",
    },
    {
      id: "PROP-1235",
      name: "Oakwood Office Complex Construction",
      client: "Oakwood Enterprises",
      status: "Sent",
      amount: "$5,178,500",
      date: "2023-09-12",
      expiryDate: "2023-10-12",
    },
    {
      id: "PROP-1236",
      name: "Sunset Heights Condos Development",
      client: "Sunset Properties LLC",
      status: "Accepted",
      amount: "$3,892,750",
      date: "2023-09-08",
      expiryDate: "2023-10-08",
    },
    {
      id: "PROP-1237",
      name: "Greenfield Shopping Mall Renovation",
      client: "Greenfield Retail Group",
      status: "Rejected",
      amount: "$7,320,000",
      date: "2023-09-05",
      expiryDate: "2023-10-05",
    },
    {
      id: "PROP-1238",
      name: "Lakeside Medical Center Construction",
      client: "Lakeside Healthcare",
      status: "Draft",
      amount: "$4,415,000",
      date: "2023-09-01",
      expiryDate: "2023-10-01",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Proposal</TableHead>
            <TableHead className="hidden md:table-cell">Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden md:table-cell">Expiry Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{proposal.name}</div>
                    <div className="text-xs text-muted-foreground">{proposal.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{proposal.client}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    proposal.status === "Accepted"
                      ? "outline"
                      : proposal.status === "Sent"
                        ? "default"
                        : proposal.status === "Rejected"
                          ? "destructive"
                          : "secondary"
                  }
                >
                  {proposal.status}
                </Badge>
              </TableCell>
              <TableCell>{proposal.amount}</TableCell>
              <TableCell className="hidden md:table-cell">{proposal.expiryDate}</TableCell>
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
                    <DropdownMenuItem onClick={() => window.open(`/api/proposals/${proposal.id}/pdf`, "_blank")}>
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

