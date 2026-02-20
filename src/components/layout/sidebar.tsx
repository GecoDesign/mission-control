"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Calendar, 
  CheckSquare, 
  Lightbulb, 
  GanttChart, 
  StickyNote,
  Wrench,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Kanban", href: "/kanban", icon: LayoutDashboard },
  { name: "Briefings", href: "/briefings", icon: Calendar },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Ideas", href: "/ideas", icon: Lightbulb },
  { name: "Timeline", href: "/timeline", icon: GanttChart },
  { name: "Tools", href: "/tools", icon: Wrench },
  { name: "Notes", href: "/notes", icon: StickyNote },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-card border-r transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                    "hover:bg-accent hover:text-accent-foreground relative",
                    isActive 
                      ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-foreground border border-blue-500/20" 
                      : "text-muted-foreground hover:text-foreground",
                    collapsed && "justify-center"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r" />
                  )}
                  <Icon className={cn(
                    "w-5 h-5 flex-shrink-0 transition-colors",
                    isActive && "text-blue-500"
                  )} />
                  {!collapsed && (
                    <span className="transition-all">{item.name}</span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
        
        <div className="p-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center hover:bg-accent"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 mr-2" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </aside>
  )
}
