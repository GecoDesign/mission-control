"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Star, ExternalLink, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Idea = {
  id: string
  title: string
  description: string | null
  rating: number | null
  tags: string[] | null
  status: 'idea' | 'researching' | 'testing' | 'active' | 'shelved'
  notes: string | null
  research_links: string[] | null
  created_at: string
}

const statusColors = {
  idea: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  researching: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  testing: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  active: "bg-green-500/10 text-green-500 border-green-500/20",
  shelved: "bg-red-500/10 text-red-500 border-red-500/20",
}

export function BusinessIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [showNew, setShowNew] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadIdeas()
  }, [])

  async function loadIdeas() {
    const { data } = await supabase
      .from('business_ideas')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setIdeas(data)
  }

  async function createIdea() {
    if (!newTitle.trim()) return

    const { error } = await supabase
      .from('business_ideas')
      .insert([{
        title: newTitle,
        description: newDescription || null,
        status: 'idea',
      }])

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create idea",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Idea created",
        description: "New business idea added",
      })
      setShowNew(false)
      setNewTitle("")
      setNewDescription("")
      loadIdeas()
    }
  }

  async function updateRating(id: string, rating: number) {
    await supabase
      .from('business_ideas')
      .update({ rating })
      .eq('id', id)

    loadIdeas()
  }

  async function updateStatus(id: string, status: Idea['status']) {
    await supabase
      .from('business_ideas')
      .update({ status })
      .eq('id', id)

    loadIdeas()
  }

  async function deleteIdea(id: string) {
    if (!confirm("Delete this idea?")) return

    await supabase
      .from('business_ideas')
      .delete()
      .eq('id', id)

    toast({
      title: "Idea deleted",
      description: "Business idea removed",
    })
    loadIdeas()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Business Ideas</h2>
        <Button onClick={() => setShowNew(!showNew)}>
          <Plus className="w-4 h-4 mr-2" />
          New Idea
        </Button>
      </div>

      {showNew && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Input
              placeholder="Idea title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Textarea
              placeholder="Description..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={3}
            />
            <div className="flex gap-2">
              <Button onClick={createIdea}>Add Idea</Button>
              <Button variant="outline" onClick={() => setShowNew(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {ideas.map((idea) => (
          <Card key={idea.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{idea.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteIdea(idea.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {idea.description && (
                <p className="text-sm text-muted-foreground">
                  {idea.description}
                </p>
              )}

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => updateRating(idea.id, star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          idea.rating && star <= idea.rating
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {(['idea', 'researching', 'testing', 'active', 'shelved'] as const).map((status) => (
                  <Badge
                    key={status}
                    className={`cursor-pointer ${
                      idea.status === status ? statusColors[status] : ''
                    }`}
                    variant={idea.status === status ? "default" : "outline"}
                    onClick={() => updateStatus(idea.id, status)}
                  >
                    {status}
                  </Badge>
                ))}
              </div>

              {idea.research_links && idea.research_links.length > 0 && (
                <div className="space-y-1">
                  <span className="text-sm font-medium">Links:</span>
                  {idea.research_links.map((link, i) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {link}
                    </a>
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
