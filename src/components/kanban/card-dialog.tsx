"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Archive } from "lucide-react"

type Card = {
  id: string
  title: string
  description: string | null
  priority: 'low' | 'medium' | 'high' | 'urgent'
  tags: string[] | null
  time_estimate: number | null
}

type Props = {
  card: Card
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: () => void
}

export function CardDialog({ card, open, onOpenChange, onSave }: Props) {
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description || "")
  const [priority, setPriority] = useState(card.priority)
  const [timeEstimate, setTimeEstimate] = useState(card.time_estimate || 0)
  const { toast } = useToast()

  async function handleSave() {
    const { error } = await supabase
      .from('kanban_cards')
      .update({
        title,
        description,
        priority,
        time_estimate: timeEstimate,
      })
      .eq('id', card.id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update card",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Card updated",
        description: "Changes saved successfully",
      })
      onSave()
      onOpenChange(false)
    }
  }

  async function handleArchive() {
    const { error } = await supabase
      .from('kanban_cards')
      .update({ archived: true })
      .eq('id', card.id)

    if (!error) {
      toast({
        title: "Card archived",
        description: "Card moved to archive",
      })
      onSave()
      onOpenChange(false)
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this card?")) return

    const { error } = await supabase
      .from('kanban_cards')
      .delete()
      .eq('id', card.id)

    if (!error) {
      toast({
        title: "Card deleted",
        description: "Card removed permanently",
      })
      onSave()
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Card</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Card title"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              rows={4}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Priority</label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high', 'urgent'] as const).map((p) => (
                <Badge
                  key={p}
                  variant={priority === p ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setPriority(p)}
                >
                  {p}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Time Estimate (minutes)
            </label>
            <Input
              type="number"
              value={timeEstimate}
              onChange={(e) => setTimeEstimate(parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>

          <div className="flex justify-between pt-4">
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleArchive}>
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
