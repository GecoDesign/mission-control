"use client"

import { QuickNotes } from "@/components/notes/quick-notes"

export default function NotesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Quick Notes</h2>
        <p className="text-muted-foreground">
          Capture your thoughts and ideas quickly
        </p>
      </div>
      <QuickNotes />
    </div>
  )
}
