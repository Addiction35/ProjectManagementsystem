"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash, AlertCircle, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { simulateApiDelay, getData } from "@/lib/dummy-data"
import { BudgetExpensesTable } from "@/components/budget-expenses-table"
import { BudgetChart } from "@/components/budget-chart"
import { useProject } from "@/contexts/project-context"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectBudgetPage() {
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string
  const { selectedProject, isLoading: isProjectLoading } = useProject()
  const [isLoading, setIsLoading] = useState(true)
  const [project, setProject] = useState<any | null>(null)
  const [budget, setBudget] = useState<any | null>(null)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState<any | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    allocation: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        await simulateApiDelay()
        const projectData = getData("projects").find((p) => p.id === projectId)

        if (!projectData) {
          router.push("/dashboard/projects")
          return
        }

        // In a real app, this would fetch from an API
        const budgetData = {
          id: "BUD-001",
          projectId: projectId,
          totalBudget: projectData.budget.total,
          allocatedBudget: projectData.budget.total,
          spentBudget: projectData.budget.spent,
          remainingBudget: projectData.budget.remaining,
          categories: [
            {
              id: "BC-001",
              name: "Materials",
              allocation: projectData.budget.total * 0.4,
              spent: projectData.budget.spent * 0.4,
              remaining: projectData.budget.total * 0.4 - projectData.budget.spent * 0.4,
            },
            {
              id: "BC-002",
              name: "Labor",
              allocation: projectData.budget.total * 0.3,
              spent: projectData.budget.spent * 0.3,
              remaining: projectData.budget.total * 0.3 - projectData.budget.spent * 0.3,
            },
            {
              id: "BC-003",
              name: "Equipment",
              allocation: projectData.budget.total * 0.15,
              spent: projectData.budget.spent * 0.15,
              remaining: projectData.budget.total * 0.15 - projectData.budget.spent * 0.15,
            },
            {
              id: "BC-004",
              name: "Subcontractors",
              allocation: projectData.budget.total * 0.1,
              spent: projectData.budget.spent * 0.1,
              remaining: projectData.budget.total * 0.1 - projectData.budget.spent * 0.1,
            },
            {
              id: "BC-005",
              name: "Permits and Fees",
              allocation: projectData.budget.total * 0.05,
              spent: projectData.budget.spent * 0.05,
              remaining: projectData.budget.total * 0.05 - projectData.budget.spent * 0.05,
            },
          ],
        }

        setProject(projectData)
        setBudget(budgetData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [projectId, router])

  const handleAddCategory = async () => {
    if (!newCategory.name) {
      toast({
        title: "Validation Error",
        description: "Category name is required.",
        variant: "destructive",
      })
      return
    }

    try {
      await simulateApiDelay()
      // In a real app, this would call an API to add the category
      const newCategoryWithId = {
        id: `BC-${Date.now()}`,
        name: newCategory.name,
        allocation: newCategory.allocation,
        spent: 0,
        remaining: newCategory.allocation,
      }

      setBudget({
        ...budget,
        categories: [...budget.categories, newCategoryWithId],
      })

      setIsAddCategoryOpen(false)
      setNewCategory({ name: "", allocation: 0 })

      toast({
        title: "Category added",
        description: "Budget category has been added successfully.",
      })
    } catch (error) {
      console.error("Error adding category:", error)
      toast({
        title: "Error",
        description: "Failed to add budget category. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateCategory = async () => {
    if (!categoryToEdit) return

    try {
      await simulateApiDelay()
      // In a real app, this would call an API to update the category
      const updatedCategories = budget.categories.map((category: any) =>
        category.id === categoryToEdit.id
          ? {
              ...category,
              name: categoryToEdit.name,
              allocation: categoryToEdit.allocation,
              remaining: categoryToEdit.allocation - category.spent,
            }
          : category,
      )

      setBudget({
        ...budget,
        categories: updatedCategories,
      })

      setIsEditCategoryOpen(false)
      setCategoryToEdit(null)

      toast({
        title: "Category updated",
        description: "Budget category has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating category:", error)
      toast({
        title: "Error",
        description: "Failed to update budget category. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (confirm("Are you sure you want to delete this budget category?")) {
      try {
        await simulateApiDelay()
        // In a real app, this would call an API to delete the category
        const updatedCategories = budget.categories.filter((category: any) => category.id !== categoryId)

        setBudget({
          ...budget,
          categories: updatedCategories,
        })

        toast({
          title: "Category deleted",
          description: "Budget category has been deleted successfully.",
        })
      } catch (error) {
        console.error("Error deleting category:", error)
        toast({
          title: "Error",
          description: "Failed to delete budget category. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const openEditDialog = (category: any) => {
    setCategoryToEdit({ ...category })
    setIsEditCategoryOpen(true)
  }

  if (isLoading || isProjectLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10" />
            <div>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32 mt-1" />
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-[300px]" />
      </div>
    )
  }

  if (!project || !budget) {
    return (
      <div className="p-6 border border-destructive/50 rounded-md bg-destructive/10 text-destructive">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <h3 className="font-medium">Error loading budget</h3>
        </div>
        <p className="text-sm mt-2">There was an error loading the budget information. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project.name} Budget</h1>
          <p className="text-muted-foreground">Manage and track budget allocations for this project.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Budget Overview */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Budget</CardTitle>
                <CardDescription>Project allocated funds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${budget.totalBudget.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Spent</CardTitle>
                <CardDescription>Total expenses to date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${budget.spentBudget.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.round((budget.spentBudget / budget.totalBudget) * 100)}% of total budget
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Remaining</CardTitle>
                <CardDescription>Available funds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${budget.remainingBudget.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.round((budget.remainingBudget / budget.totalBudget) * 100)}% of total budget
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Budget Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Allocation</CardTitle>
              <CardDescription>Breakdown of budget by category</CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetChart categories={budget.categories} />
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>Latest expenses for this project</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/dashboard/projects/${projectId}/expenses`)}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <BudgetExpensesTable projectId={projectId} limit={5} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Budget Categories</CardTitle>
                <CardDescription>Allocation of funds by category</CardDescription>
              </div>
              <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Budget Category</DialogTitle>
                    <DialogDescription>Create a new budget category to track specific expenses.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Category Name</Label>
                      <Input
                        id="name"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        placeholder="e.g., Materials, Labor, Equipment"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="allocation">Allocation ($)</Label>
                      <Input
                        id="allocation"
                        type="number"
                        value={newCategory.allocation}
                        onChange={(e) =>
                          setNewCategory({ ...newCategory, allocation: Number.parseFloat(e.target.value) })
                        }
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddCategory}>Add Category</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budget.categories.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No budget categories defined. Add a category to start tracking your budget.
                  </div>
                ) : (
                  budget.categories.map((category: any) => (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{category.name}</div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(category)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id)}>
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="text-muted-foreground">Spent: </span>
                          <span>${category.spent.toLocaleString()}</span>
                          <span className="text-muted-foreground"> of </span>
                          <span>${category.allocation.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Remaining: </span>
                          <span>${category.remaining.toLocaleString()}</span>
                        </div>
                      </div>
                      <Progress value={(category.spent / category.allocation) * 100} className="h-2" />
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Expenses</CardTitle>
              <CardDescription>Complete list of expenses for this project</CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetExpensesTable projectId={projectId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget Reports</CardTitle>
              <CardDescription>Generate and view budget reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Budget vs. Actual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Expense Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Monthly Spending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Category Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Category Dialog */}
      <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Budget Category</DialogTitle>
            <DialogDescription>Update the details of this budget category.</DialogDescription>
          </DialogHeader>
          {categoryToEdit && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Category Name</Label>
                <Input
                  id="edit-name"
                  value={categoryToEdit.name}
                  onChange={(e) => setCategoryToEdit({ ...categoryToEdit, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-allocation">Allocation ($)</Label>
                <Input
                  id="edit-allocation"
                  type="number"
                  value={categoryToEdit.allocation}
                  onChange={(e) =>
                    setCategoryToEdit({ ...categoryToEdit, allocation: Number.parseFloat(e.target.value) })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Current Spent</Label>
                <div className="px-3 py-2 border rounded-md bg-muted/50">${categoryToEdit.spent.toLocaleString()}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCategoryOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
