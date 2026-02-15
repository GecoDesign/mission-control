"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Calendar, Lightbulb, CheckSquare, Plus } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

type Briefing = {
  id: string
  date: string
  content: string
  business_ideas: string[] | null
  tasks: string[] | null
  bookmarked: boolean
  created_at: string
}

export function DailyBriefings() {
  const [briefings, setBriefings] = useState<Briefing[]>([])
  const [showNew, setShowNew] = useState(false)
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0])
  const [newContent, setNewContent] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadBriefings()
  }, [])

  async function loadBriefings() {
    const { data } = await supabase
      .from('daily_briefings')
      .select('*')
      .order('date', { ascending: false })

    if (data) setBriefings(data)
  }

  async function createBriefing() {
    const { error } = await supabase
      .from('daily_briefings')
      .insert([{
        date: newDate,
        content: newContent,
      }])

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create briefing",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Briefing created",
        description: "New briefing added successfully",
      })
      setShowNew(false)
      setNewContent("")
      loadBriefings()
    }
  }

  async function toggleBookmark(id: string, bookmarked: boolean) {
    await supabase
      .from('daily_briefings')
      .update({ bookmarked: !bookmarked })
      .eq('id', id)

    loadBriefings()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Daily Briefings</h2>
        <Button onClick={() => setShowNew(!showNew)}>
          <Plus className="w-4 h-4 mr-2" />
          New Briefing
        </Button>
      </div>

      {showNew && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Briefing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Date</label>
              <Input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Content</label>
              <Textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Enter briefing content..."
                rows={6}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={createBriefing}>Create</Button>
              <Button variant="outline" onClick={() => setShowNew(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {briefings.map((briefing) => (
          <Card key={briefing.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <CardTitle>{formatDate(briefing.date)}</CardTitle>
                  {briefing.bookmarked && (
                    <Bookmark className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleBookmark(briefing.id, briefing.bookmarked)}
                >
                  <Bookmark className={briefing.bookmarked ? "fill-yellow-500 text-yellow-500" : ""} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{briefing.content}</p>
              </div>

              {briefing.business_ideas && briefing.business_ideas.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Lightbulb className="w-4 h-4" />
                    Business Ideas
                  </div>
                  <div className="space-y-1">
                    {briefing.business_ideas.map((idea, i) => (
                      <div key={i} className="text-sm text-muted-foreground pl-6">
                        • {idea}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {briefing.tasks && briefing.tasks.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CheckSquare className="w-4 h-4" />
                    Tasks
                  </div>
                  <div className="space-y-1">
                    {briefing.tasks.map((task, i) => (
                      <div key={i} className="text-sm text-muted-foreground pl-6">
                        • {task}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
