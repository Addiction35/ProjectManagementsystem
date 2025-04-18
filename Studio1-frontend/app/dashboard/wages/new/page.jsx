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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Plus } from "lucide-react"
import { useData } from "@/context/data-context"

// Mock employees database
const employees = [
  {
    id: 1,
    name: "John Smith",
    position: "Site Engineer",
    department: "Engineering",
    regularRate: 40,
    overtimeRate: 60,
  },
  { id: 2, name: "Jane Doe", position: "Project Manager", department: "Management", regularRate: 50, overtimeRate: 75 },
  {
    id: 3,
    name: "Robert Johnson",
    position: "Foreman",
    department: "Construction",
    regularRate: 35,
    overtimeRate: 52.5,
  },
  { id: 4, name: "Emily Williams", position: "Architect", department: "Design", regularRate: 45, overtimeRate: 67.5 },
  {
    id: 5,
    name: "Michael Brown",
    position: "Electrician",
    department: "Electrical",
    regularRate: 30,
    overtimeRate: 45,
  },
  { id: 6, name: "Sarah Miller", position: "Plumber", department: "Plumbing", regularRate: 30, overtimeRate: 45 },
  { id: 7, name: "David Wilson", position: "Carpenter", department: "Carpentry", regularRate: 28, overtimeRate: 42 },
  { id: 8, name: "Lisa Taylor", position: "Accountant", department: "Finance", regularRate: 38, overtimeRate: 57 },
]

export default function NewWagePage() {
  const router = useRouter()
  const { addWage } = useData()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchResultsRef = useRef(null)

  const [formData, setFormData] = useState({
    employee: "",
    position: "",
    department: "",
    payPeriod: "",
    paymentMethod: "bank",
    reference: "",
    notes: "",
    details: {
      regularHours: 80,
      overtimeHours: 0,
      regularRate: 0,
      overtimeRate: 0,
      allowances: 0,
      deductions: 0,
    },
  })

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [field]: value,
      })
    }
  }

  // Calculate totals
  const calculateRegularPay = () => {
    return formData.details.regularHours * formData.details.regularRate
  }

  const calculateOvertimePay = () => {
    return formData.details.overtimeHours * formData.details.overtimeRate
  }

  const calculateGrossPay = () => {
    return calculateRegularPay() + calculateOvertimePay() + Number(formData.details.allowances || 0)
  }

  const calculateNetPay = () => {
    return calculateGrossPay() - Number(formData.details.deductions || 0)
  }

  // Search for employees
  const handleSearch = (query) => {
    setSearchQuery(query)

    if (query.length < 2) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    // Filter employees from database that match the query
    const results = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query.toLowerCase()) ||
        employee.position.toLowerCase().includes(query.toLowerCase()) ||
        employee.department.toLowerCase().includes(query.toLowerCase()),
    )

    setSearchResults(results)
    setShowSearchResults(results.length > 0)
  }

  // Select employee from search results
  const selectEmployeeFromSearch = (selectedEmployee) => {
    setFormData({
      ...formData,
      employee: selectedEmployee.name,
      position: selectedEmployee.position,
      department: selectedEmployee.department,
      details: {
        ...formData.details,
        regularRate: selectedEmployee.regularRate,
        overtimeRate: selectedEmployee.overtimeRate,
      },
    })

    setSearchQuery("")
    setShowSearchResults(false)
  }

  // Create new employee if not found
  const handleCreateNewEmployee = () => {
    if (!searchQuery) {
      toast({
        title: "Error",
        description: "Please enter an employee name to create a new record.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would add this to your database
    toast({
      title: "New Employee Record Created",
      description: `"${searchQuery}" has been added to your employee database.`,
    })

    setFormData({
      ...formData,
      employee: searchQuery,
    })

    setShowSearchResults(false)
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
        // Select the first employee in the results
        selectEmployeeFromSearch(searchResults[0])
      } else {
        // Create new employee
        handleCreateNewEmployee()
      }
    }

    if (e.key === "Escape") {
      setShowSearchResults(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.employee || !formData.department || !formData.payPeriod) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const wageData = {
        ...formData,
        date: new Date().toISOString().split("T")[0],
        amount: `$${calculateNetPay().toFixed(2)}`,
        status: "Pending",
      }

      await addWage(wageData)

      toast({
        title: "Wage Record Created",
        description: "Your wage record has been created successfully.",
      })

      router.push("/wages")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create wage record. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Create Wage Record" text="Create a new wage payment record." />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Employee Information</CardTitle>
            <CardDescription>Enter employee and payment details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employee">
                Employee Name <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="employee"
                  placeholder="Type to search employees"
                  value={formData.employee}
                  onChange={(e) => {
                    handleInputChange("employee", e.target.value)
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
                          onClick={() => selectEmployeeFromSearch(result)}
                        >
                          <div className="font-medium">{result.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {result.position} - {result.department}
                          </div>
                        </li>
                      ))}
                      {searchResults.length === 0 && searchQuery.length >= 2 && (
                        <li
                          className="px-4 py-2 hover:bg-muted cursor-pointer border-t"
                          onClick={handleCreateNewEmployee}
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
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  placeholder="Employee position"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">
                  Department <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="department"
                  placeholder="Employee department"
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="payPeriod">
                  Pay Period <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.payPeriod} onValueChange={(value) => handleInputChange("payPeriod", value)}>
                  <SelectTrigger id="payPeriod">
                    <SelectValue placeholder="Select pay period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mar 1-15, 2025">Mar 1-15, 2025</SelectItem>
                    <SelectItem value="Mar 16-31, 2025">Mar 16-31, 2025</SelectItem>
                    <SelectItem value="Apr 1-15, 2025">Apr 1-15, 2025</SelectItem>
                    <SelectItem value="Apr 16-30, 2025">Apr 16-30, 2025</SelectItem>
                  </SelectContent>
                </Select>
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
              <Label>Payment Method</Label>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => handleInputChange("paymentMethod", value)}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="cursor-pointer">
                    Bank Transfer
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="cursor-pointer">
                    Cash
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="check" id="check" />
                  <Label htmlFor="check" className="cursor-pointer">
                    Check
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Enter hours worked and payment rates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="regularHours">Regular Hours</Label>
                <Input
                  id="regularHours"
                  type="number"
                  min="0"
                  value={formData.details.regularHours}
                  onChange={(e) => handleInputChange("details.regularHours", Number(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="overtimeHours">Overtime Hours</Label>
                <Input
                  id="overtimeHours"
                  type="number"
                  min="0"
                  value={formData.details.overtimeHours}
                  onChange={(e) => handleInputChange("details.overtimeHours", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="regularRate">Regular Rate ($/hour)</Label>
                <Input
                  id="regularRate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.details.regularRate}
                  onChange={(e) => handleInputChange("details.regularRate", Number(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="overtimeRate">Overtime Rate ($/hour)</Label>
                <Input
                  id="overtimeRate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.details.overtimeRate}
                  onChange={(e) => handleInputChange("details.overtimeRate", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="allowances">Allowances ($)</Label>
                <Input
                  id="allowances"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.details.allowances}
                  onChange={(e) => handleInputChange("details.allowances", Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deductions">Deductions ($)</Label>
                <Input
                  id="deductions"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.details.deductions}
                  onChange={(e) => handleInputChange("details.deductions", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter any additional notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-end space-y-2">
            <div className="flex justify-between w-full sm:w-1/2">
              <span>Regular Pay:</span>
              <span>${calculateRegularPay().toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full sm:w-1/2">
              <span>Overtime Pay:</span>
              <span>${calculateOvertimePay().toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full sm:w-1/2">
              <span>Allowances:</span>
              <span>${Number(formData.details.allowances || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full sm:w-1/2">
              <span>Gross Pay:</span>
              <span>${calculateGrossPay().toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full sm:w-1/2">
              <span>Deductions:</span>
              <span>${Number(formData.details.deductions || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full sm:w-1/2 font-bold">
              <span>Net Pay:</span>
              <span>${calculateNetPay().toFixed(2)}</span>
            </div>
          </CardFooter>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/wages")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Wage Record"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  )
}
