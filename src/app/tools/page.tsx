"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, ExternalLink, Calendar, FileCode } from "lucide-react"

const tools = [
  // February 20, 2026
  {
    name: "Crypto Trading Signals Dashboard",
    description: "Real-time trading signals for Base & Pulse portfolio with RSI, MA, volume analysis",
    category: "crypto",
    file: "crypto-trading-signals.html",
    size: "13 KB",
    date: "2026-02-20",
    time: "11:15"
  },
  {
    name: "Service Landing Page Generator",
    description: "Create conversion-optimized landing pages for Construction, Professional Services, Web Design",
    category: "marketing",
    file: "service-landing-page-generator.html",
    size: "19 KB",
    date: "2026-02-20",
    time: "11:14"
  },
  {
    name: "Brand Style Guide Generator",
    description: "Create professional brand guidelines with colors, typography, logo usage - PDF export",
    category: "client",
    file: "brand-style-guide-generator.html",
    size: "19 KB",
    date: "2026-02-20",
    time: "11:13"
  },
  {
    name: "Website Performance Analyzer",
    description: "Comprehensive website audits with performance, SEO, accessibility, best practices scores",
    category: "client",
    file: "website-performance-analyzer.html",
    size: "16 KB",
    date: "2026-02-20",
    time: "11:12"
  },
  // February 19, 2026
  {
    name: "Digital Marketing Service Page",
    description: "Full service page for geco.design digital marketing offerings",
    category: "geco",
    file: "digital-marketing.html",
    size: "46 KB",
    date: "2026-02-19",
    time: "19:19"
  },
  {
    name: "Website Design Service Page",
    description: "Full service page for geco.design website design offerings",
    category: "geco",
    file: "website-design.html",
    size: "38 KB",
    date: "2026-02-19",
    time: "19:19"
  },
  {
    name: "Crypto Portfolio Dashboard",
    description: "Portfolio tracking for Base & Pulse tokens with price monitoring",
    category: "crypto",
    file: "crypto-portfolio-dashboard.html",
    size: "46 KB",
    date: "2026-02-19",
    time: "18:19"
  },
  {
    name: "Project Delivery Manager",
    description: "Track project milestones, deliverables, and client approvals",
    category: "client",
    file: "project-delivery-manager.html",
    size: "74 KB",
    date: "2026-02-19",
    time: "07:02"
  },
  {
    name: "Email Outreach Campaign Builder",
    description: "Create and track email campaigns for client outreach",
    category: "marketing",
    file: "email-outreach-builder.html",
    size: "59 KB",
    date: "2026-02-19",
    time: "06:31"
  },
  {
    name: "Lead Magnet Generator",
    description: "Create valuable lead magnets and downloadable guides",
    category: "marketing",
    file: "lead-magnet-generator.html",
    size: "63 KB",
    date: "2026-02-19",
    time: "05:31"
  },
  {
    name: "SEO Performance Tracker",
    description: "Track keyword rankings, backlinks, and SEO metrics",
    category: "marketing",
    file: "seo-performance-tracker.html",
    size: "59 KB",
    date: "2026-02-19",
    time: "05:00"
  },
  // February 18, 2026
  {
    name: "Business Toolkit Hub",
    description: "Central hub linking all business tools and resources",
    category: "business",
    file: "index.html",
    size: "42 KB",
    date: "2026-02-18",
    time: "18:31"
  },
  {
    name: "Competitor Intelligence Dashboard",
    description: "Track competitor websites, pricing, and marketing strategies",
    category: "marketing",
    file: "competitor-intelligence.html",
    size: "51 KB",
    date: "2026-02-18",
    time: "18:31"
  },
  {
    name: "Daily Briefing Assistant",
    description: "Morning briefing template with tasks, calendar, and priorities",
    category: "business",
    file: "daily-briefing-assistant.html",
    size: "33 KB",
    date: "2026-02-18",
    time: "05:30"
  },
  // February 17, 2026
  {
    name: "Service Pricing Database",
    description: "Manage service pricing, packages, and client quotes",
    category: "client",
    file: "service-pricing-database.html",
    size: "66 KB",
    date: "2026-02-17",
    time: "23:31"
  },
  {
    name: "Project Time Tracker",
    description: "Track time spent on projects and generate reports",
    category: "business",
    file: "project-time-tracker.html",
    size: "55 KB",
    date: "2026-02-17",
    time: "21:30"
  },
  {
    name: "Client Meeting Tracker",
    description: "Log client meetings, notes, and action items",
    category: "client",
    file: "client-meeting-tracker.html",
    size: "47 KB",
    date: "2026-02-17",
    time: "20:00"
  },
  {
    name: "Local Business Prospecting Tool",
    description: "Find and track local business prospects for outreach",
    category: "marketing",
    file: "local-business-prospecting.html",
    size: "45 KB",
    date: "2026-02-17",
    time: "18:30"
  },
  {
    name: "Backlink Outreach Manager",
    description: "Track backlink opportunities and outreach campaigns",
    category: "marketing",
    file: "backlink-outreach.html",
    size: "55 KB",
    date: "2026-02-17",
    time: "07:30"
  },
  {
    name: "SEO Tracker",
    description: "Monitor SEO performance and keyword rankings",
    category: "marketing",
    file: "seo-tracker.html",
    size: "51 KB",
    date: "2026-02-17",
    time: "07:00"
  }
]

const categories = [
  { value: "all", label: "All Tools", color: "default" },
  { value: "client", label: "Client Tools", color: "blue" },
  { value: "marketing", label: "Marketing", color: "green" },
  { value: "crypto", label: "Crypto", color: "purple" },
  { value: "business", label: "Business", color: "orange" },
  { value: "geco", label: "Geco Design", color: "pink" }
]

const getCategoryColor = (category: string) => {
  const cat = categories.find(c => c.value === category)
  return cat?.color || "default"
}

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Group by date
  const toolsByDate = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.date]) {
      acc[tool.date] = []
    }
    acc[tool.date].push(tool)
    return acc
  }, {} as Record<string, typeof tools>)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">🛠️ Tools Catalog</h1>
        <p className="text-muted-foreground mt-2">
          All autonomous builds and tools created by MiniMe
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tools</CardTitle>
            <FileCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tools.length}</div>
            <p className="text-xs text-muted-foreground">Across 4 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Build</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Feb 20</div>
            <p className="text-xs text-muted-foreground">Crypto Trading Signals</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Client, Marketing, Crypto, Business, Geco</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tools List */}
      {Object.entries(toolsByDate)
        .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
        .map(([date, dateTools]) => (
          <div key={date} className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {formatDate(date)}
            </h2>
            
            <div className="grid gap-4">
              {dateTools.map((tool) => (
                <Card key={tool.file} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          <Badge variant="outline" className="capitalize">
                            {tool.category}
                          </Badge>
                        </div>
                        <CardDescription>{tool.description}</CardDescription>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        asChild
                        className="ml-4"
                      >
                        <a
                          href={`file:///Users/minime/Library/Mobile%20Documents/com~apple~CloudDocs/Alex%20-%20MiniMe/${tool.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileCode className="h-3 w-3" />
                        {tool.size}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {tool.time}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

      {filteredTools.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No tools found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
