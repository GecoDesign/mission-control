"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, TrendingUp } from "lucide-react"

type Column = {
  id: string
  name: string
}

type ColumnStats = {
  column_id: string
  column_name: string
  count: number
}

export function KanbanSummaryWidget() {
  const [stats, setStats] = useState<ColumnStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    setLoading(true)
    
    // Load columns
    const { data: columns } = await supabase
      .from('kanban_columns')
      .select('*')
      .order('position')

    if (!columns) {
      setLoading(false)
      return
    }

    // Count cards per column
    const columnStats: ColumnStats[] = []
    for (const column of columns) {
      const { count } = await supabase
        .from('kanban_cards')
        .select('*', { count: 'exact', head: true })
        .eq('column_id', column.id)
        .eq('archived', false)

      columnStats.push({
        column_id: column.id,
        column_name: column.name,
        count: count || 0
      })
    }

    setStats(columnStats)
    setLoading(false)
  }

  const totalCards = stats.reduce((sum, s) => sum + s.count, 0)

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-purple-500" />
            Kanban Board
          </CardTitle>
          <Badge variant="outline">{totalCards} cards</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 bg-muted animate-pulse rounded" />
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {stats.map(stat => (
                <div key={stat.column_id} className="flex items-center justify-between p-2 rounded hover:bg-accent transition-colors">
                  <span className="text-sm font-medium">{stat.column_name}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500"
                        style={{ width: totalCards ? `${(stat.count / totalCards) * 100}%` : '0%' }}
                      />
                    </div>
                    <Badge variant="secondary" className="min-w-[2rem] justify-center">
                      {stat.count}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {totalCards > 0 && (
              <div className="pt-4 border-t flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>Total Cards</span>
                </div>
                <span className="font-bold text-lg">{totalCards}</span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
