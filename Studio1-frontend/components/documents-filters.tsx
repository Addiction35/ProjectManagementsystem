"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function DocumentsFilters() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex items-center gap-2 flex-1">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search documents..." className="flex-1" />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="File Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="folder">Folders</SelectItem>
            <SelectItem value="pdf">PDF Files</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
            <SelectItem value="spreadsheet">Spreadsheets</SelectItem>
            <SelectItem value="image">Images</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="recent">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recently Updated</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
            <SelectItem value="size">Size</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">Filter</Button>
      </div>
    </div>
  )
}

