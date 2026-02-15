"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Star } from "lucide-react"

type Idea = {
  id: string
  title: string
  category: string | null
  rating: number
}

export function TopIdeasWidget() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTopIdeas()
  }, [])

  async function loadTopIdeas() {
    setLoading(true)
    
    const { data } = await supabase
      .from('business_ideas')
      .select('id, title, category, rating')
      .gte('rating', 4)
      .order('rating', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(5)

    if (data) setIdeas(data)
    setLoading(false)
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Top Ideas
          </CardTitle>
          <Badge variant="outline">{ideas.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Lightbulb className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p className="text-sm">No high-rated ideas yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {ideas.map(idea => (
              <div
                key={idea.id}
                className="p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2">
                      {idea.title}
                    </p>
                    {idea.category && (
                      <Badge variant="secondary" className="mt-1.5 text-xs">
                        {idea.category}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm font-bold">{idea.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
