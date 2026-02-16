"use client"

import { ActiveTasksWidget } from "./active-tasks-widget"
import { KanbanSummaryWidget } from "./kanban-summary-widget"
import { LatestBriefingWidget } from "./latest-briefing-widget"
import { TopIdeasWidget } from "./top-ideas-widget"
import { QuickStatsWidget } from "./quick-stats-widget"
import { ProjectProgressWidget } from "./project-progress-widget"
import { ThingsWidget } from "./things-widget"

export function DashboardView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s your overview.
        </p>
      </div>

      {/* Top Row - Stats, Tasks, Kanban, Things */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStatsWidget />
        <ActiveTasksWidget />
        <KanbanSummaryWidget />
        <ThingsWidget />
      </div>

      {/* Bottom Row - Briefing, Ideas, Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LatestBriefingWidget />
        <div className="grid grid-cols-1 gap-4">
          <TopIdeasWidget />
          <ProjectProgressWidget />
        </div>
      </div>
    </div>
  )
}
