"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Plus, Trash, Calendar } from "lucide-react"

export default function NewBudgetPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    project: "",
    description: "",
    startDate: "",
    endDate: "",
    totalBudget: "",
    categories: [
      { id: 1, name: "Materials", allocation: 40, amount: 0 },
      { id: 2, name: "Labor", allocation: 30, amount: 0 },
      { id: 3, name: "Equipment", allocation: 15, amount: 0 },
      { id: 4, name: "Subcontractors", allocation: 10, amount: 0 },
      { id: 5, name: "Overhead", allocation: 5, amount: 0 },
    ],
  })

  const handleInputChange = (field, value) => {
    if (field === "totalBudget") {
      const budget = Number.parseFloat(value) || 0

      // Update category amounts based on allocation percentages
      const updatedCategories = formData.categories.map((category) => ({
        ...category,
        amount: Math.round(budget * (category.allocation / 100)),
      }))

      setFormData({
        ...formData,
        totalBudget: value,
        categories: updatedCategories,
      })
    } else {
      setFormData({
        ...formData,
        [field]: value,
      })
    }
  }

  const handleCategoryChange = (id, field, value) => {
    const updatedCategories = formData.categories.map((category) => {
      if (category.id === id) {
        if (field === "allocation") {
          const allocation = Number.parseFloat(value) || 0
          const totalBudget = Number.parseFloat(formData.totalBudget) || 0
          return {
            ...category,
            allocation,
            amount: Math.round(totalBudget * (allocation / 100)),
          }
        }
        return { ...category, [field]: value }
      }
      return category
    })

    setFormData({
      ...formData,
      categories: updatedCategories,
    })
  }

  const addCategory = () => {
    const newId = Math.max(...formData.categories.map((c) => c.id), 0) + 1

    // Calculate remaining allocation percentage
    const usedAllocation = formData.categories.reduce((sum, category) => sum + category.allocation, 0)
    const remainingAllocation = Math.max(0, 100 - usedAllocation)

    const totalBudget = Number.parseFloat(formData.totalBudget) || 0

    setFormData({
      ...formData,
      categories: [
        ...formData.categories,
        {
          id: newId,
          name: "",
          allocation: remainingAllocation,
          amount: Math.round(totalBudget * (remainingAllocation / 100)),
        },
      ],
    })
  }

  const removeCategory = (id) => {
    if (formData.categories.length <= 1) {
      toast({
        title: "Cannot remove category",
        description: "At least one category is required.",
        variant: "destructive",
      })
      return
    }

    const updatedCategories = formData.categories.filter((category) => category.id !== id)

    setFormData({
      ...formData,
      categories: updatedCategories,
    })
  }

  const validateForm = () => {
    if (!formData.name || !formData.project || !formData.startDate || !formData.endDate || !formData.totalBudget) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return false
    }

    const totalBudget = Number.parseFloat(formData.totalBudget)
    if (isNaN(totalBudget) || totalBudget <= 0) {
      toast({
        title: "Invalid budget amount",
        description: "Budget amount must be a positive number.",
        variant: "destructive",
      })
      return false
    }

    const totalAllocation = formData.categories.reduce((sum, category) => sum + category.allocation, 0)
    if (Math.abs(totalAllocation - 100) > 0.01) {
      toast({
        title: "Invalid allocation",
        description: "Category allocations must sum to 100%.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Budget Created",
        description: "Your budget has been created successfully.",
      })
      router.push("/dashboard/budget")
    }, 1000)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Create Budget" text="Create a new budget for your project." />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget Information</CardTitle>
            <CardDescription>Enter the basic details for your new budget.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Budget Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Q1 2025 Construction Budget"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">
                  Project <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.project}
                  onValueChange={(value) => handleInputChange("project", value)}
                  required
                >
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="opollo">Opollo Residence</SelectItem>
                    <SelectItem value="marina">Marina Complex</SelectItem>
                    <SelectItem value="office">Office Renovation</SelectItem>
                    <SelectItem value="commercial">Commercial Building</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startDate"
                    type="date"
                    className="pl-9"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">
                  End Date <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endDate"
                    type="date"
                    className="pl-9"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter budget description..."
                className="min-h-[100px]"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalBudget">
                Total Budget (KES) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="totalBudget"
                type="number"
                placeholder="e.g., 1000000"
                value={formData.totalBudget}
                onChange={(e) => handleInputChange("totalBudget", e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>Allocate your budget across different categories.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.categories.map((category) => (
              <div key={category.id} className="grid gap-4 sm:grid-cols-12 items-end border-b pb-4">
                <div className="sm:col-span-4 space-y-2">
                  <Label htmlFor={`category-name-${category.id}`}>Category Name</Label>
                  <Input
                    id={`category-name-${category.id}`}
                    value={category.name}
                    onChange={(e) => handleCategoryChange(category.id, "name", e.target.value)}
                    placeholder="e.g., Materials, Labor"
                    required
                  />
                </div>
                <div className="sm:col-span-3 space-y-2">
                  <Label htmlFor={`category-allocation-${category.id}`}>Allocation (%)</Label>
                  <Input
                    id={`category-allocation-${category.id}`}
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={category.allocation}
                    onChange={(e) =>
                      handleCategoryChange(category.id, "allocation", Number.parseFloat(e.target.value) || 0)
                    }
                    required
                  />
                </div>
                <div className="sm:col-span-4 space-y-2">
                  <Label>Amount</Label>
                  <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted flex items-center">
                    {formData.totalBudget ? formatCurrency(category.amount) : "KES 0"}
                  </div>
                </div>
                <div className="sm:col-span-1 flex justify-end">
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeCategory(category.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addCategory}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </CardContent>
          <CardFooter className="flex-col items-end space-y-2 border-t pt-6">
            <div className="flex justify-between w-full sm:w-1/2">
              <span>Total Allocation:</span>
              <span
                className={`font-medium ${Math.abs(formData.categories.reduce((sum, category) => sum + category.allocation, 0) - 100) > 0.01 ? "text-red-500" : ""}`}
              >
                {formData.categories.reduce((sum, category) => sum + category.allocation, 0).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between w-full sm:w-1/2 font-bold">
              <span>Total Budget:</span>
              <span>{formData.totalBudget ? formatCurrency(Number.parseFloat(formData.totalBudget)) : "KES 0"}</span>
            </div>
          </CardFooter>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/budget")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Budget"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  )
}
