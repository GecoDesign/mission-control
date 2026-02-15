"use client"

import { KanbanBoard } from "@/components/kanban/kanban-board"

export default function KanbanPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Kanban Board</h2>
        <p className="text-muted-foreground">
          Manage your workflow with drag-and-drop cards
        </p>
      </div>
      <KanbanBoard />
    </div>
  )
}
