"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText } from "lucide-react"
import { formatDate } from "@/lib/utils"

type Briefing = {
  id: string
  date: string
  summary: string
  highlights: string[] | null
}

export function LatestBriefingWidget() {
  const [briefing, setBriefing] = useState<Briefing | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLatestBriefing()
  }, [])

  async function loadLatestBriefing() {
    setLoading(true)
    const today = new Date().toISOString().split('T')[0]
    
    const { data } = await supabase
      .from('briefings')
      .select('*')
      .lte('date', today)
      .order('date', { ascending: false })
      .limit(1)
      .single()

    if (data) setBriefing(data)
    setLoading(false)
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-500" />
          Latest Briefing
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
            <div className="h-20 bg-muted animate-pulse rounded" />
            <div className="space-y-2">
              <div className="h-3 bg-muted animate-pulse rounded" />
              <div className="h-3 bg-muted animate-pulse rounded w-5/6" />
            </div>
          </div>
        ) : briefing ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {formatDate(briefing.date)}
            </div>
            
            <p className="text-sm leading-relaxed">
              {briefing.summary}
            </p>

            {briefing.highlights && briefing.highlights.length > 0 && (
              <div className="pt-3 border-t space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Key Highlights
                </div>
                <ul className="space-y-1.5">
                  {briefing.highlights.slice(0, 3).map((highlight, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p className="text-sm">No briefing available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
