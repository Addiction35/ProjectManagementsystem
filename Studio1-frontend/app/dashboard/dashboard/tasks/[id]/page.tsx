"use client"

import { TaskDetail } from "@/components/task-detail"

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  return <TaskDetail taskId={params.id} />
}
