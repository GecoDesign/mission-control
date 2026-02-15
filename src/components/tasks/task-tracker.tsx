"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Calendar, Clock, Trash2 } from "lucide-react"
import { formatDate, formatMinutes } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

type Task = {
  id: string
  title: string
  description: string | null
  completed: boolean
  due_date: string | null
  time_estimate: number | null
  time_tracked: number
  created_at: string
}

export function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showNew, setShowNew] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newDueDate, setNewDueDate] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadTasks()
  }, [])

  async function loadTasks() {
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .order('completed')
      .order('due_date')

    if (data) setTasks(data)
  }

  async function createTask() {
    if (!newTitle.trim()) return

    const { error } = await supabase
      .from('tasks')
      .insert([{
        title: newTitle,
        description: newDescription || null,
        due_date: newDueDate || null,
      }])

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Task created",
        description: "New task added successfully",
      })
      setShowNew(false)
      setNewTitle("")
      setNewDescription("")
      setNewDueDate("")
      loadTasks()
    }
  }

  async function toggleTask(id: string, completed: boolean) {
    await supabase
      .from('tasks')
      .update({ completed: !completed })
      .eq('id', id)

    loadTasks()
  }

  async function deleteTask(id: string) {
    if (!confirm("Delete this task?")) return

    await supabase
      .from('tasks')
      .delete()
      .eq('id', id)

    toast({
      title: "Task deleted",
      description: "Task removed successfully",
    })
    loadTasks()
  }

  const incompleteTasks = tasks.filter(t => !t.completed)
  const completedTasks = tasks.filter(t => t.completed)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button onClick={() => setShowNew(!showNew)}>
          <Plus className="w-4 h-4 mr-2" />
          Quick Add
        </Button>
      </div>

      {showNew && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Input
              placeholder="Task title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && createTask()}
            />
            <Textarea
              placeholder="Description (optional)..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={2}
            />
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="flex-1"
              />
              <Button onClick={createTask}>Add Task</Button>
              <Button variant="outline" onClick={() => setShowNew(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {incompleteTasks.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              To Do ({incompleteTasks.length})
            </h3>
            {incompleteTasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id, task.completed)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {task.due_date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(task.due_date)}
                          </div>
                        )}
                        {task.time_estimate && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatMinutes(task.time_estimate)}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Completed ({completedTasks.length})
            </h3>
            {completedTasks.map((task) => (
              <Card key={task.id} className="opacity-60">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id, task.completed)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium line-through">{task.title}</h4>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
