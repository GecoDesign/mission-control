import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanCard } from "./kanban-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type Column = {
  id: string
  name: string
  position: number
}

type Card = {
  id: string
  column_id: string
  title: string
  description: string | null
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee_id: string | null
  tags: string[] | null
  position: number
  time_estimate: number | null
  archived: boolean
}

type Props = {
  column: Column
  cards: Card[]
  onCardClick: (card: Card) => void
  onAddCard: () => void
}

export function KanbanColumn({ column, cards, onCardClick, onAddCard }: Props) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  })

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
          {column.name} ({cards.length})
        </h3>
        <Button size="icon" variant="ghost" onClick={onAddCard}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 space-y-2 min-h-[200px] p-2 rounded-lg bg-muted/50"
      >
        <SortableContext
          items={cards.map(c => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card) => (
            <KanbanCard key={card.id} card={card} onClick={() => onCardClick(card)} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
