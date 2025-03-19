"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { FileText, FileImage, FileSpreadsheet, File, Folder, MoreHorizontal, Download } from "lucide-react"

export function DocumentsGrid() {
  const documents = [
    {
      id: "DOC-001",
      name: "Project Plans",
      type: "folder",
      items: 12,
      updatedAt: "2 days ago",
    },
    {
      id: "DOC-002",
      name: "Contracts",
      type: "folder",
      items: 8,
      updatedAt: "1 week ago",
    },
    {
      id: "DOC-003",
      name: "Site Photos",
      type: "folder",
      items: 24,
      updatedAt: "3 days ago",
    },
    {
      id: "DOC-004",
      name: "Project_Alpha_Blueprint.pdf",
      type: "pdf",
      size: "4.2 MB",
      updatedAt: "1 day ago",
    },
    {
      id: "DOC-005",
      name: "Construction_Schedule.xlsx",
      type: "spreadsheet",
      size: "1.8 MB",
      updatedAt: "5 days ago",
    },
    {
      id: "DOC-006",
      name: "Site_Inspection_Report.docx",
      type: "document",
      size: "2.3 MB",
      updatedAt: "2 days ago",
    },
    {
      id: "DOC-007",
      name: "Aerial_View.jpg",
      type: "image",
      size: "5.7 MB",
      updatedAt: "1 week ago",
    },
    {
      id: "DOC-008",
      name: "Material_Specifications.pdf",
      type: "pdf",
      size: "3.1 MB",
      updatedAt: "3 days ago",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <Folder className="h-8 w-8 text-blue-500" />
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />
      case "document":
        return <FileText className="h-8 w-8 text-blue-500" />
      case "spreadsheet":
        return <FileSpreadsheet className="h-8 w-8 text-green-500" />
      case "image":
        return <FileImage className="h-8 w-8 text-purple-500" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {documents.map((doc) => (
        <Card key={doc.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex flex-col items-center justify-center py-4">
              {getIcon(doc.type)}
              <h3 className="mt-2 text-sm font-medium text-center truncate w-full">{doc.name}</h3>
              <div className="mt-1 text-xs text-muted-foreground">
                {doc.type === "folder" ? <span>{doc.items} items</span> : <span>{doc.size}</span>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-4 pt-0">
            <div className="text-xs text-muted-foreground">{doc.updatedAt}</div>
            <div className="flex gap-1">
              {doc.type !== "folder" && (
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

