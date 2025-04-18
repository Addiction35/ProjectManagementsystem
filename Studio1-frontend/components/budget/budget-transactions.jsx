"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, ArrowUp, ArrowDown, FileText, ShoppingCart, Briefcase, DollarSign } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

export function BudgetTransactions({ className }) {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2025-03-15",
      description: "Cement Purchase",
      category: "Materials",
      amount: 125000,
      type: "expense",
      source: "Purchase Order",
      sourceId: "PO-2025-001",
    },
    {
      id: 2,
      date: "2025-03-12",
      description: "Steel Reinforcement",
      category: "Materials",
      amount: 85000,
      type: "expense",
      source: "Purchase Order",
      sourceId: "PO-2025-002",
    },
    {
      id: 3,
      date: "2025-03-10",
      description: "Excavation Work",
      category: "Labor",
      amount: 65000,
      type: "expense",
      source: "Wage",
      sourceId: "WG-2025-001",
    },
    {
      id: 4,
      date: "2025-03-08",
      description: "Equipment Rental",
      category: "Equipment",
      amount: 45000,
      type: "expense",
      source: "Expense",
      sourceId: "EXP-2025-001",
    },
    {
      id: 5,
      date: "2025-03-05",
      description: "Budget Allocation",
      category: "All Categories",
      amount: 1250000,
      type: "allocation",
      source: "Budget",
      sourceId: "BUD-2025-001",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    category: "",
    amount: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  })

  const [searchQuery, setSearchQuery] = useState("")

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.category || !newTransaction.amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const amount = Number.parseFloat(newTransaction.amount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Amount must be a positive number",
        variant: "destructive",
      })
      return
    }

    const newId = Math.max(...transactions.map((t) => t.id), 0) + 1
    const sourceType = newTransaction.type === "expense" ? "Expense" : "Budget"
    const sourceId = `${sourceType.substring(0, 3).toUpperCase()}-2025-${String(newId).padStart(3, "0")}`

    setTransactions([
      {
        id: newId,
        date: newTransaction.date,
        description: newTransaction.description,
        category: newTransaction.category,
        amount: amount,
        type: newTransaction.type,
        source: sourceType,
        sourceId: sourceId,
      },
      ...transactions,
    ])

    setNewTransaction({
      description: "",
      category: "",
      amount: "",
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Transaction Added",
      description: `${newTransaction.description} has been added to your budget transactions.`,
    })
  }

  const filteredTransactions = transactions.filter((transaction) => {
    if (!searchQuery) return true
    return (
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.sourceId.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const getTransactionIcon = (transaction) => {
    if (transaction.type === "allocation") return <ArrowDown className="h-4 w-4 text-green-500" />

    switch (transaction.source) {
      case "Purchase Order":
        return <ShoppingCart className="h-4 w-4 text-blue-500" />
      case "Wage":
        return <DollarSign className="h-4 w-4 text-purple-500" />
      case "Expense":
        return <Briefcase className="h-4 w-4 text-orange-500" />
      case "Proposal":
        return <FileText className="h-4 w-4 text-indigo-500" />
      default:
        return <ArrowUp className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Budget Transactions</CardTitle>
            <CardDescription>Recent budget allocations and expenses</CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="w-[200px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-start justify-between p-3 border rounded-md">
                <div className="flex gap-3">
                  <div className="mt-0.5">{getTransactionIcon(transaction)}</div>
                  <div>
                    <h3 className="font-medium">{transaction.description}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <span>{formatDate(transaction.date)}</span>
                      <span>•</span>
                      <span>{transaction.category}</span>
                      <span>•</span>
                      <span>{transaction.sourceId}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={`font-medium ${transaction.type === "allocation" ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.type === "allocation" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </span>
                  <Badge variant="outline" className="mt-1">
                    {transaction.source}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredTransactions.length}</span> of{" "}
          <span className="font-medium">{transactions.length}</span> transactions
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardFooter>

      {/* Add Transaction Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Budget Transaction</DialogTitle>
            <DialogDescription>Record a new budget allocation or expense.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="transaction-type">Transaction Type</Label>
              <Select
                value={newTransaction.type}
                onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value })}
              >
                <SelectTrigger id="transaction-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="allocation">Budget Allocation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="transaction-date">Date</Label>
              <Input
                id="transaction-date"
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="transaction-description">Description</Label>
              <Input
                id="transaction-description"
                placeholder="e.g., Cement Purchase, Budget Allocation"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="transaction-category">Category</Label>
              <Select
                value={newTransaction.category}
                onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
              >
                <SelectTrigger id="transaction-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Materials">Materials</SelectItem>
                  <SelectItem value="Labor">Labor</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Subcontractors">Subcontractors</SelectItem>
                  <SelectItem value="Overhead">Overhead</SelectItem>
                  <SelectItem value="All Categories">All Categories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="transaction-amount">Amount (KES)</Label>
              <Input
                id="transaction-amount"
                type="number"
                placeholder="e.g., 50000"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTransaction}>Add Transaction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
