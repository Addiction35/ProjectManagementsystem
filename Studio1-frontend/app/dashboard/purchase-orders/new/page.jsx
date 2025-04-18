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

// Mock inventory items database
const inventoryItems = [
  { id: 1, name: "Cement", description: "Portland cement 50kg bag", unit: "Bag", price: 750 },
  { id: 2, name: "Sand", description: "River sand per ton", unit: "Ton", price: 2500 },
  { id: 3, name: "Gravel", description: "20mm crushed stone", unit: "Ton", price: 3000 },
  { id: 4, name: "Steel Bars", description: "12mm reinforcement steel", unit: "Piece", price: 1200 },
  { id: 5, name: "Bricks", description: "Standard clay bricks", unit: "Piece", price: 25 },
  { id: 6, name: "Timber", description: "2x4 treated timber", unit: "Meter", price: 350 },
  { id: 7, name: "Paint", description: "Interior emulsion paint 20L", unit: "Bucket", price: 4500 },
  { id: 8, name: "Nails", description: "3-inch galvanized nails 1kg", unit: "Kg", price: 300 },
  { id: 9, name: "Plywood", description: "18mm plywood sheet 4x8ft", unit: "Sheet", price: 2200 },
  { id: 10, name: "Concrete Blocks", description: "6-inch hollow blocks", unit: "Piece", price: 80 },
]

export default function NewPurchaseOrderPage() {
  const router = useRouter()
  const { addPurchaseOrder } = useData()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [activeItemIndex, setActiveItemIndex] = useState(null)
  const searchResultsRef = useRef(null)

  const [formData, setFormData] = useState({
    vendor: "",
    deliveryAddress: "",
    deliveryLocation: "warehouse",
    poNumber: `PO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
    reference: "",
    customerNotes: "",
    termsAndConditions: "Payment due within 30 days of delivery. All items are subject to availability.",
    items: [{ id: 1, name: "", description: "", quantity: 1, unit: "", price: 0, total: 0 }],
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
        const updatedItem = { ...item, [field]: value }

        // Recalculate total if quantity or price changes
        if (field === "quantity" || field === "price") {
          updatedItem.total = updatedItem.quantity * updatedItem.price
        }

        return updatedItem
      }
      return item
    })

    setFormData({
      ...formData,
      items: updatedItems,
    })
  }

  const addItem = () => {
    const newId = Math.max(...formData.items.map((item) => item.id), 0) + 1
    setFormData({
      ...formData,
      items: [...formData.items, { id: newId, name: "", description: "", quantity: 1, unit: "", price: 0, total: 0 }],
    })
  }

  const removeItem = (id) => {
    if (formData.items.length === 1) {
      toast({
        title: "Cannot remove item",
        description: "At least one item is required.",
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
    return formData.items.reduce((sum, item) => sum + item.total, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.16 // 16% VAT
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  // Search for items in inventory
  const handleSearch = (query, itemId) => {
    setSearchQuery(query)
    setActiveItemIndex(itemId)

    if (query.length < 2) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    // Filter items from database that match the query
    const results = inventoryItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()),
    )

    setSearchResults(results)
    setShowSearchResults(results.length > 0)
  }

  // Select item from search results
  const selectItemFromSearch = (selectedItem, itemId) => {
    const updatedItems = formData.items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          name: selectedItem.name,
          description: selectedItem.description,
          unit: selectedItem.unit,
          price: selectedItem.price,
          total: selectedItem.price * item.quantity,
        }
      }
      return item
    })

    setFormData({
      ...formData,
      items: updatedItems,
    })

    setSearchQuery("")
    setShowSearchResults(false)
    setActiveItemIndex(null)
  }

  // Create new item if not found in inventory
  const handleCreateNewItem = (itemId) => {
    const currentItem = formData.items.find((item) => item.id === itemId)

    if (!currentItem || !currentItem.name) {
      toast({
        title: "Error",
        description: "Please enter an item name to create a new item.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would add this to your database
    toast({
      title: "New Item Created",
      description: `"${currentItem.name}" has been added to your inventory.`,
    })

    setShowSearchResults(false)
    setActiveItemIndex(null)
  }

  // Handle keyboard navigation in search results
  const handleKeyDown = (e, itemId) => {
    if (!showSearchResults) return

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()

      const currentIndex = searchResults.findIndex((item) => item.id === itemId)
      let newIndex

      if (e.key === "ArrowDown") {
        newIndex = currentIndex < searchResults.length - 1 ? currentIndex + 1 : 0
      } else {
        newIndex = currentIndex > 0 ? currentIndex - 1 : searchResults.length - 1
      }

      // Scroll to the selected item
      if (searchResultsRef.current) {
        const items = searchResultsRef.current.querySelectorAll("li")
        if (items[newIndex]) {
          items[newIndex].scrollIntoView({ block: "nearest" })
        }
      }
    }

    if (e.key === "Enter") {
      e.preventDefault()

      if (searchResults.length > 0) {
        // Select the first item in the results
        selectItemFromSearch(searchResults[0], itemId)
      } else {
        // Create new item
        handleCreateNewItem(itemId)
      }
    }

    if (e.key === "Escape") {
      setShowSearchResults(false)
      setActiveItemIndex(null)
    }
  }

  // Add items in bulk
  const handleBulkAdd = () => {
    // This would typically open a modal or file upload dialog
    // For this example, we'll just add some predefined items
    const bulkItems = [
      { name: "Cement", description: "Portland cement 50kg bag", quantity: 50, unit: "Bag", price: 750 },
      { name: "Sand", description: "River sand per ton", quantity: 10, unit: "Ton", price: 2500 },
      { name: "Gravel", description: "20mm crushed stone", quantity: 8, unit: "Ton", price: 3000 },
    ]

    const lastId = Math.max(...formData.items.map((item) => item.id), 0)

    const newItems = bulkItems.map((item, index) => ({
      id: lastId + index + 1,
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      unit: item.unit,
      price: item.price,
      total: item.quantity * item.price,
    }))

    setFormData({
      ...formData,
      items: [...formData.items, ...newItems],
    })

    toast({
      title: "Items Added",
      description: `${bulkItems.length} items have been added to your purchase order.`,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.vendor || !formData.deliveryAddress) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Validate items
    const invalidItems = formData.items.some((item) => !item.name || !item.quantity || !item.price)
    if (invalidItems) {
      toast({
        title: "Invalid items",
        description: "Please fill in all item details.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Format data for submission
      const purchaseOrderData = {
        ...formData,
        date: new Date().toISOString().split("T")[0],
        expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        amount: `$${calculateTotal().toFixed(2)}`,
        status: "Pending",
      }

      await addPurchaseOrder(purchaseOrderData)

      toast({
        title: "Purchase Order Created",
        description: "Your purchase order has been created successfully.",
      })

      router.push("/purchase-orders")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create purchase order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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

  return (
    <DashboardShell>
      <DashboardHeader heading="Create Purchase Order" text="Create a new purchase order for your vendors." />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendor Information</CardTitle>
            <CardDescription>Enter vendor and delivery details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vendor">
                  Vendor Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="vendor"
                  placeholder="Enter vendor name"
                  value={formData.vendor}
                  onChange={(e) => handleInputChange("vendor", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="poNumber">PO Number</Label>
                <Input
                  id="poNumber"
                  value={formData.poNumber}
                  onChange={(e) => handleInputChange("poNumber", e.target.value)}
                  disabled
                />
                <p className="text-xs text-muted-foreground">Auto-generated</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryAddress">
                Delivery Address <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="deliveryAddress"
                placeholder="Enter delivery address"
                value={formData.deliveryAddress}
                onChange={(e) => handleInputChange("deliveryAddress", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Delivery Location</Label>
              <RadioGroup
                value={formData.deliveryLocation}
                onValueChange={(value) => handleInputChange("deliveryLocation", value)}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="warehouse" id="warehouse" />
                  <Label htmlFor="warehouse" className="cursor-pointer">
                    Warehouse
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="customer" id="customer" />
                  <Label htmlFor="customer" className="cursor-pointer">
                    Customer Site
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="reference">Reference</Label>
                <Input
                  id="reference"
                  placeholder="Enter reference number or code"
                  value={formData.reference}
                  onChange={(e) => handleInputChange("reference", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedDelivery">Expected Delivery</Label>
                <Input
                  id="expectedDelivery"
                  type="date"
                  defaultValue={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerNotes">Customer Notes</Label>
              <Textarea
                id="customerNotes"
                placeholder="Enter any special instructions or notes"
                value={formData.customerNotes}
                onChange={(e) => handleInputChange("customerNotes", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Items</CardTitle>
              <CardDescription>Add items to your purchase order.</CardDescription>
            </div>
            <Button type="button" variant="outline" onClick={handleBulkAdd}>
              <Upload className="mr-2 h-4 w-4" />
              Add Items in Bulk
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Item</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Quantity</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Unit</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Unit Price</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {formData.items.map((item) => (
                    <tr key={item.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">
                        <div className="relative">
                          <Input
                            value={item.name}
                            onChange={(e) => {
                              handleItemChange(item.id, "name", e.target.value)
                              handleSearch(e.target.value, item.id)
                            }}
                            onKeyDown={(e) => handleKeyDown(e, item.id)}
                            placeholder="Type to search items"
                            className="w-full"
                          />
                          {showSearchResults && activeItemIndex === item.id && (
                            <div
                              ref={searchResultsRef}
                              className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto"
                            >
                              <ul className="py-1">
                                {searchResults.map((result) => (
                                  <li
                                    key={result.id}
                                    className="px-4 py-2 hover:bg-muted cursor-pointer"
                                    onClick={() => selectItemFromSearch(result, item.id)}
                                  >
                                    <div className="font-medium">{result.name}</div>
                                    <div className="text-sm text-muted-foreground">{result.description}</div>
                                  </li>
                                ))}
                                {searchResults.length === 0 && (
                                  <li
                                    className="px-4 py-2 hover:bg-muted cursor-pointer border-t"
                                    onClick={() => handleCreateNewItem(item.id)}
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
                      </td>
                      <td className="p-4 align-middle">
                        <Input
                          value={item.description}
                          onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                          placeholder="Description"
                        />
                      </td>
                      <td className="p-4 align-middle">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, "quantity", Number(e.target.value) || 1)}
                          className="w-20"
                        />
                      </td>
                      <td className="p-4 align-middle">
                        <Input
                          value={item.unit}
                          onChange={(e) => handleItemChange(item.id, "unit", e.target.value)}
                          placeholder="Unit"
                          className="w-20"
                        />
                      </td>
                      <td className="p-4 align-middle">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.price}
                          onChange={(e) => handleItemChange(item.id, "price", Number(e.target.value) || 0)}
                          className="w-28"
                        />
                      </td>
                      <td className="p-4 align-middle font-medium">{(item.quantity * item.price).toFixed(2)}</td>
                      <td className="p-4 align-middle">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
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
              <span>VAT (16%):</span>
              <span>${calculateTax().toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full sm:w-1/3 font-bold">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Terms and Conditions</CardTitle>
            <CardDescription>Review and update the terms and conditions for this purchase order.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.termsAndConditions}
              onChange={(e) => handleInputChange("termsAndConditions", e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/purchase-orders")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Purchase Order"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  )
}
