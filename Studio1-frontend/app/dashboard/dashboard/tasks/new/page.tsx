"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { TaskForm } from "@/components/task-form"
import { simulateApiDelay } from "@/lib/dummy-data"

export default function NewTaskPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      await simulateApiDelay()
      // In a real app, this would save the task via API
      console.log("Creating task:", data)
      router.push("/dashboard/tasks")
    } catch (error) {
      console.error("Error creating task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/tasks">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">New Task</h1>
        </div>
      </div>

      <TaskForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
