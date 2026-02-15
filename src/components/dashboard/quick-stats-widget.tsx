"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CheckCircle2, TrendingUp, Target } from "lucide-react"

type Stats = {
  totalTasks: number
  completedTasks: number
  totalIdeas: number
  totalCards: number
  completionRate: number
}

export function QuickStatsWidget() {
  const [stats, setStats] = useState<Stats>({
    totalTasks: 0,
    completedTasks: 0,
    totalIdeas: 0,
    totalCards: 0,
    completionRate: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    setLoading(true)

    // Get task counts
    const { count: totalTasks } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })

    const { count: completedTasks } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('completed', true)

    // Get idea count
    const { count: totalIdeas } = await supabase
      .from('business_ideas')
      .select('*', { count: 'exact', head: true })

    // Get kanban card count
    const { count: totalCards } = await supabase
      .from('kanban_cards')
      .select('*', { count: 'exact', head: true })
      .eq('archived', false)

    const completionRate = totalTasks && completedTasks 
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0

    setStats({
      totalTasks: totalTasks || 0,
      completedTasks: completedTasks || 0,
      totalIdeas: totalIdeas || 0,
      totalCards: totalCards || 0,
      completionRate
    })
    setLoading(false)
  }

  const statItems = [
    {
      label: "Total Tasks",
      value: stats.totalTasks,
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      label: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      label: "Business Ideas",
      value: stats.totalIdeas,
      icon: TrendingUp,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      label: "Active Cards",
      value: stats.totalCards,
      icon: Activity,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ]

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-orange-500" />
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {statItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    className={`p-3 rounded-lg ${item.bgColor} border`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <span className={`text-2xl font-bold ${item.color}`}>
                        {item.value}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Completion Rate */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Completion Rate
                </span>
                <span className="text-lg font-bold text-green-500">
                  {stats.completionRate}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${stats.completionRate}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
