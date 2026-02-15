"use client"

import { useState, useEffect } from "react"
import { DndContext, DragEndEvent, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { supabase } from "@/lib/supabase"
import { KanbanColumn } from "./kanban-column"
import { KanbanCard } from "./kanban-card"
import { CardDialog } from "./card-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([])
  const [cards, setCards] = useState<Card[]>([])
  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [showNewCard, setShowNewCard] = useState(false)
  const { toast } = useToast()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  useEffect(() => {
    loadData()
    
    // Subscribe to realtime changes
    const cardsSubscription = supabase
      .channel('kanban_cards_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'kanban_cards' }, () => {
        loadData()
      })
      .subscribe()

    return () => {
      cardsSubscription.unsubscribe()
    }
  }, [])

  async function loadData() {
    const { data: columnsData } = await supabase
      .from('kanban_columns')
      .select('*')
      .order('position')

    const { data: cardsData } = await supabase
      .from('kanban_cards')
      .select('*')
      .eq('archived', false)
      .order('position')

    if (columnsData) setColumns(columnsData)
    if (cardsData) setCards(cardsData)
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const cardId = active.id as string
    const newColumnId = over.id as string

    const card = cards.find(c => c.id === cardId)
    if (!card) return

    // Update card column
    await supabase
      .from('kanban_cards')
      .update({ column_id: newColumnId })
      .eq('id', cardId)

    toast({
      title: "Card moved",
      description: "Card successfully moved to new column",
    })

    loadData()
    setActiveCard(null)
  }

  async function createCard(title: string, columnId: string) {
    const { error } = await supabase
      .from('kanban_cards')
      .insert([{
        title,
        column_id: columnId,
        position: cards.filter(c => c.column_id === columnId).length,
      }])

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create card",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Card created",
        description: "New card added successfully",
      })
      loadData()
    }
  }

  const filteredCards = searchTerm
    ? cards.filter(card => 
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : cards

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={(event) => {
          const card = cards.find(c => c.id === event.active.id)
          if (card) setActiveCard(card)
        }}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.filter(col => col.name !== 'Archived').map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              cards={filteredCards.filter(c => c.column_id === column.id)}
              onCardClick={setSelectedCard}
              onAddCard={() => {
                const title = prompt("Card title:")
                if (title) createCard(title, column.id)
              }}
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard ? (
            <div className="rotate-3 opacity-50">
              <KanbanCard card={activeCard} onClick={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {selectedCard && (
        <CardDialog
          card={selectedCard}
          open={!!selectedCard}
          onOpenChange={(open) => !open && setSelectedCard(null)}
          onSave={loadData}
        />
      )}
    </div>
  )
}
