"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { TaskForm } from "@/components/task-form"
import { simulateApiDelay } from "@/lib/dummy-data"

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [task, setTask] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchTask = async () => {
      setIsLoading(true)
      try {
        await simulateApiDelay()
        // In a real app, this would fetch from an API
        const taskData = {
          id: "TASK-8782",
          title: "Site preparation",
          description:
            "Clear the site, remove debris, and prepare for foundation work. Ensure all utilities are marked and protected.",
          status: "InProgress",
          priority: "High",
          dueDate: new Date("2023-09-15"),
          projectId: "PRJ-001",
          assigneeId: "EMP-001",
        }

        setTask(taskData)
      } catch (error) {
        console.error("Error fetching task:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchTask()
    }
  }, [params.id])

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      await simulateApiDelay()
      // In a real app, this would update the task via API
      console.log("Updating task:", data)
      router.push(`/dashboard/tasks/${params.id}`)
    } catch (error) {
      console.error("Error updating task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/tasks/${params.id}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Edit Task</h1>
        </div>
      </div>

      <TaskForm defaultValues={task} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
