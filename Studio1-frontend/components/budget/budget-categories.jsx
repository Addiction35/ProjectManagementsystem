"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export function BudgetCategories({ className }) {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Materials",
      budget: 500000,
      spent: 425000,
      status: "Warning",
    },
    {
      id: 2,
      name: "Labor",
      budget: 350000,
      spent: 280000,
      status: "On Track",
    },
    {
      id: 3,
      name: "Equipment",
      budget: 150000,
      spent: 90000,
      status: "On Track",
    },
    {
      id: 4,
      name: "Subcontractors",
      budget: 200000,
      spent: 60000,
      status: "On Track",
    },
    {
      id: 5,
      name: "Overhead",
      budget: 50000,
      spent: 20000,
      status: "On Track",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [newCategory, setNewCategory] = useState({ name: "", budget: "" })

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.budget) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const budget = Number.parseFloat(newCategory.budget)
    if (isNaN(budget) || budget <= 0) {
      toast({
        title: "Error",
        description: "Budget must be a positive number",
        variant: "destructive",
      })
      return
    }

    const newId = Math.max(...categories.map((c) => c.id), 0) + 1
    setCategories([
      ...categories,
      {
        id: newId,
        name: newCategory.name,
        budget: budget,
        spent: 0,
        status: "On Track",
      },
    ])

    setNewCategory({ name: "", budget: "" })
    setIsAddDialogOpen(false)

    toast({
      title: "Category Added",
      description: `${newCategory.name} has been added to your budget categories.`,
    })
  }

  const handleEditCategory = () => {
    if (!selectedCategory) return

    const budget = Number.parseFloat(selectedCategory.budget)
    if (isNaN(budget) || budget <= 0) {
      toast({
        title: "Error",
        description: "Budget must be a positive number",
        variant: "destructive",
      })
      return
    }

    setCategories(
      categories.map((category) =>
        category.id === selectedCategory.id
          ? {
              ...category,
              name: selectedCategory.name,
              budget: budget,
              status: category.spent / budget > 0.8 ? "Warning" : "On Track",
            }
          : category,
      ),
    )

    setIsEditDialogOpen(false)

    toast({
      title: "Category Updated",
      description: `${selectedCategory.name} has been updated.`,
    })
  }

  const handleDeleteCategory = () => {
    if (!selectedCategory) return

    setCategories(categories.filter((category) => category.id !== selectedCategory.id))
    setIsDeleteDialogOpen(false)

    toast({
      title: "Category Deleted",
      description: `${selectedCategory.name} has been deleted.`,
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "On Track":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
            {status}
          </Badge>
        )
      case "Warning":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
            {status}
          </Badge>
        )
      case "Over Budget":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
            {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>Manage your budget allocations</CardDescription>
          </div>
          <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between p-3 border rounded-md">
              <div>
                <h3 className="font-medium">{category.name}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span>Budget: {formatCurrency(category.budget)}</span>
                  <span>Spent: {formatCurrency(category.spent)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(category.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsDeleteDialogOpen(true)
                      }}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="text-sm text-muted-foreground">
          Total Categories: <span className="font-medium">{categories.length}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Total Budget:{" "}
          <span className="font-medium">
            {formatCurrency(categories.reduce((sum, category) => sum + category.budget, 0))}
          </span>
        </div>
      </CardFooter>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Budget Category</DialogTitle>
            <DialogDescription>Create a new budget category for your project.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                placeholder="e.g., Materials, Labor, Equipment"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="budget">Budget Amount (KES)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="e.g., 500000"
                value={newCategory.budget}
                onChange={(e) => setNewCategory({ ...newCategory, budget: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Budget Category</DialogTitle>
            <DialogDescription>Update the details of this budget category.</DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Category Name</Label>
                <Input
                  id="edit-name"
                  value={selectedCategory.name}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-budget">Budget Amount (KES)</Label>
                <Input
                  id="edit-budget"
                  type="number"
                  value={selectedCategory.budget}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, budget: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Category Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Budget Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <div className="py-4">
              <p>
                You are about to delete the <span className="font-medium">{selectedCategory.name}</span> category with a
                budget of <span className="font-medium">{formatCurrency(selectedCategory.budget)}</span>.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
