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
import { Copy, Download, Eye, MoreHorizontal, Pencil, ShoppingCart, Trash } from "lucide-react"
import { usePurchaseOrders } from "@/hooks/use-purchase-orders"

export function PurchaseOrdersTable() {
  const { data: purchaseOrders, isLoading, isError } = usePurchaseOrders()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-4 border border-destructive/50 rounded-md bg-destructive/10 text-destructive">
        <h3 className="font-medium">Error loading purchase orders</h3>
        <p className="text-sm">There was an error loading the purchase orders. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Purchase Order</TableHead>
            <TableHead className="hidden md:table-cell">Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden md:table-cell">Delivery Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchaseOrders?.map((po) => (
            <TableRow key={po.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{po.id}</div>
                    <div className="text-xs text-muted-foreground">{po.vendor}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{po.project}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    po.status === "Delivered"
                      ? "outline"
                      : po.status === "Approved"
                        ? "default"
                        : po.status === "Cancelled"
                          ? "destructive"
                          : "secondary"
                  }
                >
                  {po.status}
                </Badge>
              </TableCell>
              <TableCell>${po.amount.toLocaleString()}</TableCell>
              <TableCell className="hidden md:table-cell">{po.deliveryDate}</TableCell>
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
                    <DropdownMenuItem onClick={() => window.open(`/api/purchase-orders/${po.id}/pdf`, "_blank")}>
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
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {purchaseOrders?.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No purchase orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

