"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Plus, Trash, Upload } from "lucide-react"
import { useData } from "@/context/data-context"

// Mock expense categories database
const expenseCategories = [
  { id: 1, name: "Travel", description: "Travel expenses including flights, accommodation, and transportation" },
  { id: 2, name: "Office Supplies", description: "Office supplies and stationery" },
  { id: 3, name: "Equipment", description: "Tools and equipment purchases or rentals" },
  { id: 4, name: "Software", description: "Software licenses and subscriptions" },
  { id: 5, name: "Training", description: "Training courses and educational materials" },
  { id: 6, name: "Meals", description: "Business meals and entertainment" },
  { id: 7, name: "Utilities", description: "Electricity, water, internet, and phone bills" },
  { id: 8, name: "Rent", description: "Office or workspace rent" },
  { id: 9, name: "Maintenance", description: "Repairs and maintenance costs" },
  { id: 10, name: "Other", description: "Miscellaneous expenses" },
]

export default function NewExpensePage() {
  const router = useRouter()
  const { addExpense } = useData()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [activeItemIndex, setActiveItemIndex] = useState(null)
  const searchResultsRef = useRef(null)

  const [formData, setFormData] = useState({
    category: "",
    description: "",
    submittedBy: "",
    project: "",
    expenseDate: new Date().toISOString().split("T")[0],
    reference: "",
    paymentMethod: "company-card",
    notes: "",
    details: [{ id: 1, item: "", description: "", amount: 0, receiptAttached: false }],
  })

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleDetailChange = (id, field, value) => {
    const updatedDetails = formData.details.map((detail) => {
      if (detail.id === id) {
        return { ...detail, [field]: value }
      }
      return detail
    })

    setFormData({
      ...formData,
      details: updatedDetails,
    })
  }

  const addDetail = () => {
    const newId = Math.max(...formData.details.map((d) => d.id), 0) + 1
    setFormData({
      ...formData,
      details: [...formData.details, { id: newId, item: "", description: "", amount: 0, receiptAttached: false }],
    })
  }

  const removeDetail = (id) => {
    if (formData.details.length === 1) {
      toast({
        title: "Cannot remove item",
        description: "At least one expense item is required.",
        variant: "destructive",
      })
      return
    }

    setFormData({
      ...formData,
      details: formData.details.filter((detail) => detail.id !== id),
    })
  }

  const calculateTotal = () => {
    return formData.details.reduce((sum, detail) => sum + Number(detail.amount), 0)
  }

  // Search for expense categories
  const handleSearch = (query, itemId) => {
    setSearchQuery(query)
    setActiveItemIndex(itemId)

    if (query.length < 2) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    // Filter categories from database that match the query
    const results = expenseCategories.filter(
      (category) =>
        category.name.toLowerCase().includes(query.toLowerCase()) ||
        category.description.toLowerCase().includes(query.toLowerCase()),
    )

    setSearchResults(results)
    setShowSearchResults(results.length > 0)
  }

  // Select category from search results
  const selectCategoryFromSearch = (selectedCategory) => {
    setFormData({
      ...formData,
      category: selectedCategory.name,
    })

    setSearchQuery("")
    setShowSearchResults(false)
    setActiveItemIndex(null)
  }

  // Create new category if not found
  const handleCreateNewCategory = () => {
    if (!searchQuery) {
      toast({
        title: "Error",
        description: "Please enter a category name to create a new category.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would add this to your database
    toast({
      title: "New Expense Category Created",
      description: `"${searchQuery}" has been added to your expense categories.`,
    })

    setFormData({
      ...formData,
      category: searchQuery,
    })

    setShowSearchResults(false)
    setActiveItemIndex(null)
  }

  // Handle keyboard navigation in search results
  const handleKeyDown = (e) => {
    if (!showSearchResults) return

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()

      // Would implement keyboard navigation here
    }

    if (e.key === "Enter") {
      e.preventDefault()

      if (searchResults.length > 0) {
        // Select the first category in the results
        selectCategoryFromSearch(searchResults[0])
      } else {
        // Create new category
        handleCreateNewCategory()
      }
    }

    if (e.key === "Escape") {
      setShowSearchResults(false)
      setActiveItemIndex(null)
    }
  }

  // Add items in bulk (e.g., from a receipt scanner)
  const handleBulkAdd = () => {
    // This would typically open a modal or file upload dialog
    // For this example, we'll just add some predefined items
    const bulkItems = [
      { item: "Flight Ticket", description: "Round trip to New York", amount: 450 },
      { item: "Hotel", description: "3 nights at Hilton", amount: 600 },
      { item: "Meals", description: "Business dinners", amount: 150 },
    ]

    const lastId = Math.max(...formData.details.map((detail) => detail.id), 0)

    const newDetails = bulkItems.map((item, index) => ({
      id: lastId + index + 1,
      item: item.item,
      description: item.description,
      amount: item.amount,
      receiptAttached: true,
    }))

    setFormData({
      ...formData,
      details: [...formData.details, ...newDetails],
    })

    toast({
      title: "Items Added",
      description: `${bulkItems.length} items have been added to your expense report.`,
    })
  }

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.category || !formData.description || !formData.submittedBy) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Validate expense items
    const invalidItems = formData.details.some((detail) => !detail.item || !detail.amount)
    if (invalidItems) {
      toast({
        title: "Invalid expense items",
        description: "Please fill in all expense item details.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const expenseData = {
        ...formData,
        date: formData.expenseDate,
        amount: `$${calculateTotal().toFixed(2)}`,
        status: "Pending",
      }

      await addExpense(expenseData)

      toast({
        title: "Expense Created",
        description: "Your expense has been created successfully.",
      })

      router.push("/expenses")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create expense. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Create Expense" text="Create a new expense record." />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Expense Information</CardTitle>
            <CardDescription>Enter the basic details for your expense.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="category"
                  placeholder="Type to search categories"
                  value={formData.category}
                  onChange={(e) => {
                    handleInputChange("category", e.target.value)
                    handleSearch(e.target.value)
                  }}
                  onKeyDown={handleKeyDown}
                  required
                />
                {showSearchResults && (
                  <div
                    ref={searchResultsRef}
                    className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto"
                  >
                    <ul className="py-1">
                      {searchResults.map((result) => (
                        <li
                          key={result.id}
                          className="px-4 py-2 hover:bg-muted cursor-pointer"
                          onClick={() => selectCategoryFromSearch(result)}
                        >
                          <div className="font-medium">{result.name}</div>
                          <div className="text-sm text-muted-foreground">{result.description}</div>
                        </li>
                      ))}
                      {searchResults.length === 0 && searchQuery.length >= 2 && (
                        <li
                          className="px-4 py-2 hover:bg-muted cursor-pointer border-t"
                          onClick={handleCreateNewCategory}
                        >
                          <div className="flex items-center text-primary">
                            <Plus className="h-4 w-4 mr-2" />
                            Create "{searchQuery}"
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="submittedBy">
                  Submitted By <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="submittedBy"
                  placeholder="Your name"
                  value={formData.submittedBy}
                  onChange={(e) => handleInputChange("submittedBy", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expenseDate">
                  Expense Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="expenseDate"
                  type="date"
                  value={formData.expenseDate}
                  onChange={(e) => handleInputChange("expenseDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Input
                  id="project"
                  placeholder="Project name"
                  value={formData.project}
                  onChange={(e) => handleInputChange("project", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reference">Reference</Label>
                <Input
                  id="reference"
                  placeholder="Reference number or code"
                  value={formData.reference}
                  onChange={(e) => handleInputChange("reference", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Enter expense description..."
                className="min-h-[100px]"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => handleInputChange("paymentMethod", value)}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company-card" id="company-card" />
                  <Label htmlFor="company-card" className="cursor-pointer">
                    Company Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personal-card" id="personal-card" />
                  <Label htmlFor="personal-card" className="cursor-pointer">
                    Personal Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash-expense" />
                  <Label htmlFor="cash-expense" className="cursor-pointer">
                    Cash
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Expense Items</CardTitle>
              <CardDescription>Add items to your expense report.</CardDescription>
            </div>
            <Button type="button" variant="outline" onClick={handleBulkAdd}>
              <Upload className="mr-2 h-4 w-4" />
              Add from Receipt
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Item</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Receipt</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {formData.details.map((detail) => (
                    <tr key={detail.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">
                        <Input
                          value={detail.item}
                          onChange={(e) => handleDetailChange(detail.id, "item", e.target.value)}
                          placeholder="Expense item"
                          required
                        />
                      </td>
                      <td className="p-4 align-middle">
                        <Input
                          value={detail.description}
                          onChange={(e) => handleDetailChange(detail.id, "description", e.target.value)}
                          placeholder="Description"
                        />
                      </td>
                      <td className="p-4 align-middle">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={detail.amount}
                          onChange={(e) => handleDetailChange(detail.id, "amount", Number(e.target.value) || 0)}
                          className="w-28"
                          required
                        />
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`receipt-${detail.id}`}
                            checked={detail.receiptAttached}
                            onChange={(e) => handleDetailChange(detail.id, "receiptAttached", e.target.checked)}
                            className="mr-2"
                          />
                          <Label htmlFor={`receipt-${detail.id}`} className="cursor-pointer">
                            Attached
                          </Label>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeDetail(detail.id)}
                          className="h-8 w-8"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Button type="button" variant="outline" onClick={addDetail}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </CardContent>
          <CardFooter className="flex-col items-end space-y-2">
            <div className="flex justify-between w-full sm:w-1/3 font-bold">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
            <CardDescription>Add any additional information about this expense.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Enter any additional notes or context for this expense..."
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/expenses")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Expense"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  )
}
