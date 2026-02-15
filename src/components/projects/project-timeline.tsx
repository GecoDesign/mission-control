"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, CheckCircle, Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

type Project = {
  id: string
  name: string
  description: string | null
  start_date: string | null
  end_date: string | null
  progress: number
  created_at: string
}

type Milestone = {
  id: string
  project_id: string
  title: string
  due_date: string | null
  completed: boolean
  position: number
}

export function ProjectTimeline() {
  const [projects, setProjects] = useState<Project[]>([])
  const [milestones, setMilestones] = useState<Record<string, Milestone[]>>({})
  const [showNew, setShowNew] = useState(false)
  const [newName, setNewName] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newStartDate, setNewStartDate] = useState("")
  const [newEndDate, setNewEndDate] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    const { data: projectsData } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (projectsData) {
      setProjects(projectsData)
      
      // Load milestones for each project
      const milestonesData: Record<string, Milestone[]> = {}
      for (const project of projectsData) {
        const { data } = await supabase
          .from('project_milestones')
          .select('*')
          .eq('project_id', project.id)
          .order('position')
        
        if (data) milestonesData[project.id] = data
      }
      setMilestones(milestonesData)
    }
  }

  async function createProject() {
    if (!newName.trim()) return

    const { error } = await supabase
      .from('projects')
      .insert([{
        name: newName,
        description: newDescription || null,
        start_date: newStartDate || null,
        end_date: newEndDate || null,
      }])

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Project created",
        description: "New project added successfully",
      })
      setShowNew(false)
      setNewName("")
      setNewDescription("")
      setNewStartDate("")
      setNewEndDate("")
      loadProjects()
    }
  }

  async function updateProgress(id: string, progress: number) {
    await supabase
      .from('projects')
      .update({ progress })
      .eq('id', id)

    loadProjects()
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return

    await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    toast({
      title: "Project deleted",
      description: "Project removed successfully",
    })
    loadProjects()
  }

  async function toggleMilestone(milestone: Milestone) {
    await supabase
      .from('project_milestones')
      .update({ completed: !milestone.completed })
      .eq('id', milestone.id)

    loadProjects()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Project Timeline</h2>
        <Button onClick={() => setShowNew(!showNew)}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {showNew && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Input
              placeholder="Project name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Textarea
              placeholder="Description..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={2}
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium mb-2 block">Start Date</label>
                <Input
                  type="date"
                  value={newStartDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">End Date</label>
                <Input
                  type="date"
                  value={newEndDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={createProject}>Create Project</Button>
              <Button variant="outline" onClick={() => setShowNew(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle>{project.name}</CardTitle>
                  {project.description && (
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    {project.start_date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(project.start_date)}
                      </div>
                    )}
                    {project.end_date && (
                      <span>→ {formatDate(project.end_date)}</span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteProject(project.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Progress</span>
                  <span className="text-muted-foreground">{project.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={project.progress}
                  onChange={(e) => updateProgress(project.id, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {milestones[project.id] && milestones[project.id].length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Milestones</h4>
                  {milestones[project.id].map((milestone) => (
                    <div
                      key={milestone.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <button
                        onClick={() => toggleMilestone(milestone)}
                        className="focus:outline-none"
                      >
                        <CheckCircle
                          className={`w-4 h-4 ${
                            milestone.completed
                              ? "fill-green-500 text-green-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                      <span className={milestone.completed ? "line-through text-muted-foreground" : ""}>
                        {milestone.title}
                      </span>
                      {milestone.due_date && (
                        <span className="text-xs text-muted-foreground ml-auto">
                          {formatDate(milestone.due_date)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
