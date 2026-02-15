"use client"

import { BusinessIdeas } from "@/components/ideas/business-ideas"

export default function IdeasPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Business Ideas</h2>
        <p className="text-muted-foreground">
          Capture and rate your innovative ideas
        </p>
      </div>
      <BusinessIdeas />
    </div>
  )
}
