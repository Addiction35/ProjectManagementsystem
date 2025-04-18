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
import { Plus, Trash } from "lucide-react"
import { useData } from "@/context/data-context"

export default function NewBillPage() {
  const router = useRouter()
  const { addBill } = useData()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    vendor: "",
    description: "",
    dueDate: "",
    source: "Purchase Order",
    sourceId: "",
    project: "Opollo Residence",
    items: [{ id: 1, name: "", description: "", quantity: 1, price: 0 }],
  })

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleItemChange = (id, field, value) => {
    const updatedItems = formData.items.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value }
      }
      return item
    })

    setFormData({
      ...formData,
      items: updatedItems,
    })
  }

  const addItem = () => {
    const newId = Math.max(...formData.items.map((i) => i.id), 0) + 1
    setFormData({
      ...formData,
      items: [...formData.items, { id: newId, name: "", description: "", quantity: 1, price: 0 }],
    })
  }

  const removeItem = (id) => {
    if (formData.items.length === 1) {
      toast({
        title: "Cannot remove item",
        description: "At least one bill item is required.",
        variant: "destructive",
      })
      return
    }

    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.id !== id),
    })
  }

  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.16 // 16% tax rate
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.vendor || !formData.description || !formData.dueDate) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Validate bill items
    const invalidItems = formData.items.some((item) => !item.name || !item.quantity || !item.price)
    if (invalidItems) {
      toast({
        title: "Invalid bill items",
        description: "Please fill in all item details.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const billData = {
        ...formData,
        date: new Date().toISOString().split("T")[0],
        amount: `$${calculateTotal().toFixed(2)}`,
        status: "Pending",
      }

      await addBill(billData)

      toast({
        title: "Bill Created",
        description: "Your bill has been created successfully.",
      })

      router.push("/dashboard/bills")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create bill. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Create Bill" text="Create a new bill for payment." />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Bill Information</CardTitle>
            <CardDescription>Enter the basic details for your bill.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vendor">
                  Vendor/Payee <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="vendor"
                  placeholder="Vendor name"
                  value={formData.vendor}
                  onChange={(e) => handleInputChange("vendor", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Select value={formData.source} onValueChange={(value) => handleInputChange("source", value)}>
                  <SelectTrigger id="source">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Purchase Order">Purchase Order</SelectItem>
                    <SelectItem value="Expense">Expense</SelectItem>
                    <SelectItem value="Wages">Wages</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sourceId">Source ID</Label>
                <Input
                  id="sourceId"
                  placeholder="e.g., PO-2025-001"
                  value={formData.sourceId}
                  onChange={(e) => handleInputChange("sourceId", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">
                  Due Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Enter bill description..."
                className="min-h-[100px]"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Input
                id="project"
                placeholder="Project name"
                value={formData.project}
                onChange={(e) => handleInputChange("project", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bill Items</CardTitle>
            <CardDescription>Add items to your bill.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.items.map((item) => (
              <div key={item.id} className="grid gap-4 sm:grid-cols-12 items-end border-b pb-4">
                <div className="sm:col-span-4 space-y-2">
                  <Label htmlFor={`item-name-${item.id}`}>Item Name</Label>
                  <Input
                    id={`item-name-${item.id}`}
                    value={item.name}
                    onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                    placeholder="e.g., Materials, Services"
                    required
                  />
                </div>
                <div className="sm:col-span-3 space-y-2">
                  <Label htmlFor={`item-description-${item.id}`}>Description</Label>
                  <Input
                    id={`item-description-${item.id}`}
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                    placeholder="Brief description"
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor={`item-quantity-${item.id}`}>Quantity</Label>
                  <Input
                    id={`item-quantity-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, "quantity", Number(e.target.value))}
                    required
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor={`item-price-${item.id}`}>Unit Price ($)</Label>
                  <Input
                    id={`item-price-${item.id}`}
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleItemChange(item.id, "price", Number(e.target.value))}
                    required
                  />
                </div>
                <div className="sm:col-span-1 flex justify-end">
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addItem}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </CardContent>
          <CardFooter className="flex-col items-end space-y-2">
            <div className="flex justify-between w-full sm:w-1/3">
              <span>Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full sm:w-1/3">
              <span>Tax (16%):</span>
              <span>${calculateTax().toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full sm:w-1/3 font-bold">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </CardFooter>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/bills")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Bill"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  )
}
