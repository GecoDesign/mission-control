"use client"

import { TaskTracker } from "@/components/tasks/task-tracker"

export default function TasksPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Task Tracker</h2>
        <p className="text-muted-foreground">
          Track and manage your daily tasks
        </p>
      </div>
      <TaskTracker />
    </div>
  )
}
