"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Building, Calendar, DollarSign, MapPin, User } from "lucide-react"
import type { Project } from "@/hooks/use-projects"

interface ProjectDetailsProps {
  project: Project
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>Key details and information about the project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
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
            <div className="text-sm text-muted-foreground">ID: {project.id}</div>
          </div>
          <p className="text-sm">{project.description}</p>
          <div className="grid gap-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Due Date:</span>
              <span>{project.dueDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Location:</span>
              <span>{project.location}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Completion:</span>
              <span>{project.completion}%</span>
            </div>
            <Progress value={project.completion} className="h-2" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Budget</CardTitle>
          <CardDescription>Financial overview and budget tracking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Total Budget</div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">${project.budget.toLocaleString()}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Spent</div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">
                  ${Math.round(project.budget * (project.completion / 100)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Budget Utilization:</span>
              <span>{project.completion}%</span>
            </div>
            <Progress value={project.completion} className="h-2" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
          <CardDescription>Details about the client</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Building className="h-10 w-10 text-muted-foreground" />
            <div>
              <div className="font-medium">{project.client}</div>
              <div className="text-sm text-muted-foreground">Client</div>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Contact Person:</span>
              <span>Client Contact</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Project Team</CardTitle>
          <CardDescription>Key personnel assigned to this project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder-user.jpg" alt={project.manager.name} />
              <AvatarFallback>
                {project.manager.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{project.manager.name}</div>
              <div className="text-sm text-muted-foreground">Project Manager</div>
            </div>
          </div>
          <div className="text-sm">
            <p className="text-muted-foreground">Project created on {formatDate(project.createdAt)}</p>
            <p className="text-muted-foreground">Last updated on {formatDate(project.updatedAt)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

