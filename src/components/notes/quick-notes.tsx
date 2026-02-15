"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import ReactMarkdown from "react-markdown"

export function QuickNotes() {
  const [content, setContent] = useState("")
  const [noteId, setNoteId] = useState<string | null>(null)
  const [isPreview, setIsPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadNote()
  }, [])

  useEffect(() => {
    // Auto-save after 1 second of no typing
    const timer = setTimeout(() => {
      if (content && noteId) {
        saveNote()
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [content])

  async function loadNote() {
    const { data } = await supabase
      .from('quick_notes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (data) {
      setContent(data.content)
      setNoteId(data.id)
    } else {
      // Create initial note
      const { data: newNote } = await supabase
        .from('quick_notes')
        .insert([{ content: "" }])
        .select()
        .single()

      if (newNote) {
        setNoteId(newNote.id)
      }
    }
  }

  async function saveNote() {
    if (!noteId) return

    setIsSaving(true)
    const { error } = await supabase
      .from('quick_notes')
      .update({ content })
      .eq('id', noteId)

    setIsSaving(false)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save note",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quick Notes</h2>
        <div className="flex items-center gap-2">
          {isSaving && (
            <span className="text-sm text-muted-foreground">Saving...</span>
          )}
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {isPreview ? "Edit" : "Preview"}
          </button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          {isPreview ? (
            <div className="prose prose-sm dark:prose-invert max-w-none min-h-[400px]">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          ) : (
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start typing... Markdown supported!"
              className="min-h-[400px] resize-none font-mono text-sm"
            />
          )}
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground">
        <p>✨ Markdown supported: **bold**, *italic*, [links](url), # headers, - lists</p>
        <p>💾 Auto-saves after 1 second</p>
      </div>
    </div>
  )
}
