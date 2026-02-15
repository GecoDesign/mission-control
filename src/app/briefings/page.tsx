"use client"

import { DailyBriefings } from "@/components/briefings/daily-briefings"

export default function BriefingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Daily Briefings</h2>
        <p className="text-muted-foreground">
          Your daily summaries and highlights
        </p>
      </div>
      <DailyBriefings />
    </div>
  )
}
