"use client"

import { useState } from "react"
import { Search, Filter, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BudgetFilters() {
  const [project, setProject] = useState("all")
  const [period, setPeriod] = useState("current-month")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search budgets..." className="w-full pl-8" />
        </div>
        <div className="flex gap-2">
          <Select value={project} onValueChange={setProject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="opollo">Opollo Residence</SelectItem>
              <SelectItem value="marina">Marina Complex</SelectItem>
              <SelectItem value="office">Office Renovation</SelectItem>
            </SelectContent>
          </Select>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="current-quarter">Current Quarter</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="current-year">Current Year</SelectItem>
              <SelectItem value="custom">Custom Period</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Budget (High to Low)</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Budget (Low to High)</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Spending (High to Low)</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Spending (Low to High)</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Variance (High to Low)</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showFilters && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="materials">Materials</SelectItem>
                <SelectItem value="labor">Labor</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="subcontractors">Subcontractors</SelectItem>
                <SelectItem value="overhead">Overhead</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="under-budget">Under Budget</SelectItem>
                <SelectItem value="on-budget">On Budget</SelectItem>
                <SelectItem value="over-budget">Over Budget</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="w-full flex gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
          </div>
          <div>
            <Button variant="outline" className="w-full">
              Reset Filters
            </Button>
          </div>
        </div>
      )}

      <Button variant="link" className="w-fit px-0" onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? "Hide Advanced Filters" : "Show Advanced Filters"}
      </Button>
    </div>
  )
}
