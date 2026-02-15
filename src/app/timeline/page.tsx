"use client"

import { ProjectTimeline } from "@/components/projects/project-timeline"

export default function TimelinePage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Project Timeline</h2>
        <p className="text-muted-foreground">
          Track your projects and milestones
        </p>
      </div>
      <ProjectTimeline />
    </div>
  )
}
