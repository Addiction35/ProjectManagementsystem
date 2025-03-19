"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Trash, Eye } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useProjects } from "@/hooks/use-projects"
import { useState } from "react"
import { DeleteProjectDialog } from "@/components/delete-project-dialog"
import { useRouter } from "next/navigation"

export function ProjectsTable() {
  const router = useRouter()
  const { projects, isLoading, isError, error } = useProjects()
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)

  // Handle edit project
  const handleEditProject = (projectId: string) => {
    router.push(`/dashboard/projects/${projectId}/edit`)
  }

  // Handle view project
  const handleViewProject = (projectId: string) => {
    router.push(`/dashboard/projects/${projectId}`)
  }

  // Handle delete project
  const handleDeleteClick = (projectId: string) => {
    setProjectToDelete(projectId)
  }

  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    setProjectToDelete(null)
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Loading projects...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Error loading projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border border-destructive/50 rounded-md bg-destructive/10 text-destructive">
            <h3 className="font-medium">Error loading projects</h3>
            <p className="text-sm">{error?.message || "An unknown error occurred"}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Overview of your active construction projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Completion</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects?.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <Link href={`/dashboard/projects/${project.id}`} className="hover:underline">
                      {project.name}
                    </Link>
                    <div className="text-xs text-muted-foreground">{project.id}</div>
                  </TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.status === "Completed"
                          ? "outline"
                          : project.status === "In Progress"
                            ? "default"
                            : project.status === "On Hold"
                              ? "secondary"
                              : project.status === "Cancelled"
                                ? "destructive"
                                : "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${project.budget.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-[80px] h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${project.completion}%` }}></div>
                      </div>
                      <span className="text-xs">{project.completion}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{project.dueDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewProject(project.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditProject(project.id)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(project.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {projects?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No projects found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Project Dialog */}
      <DeleteProjectDialog projectId={projectToDelete} onClose={handleCloseDeleteDialog} />
    </>
  )
}

