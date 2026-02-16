"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Calendar, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDeadline, type ThingsTask } from "@/types/things"

export function ThingsWidget() {
  const [todayTasks, setTodayTasks] = useState<ThingsTask[]>([])
  const [upcomingTasks, setUpcomingTasks] = useState<ThingsTask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTasks()
    // Refresh every 5 minutes
    const interval = setInterval(loadTasks, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  async function loadTasks() {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/things?area=Work%20%20-%20Geco%20Design')
      if (!response.ok) {
        throw new Error('Failed to fetch tasks')
      }
      
      const { today, upcoming } = await response.json()
      setTodayTasks(today)
      setUpcomingTasks(upcoming)
    } catch (err) {
      console.error('Failed to load Things tasks:', err)
      setError('Unable to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const TaskItem = ({ task }: { task: ThingsTask }) => (
    <div className="flex items-start gap-3 p-2 rounded hover:bg-accent transition-colors group">
      <Circle className="w-4 h-4 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors" />
      <div className="flex-1 min-w-0 space-y-1">
        <p className="text-sm font-medium leading-tight">
          {task.title}
        </p>
        
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {task.deadline && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span className={cn(
                formatDeadline(task.deadline).includes('overdue') && "text-red-500 font-semibold"
              )}>
                {formatDeadline(task.deadline)}
              </span>
            </div>
          )}
          
          {task.tags && task.tags.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {task.tags.slice(0, 3).map((tag, idx) => (
                <Badge 
                  key={idx} 
                  variant="secondary" 
                  className="text-xs px-1.5 py-0 h-5"
                >
                  {tag}
                </Badge>
              ))}
              {task.tags.length > 3 && (
                <span className="text-muted-foreground">+{task.tags.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const EmptyState = ({ message }: { message: string }) => (
    <div className="text-center py-6 text-muted-foreground">
      <CheckCircle2 className="w-10 h-10 mx-auto mb-2 opacity-20" />
      <p className="text-sm">{message}</p>
    </div>
  )

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-purple-500" />
            Things · Geco Design
          </CardTitle>
          <Badge variant="outline">
            {todayTasks.length + upcomingTasks.length}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-muted animate-pulse rounded" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 text-muted-foreground">
            <Circle className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p className="text-sm">{error}</p>
            <p className="text-xs mt-2">Check Full Disk Access permissions</p>
          </div>
        ) : (
          <>
            {/* Today's Tasks */}
            {todayTasks.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Today
                </h3>
                <div className="space-y-1">
                  {todayTasks.map(task => (
                    <TaskItem key={task.uuid} task={task} />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Tasks */}
            {upcomingTasks.length > 0 && (
              <div className={cn(todayTasks.length > 0 && "pt-2 border-t")}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Upcoming
                </h3>
                <div className="space-y-1">
                  {upcomingTasks.slice(0, 5).map(task => (
                    <TaskItem key={task.uuid} task={task} />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {todayTasks.length === 0 && upcomingTasks.length === 0 && (
              <EmptyState message="No tasks in Work - Geco Design" />
            )}

            {/* Summary Footer */}
            {(todayTasks.length > 0 || upcomingTasks.length > 0) && (
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {todayTasks.length} today · {upcomingTasks.length} upcoming
                  </span>
                  <Tag className="w-3 h-3" />
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
