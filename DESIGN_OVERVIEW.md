# Design Overview - Mission Control v2.0

## Visual Layout

### Desktop View (≥ 1024px)

```
┌─────────────────────────────────────────────────────────────┐
│  🚀 Mission Control           Alex & MiniMe          🌙      │ ← Header (Fixed)
├──────────┬──────────────────────────────────────────────────┤
│          │  Dashboard                                        │
│  •Dash   │  Welcome back! Here's your overview.              │
│          │                                                    │
│  Kanban  │  ┌──────────┬──────────┬──────────┐              │
│          │  │📊 Quick  │✅ Active │📋 Kanban │              │
│  Brief   │  │  Stats   │  Tasks   │ Summary  │              │
│          │  │          │          │          │              │
│  Tasks   │  │ 📈 12    │ □ Task 1 │ Todo: 5  │              │
│          │  │ Tasks    │ □ Task 2 │ Doing: 3 │              │
│  Ideas   │  │ ✓ 8      │ □ Task 3 │ Done: 4  │              │
│          │  │ Done     │          │          │              │
│  Time    │  │ 💡 5     │ Progress │ [█████  ]│              │
│          │  │ Ideas    │ ███░░ 60%│          │              │
│  Notes   │  │ 📦 12    │          │          │              │
│          │  │ Cards    │          │          │              │
│          │  └──────────┴──────────┴──────────┘              │
│          │                                                    │
│  [<<]    │  ┌────────────────────┬───────────┬───────────┐  │
│Collapse  │  │📅 Latest Briefing  │💡Top Ideas│📊 Projects│  │
│          │  │                    │           │           │  │
│          │  │ Today, Feb 15      │⭐⭐⭐⭐⭐ │ Website   │  │
│          │  │                    │ AI Tools │ ████░ 80% │  │
│          │  │ • Completed v2.0   │           │           │  │
│          │  │ • Added dashboard  │⭐⭐⭐⭐⭐ │ Mobile    │  │
│          │  │ • Improved UX      │ SaaS Idea│ ██░░░ 40% │  │
│          │  │                    │           │           │  │
│          │  └────────────────────┴───────────┴───────────┘  │
│          │                                                    │
└──────────┴──────────────────────────────────────────────────┘
   ↑                                  ↑
Sidebar (w-64)                   Main Content
Collapsible                      Responsive Grid
```

### Tablet View (768px - 1023px)

```
┌────────────────────────────────────────┐
│  🚀 Mission Control          🌙        │
├────┬───────────────────────────────────┤
│    │  Dashboard                        │
│ •D │  Welcome back!                    │
│ K  │  ┌──────────┬──────────┐          │
│ B  │  │📊 Quick  │✅ Active │          │
│ T  │  │  Stats   │  Tasks   │          │
│ I  │  └──────────┴──────────┘          │
│ T  │  ┌──────────┬──────────┐          │
│ N  │  │📋 Kanban │📅Brief   │          │
│    │  │ Summary  │  -ing    │          │
│[<] │  └──────────┴──────────┘          │
└────┴───────────────────────────────────┘
  ↑
Collapsed (w-16)
```

### Mobile View (< 768px)

```
┌──────────────────────┐
│ 🚀 Mission Ctrl   🌙 │
├─┬────────────────────┤
│•│  Dashboard         │
│K│  Welcome back!     │
│B│                    │
│T│  ┌──────────────┐  │
│I│  │📊 Quick Stats│  │
│T│  └──────────────┘  │
│N│  ┌──────────────┐  │
│ │  │✅Active Tasks│  │
│ │  └──────────────┘  │
│ │  ┌──────────────┐  │
│ │  │📋Kanban Sum. │  │
│ │  └──────────────┘  │
└─┴────────────────────┘
 ↑
Auto-
collapsed
```

## Color System

### Status Colors

```
✅ Completed / Success    🟢 rgb(34, 197, 94)   #22C55E
🔵 In Progress / Active   🔵 rgb(59, 130, 246)  #3B82F6
🟡 Pending / Planning     🟡 rgb(234, 179, 8)   #EAB308
🔴 Urgent / Error         🔴 rgb(239, 68, 68)   #EF4444
🟣 Purple Accent          🟣 rgb(168, 85, 247)  #A855F7
```

### Widget Color Coding

| Widget | Icon Color | Purpose |
|--------|-----------|---------|
| Quick Stats | 🟠 Orange | Overview/Analytics |
| Active Tasks | 🔵 Blue | Action Items |
| Kanban Summary | 🟣 Purple | Workflow Status |
| Latest Briefing | 🟢 Green | Information |
| Top Ideas | 🟡 Yellow | Innovation |
| Project Progress | 🔵 Indigo | Goals/Milestones |

## Component Hierarchy

```
App
├── Layout
│   ├── Header (Fixed)
│   │   ├── Logo (Gradient)
│   │   ├── Title
│   │   └── Theme Toggle
│   │
│   ├── Sidebar (Collapsible)
│   │   ├── Navigation Links
│   │   └── Collapse Button
│   │
│   └── Main Content
│       └── Page Content
│
└── Pages
    ├── / (Dashboard)
    │   └── Dashboard View
    │       ├── Quick Stats Widget
    │       ├── Active Tasks Widget
    │       ├── Kanban Summary Widget
    │       ├── Latest Briefing Widget
    │       ├── Top Ideas Widget
    │       └── Project Progress Widget
    │
    ├── /kanban
    │   └── Kanban Board
    │       ├── Columns
    │       └── Cards
    │
    ├── /tasks
    │   └── Task Tracker
    │       └── Task List
    │
    ├── /briefings
    │   └── Daily Briefings
    │       └── Briefing Cards
    │
    ├── /ideas
    │   └── Business Ideas
    │       └── Idea Cards
    │
    ├── /timeline
    │   └── Project Timeline
    │       └── Project Cards
    │
    └── /notes
        └── Quick Notes
            └── Note Editor
```

## Interactive Elements

### Sidebar Behavior

**Expanded State (≥ 1024px):**
- Width: `256px` (w-64)
- Shows: Icons + Labels
- Background: Card background
- Border: Right border

**Collapsed State (< 1024px or manual):**
- Width: `64px` (w-16)
- Shows: Icons only
- Tooltips on hover
- Same styling

**Active Link:**
- Background: Gradient (blue/purple)
- Left border indicator
- Icon color: Blue
- Text: White/foreground

### Widget Interactions

**Hover State:**
- Shadow increases (hover:shadow-lg)
- Smooth transition (200ms)
- No layout shift

**Loading State:**
- Skeleton animation (pulse)
- Maintains layout
- Placeholder boxes

**Empty State:**
- Icon (20% opacity)
- Helpful message
- Centered layout

## Typography

```
Headers:
H1: 2xl (text-2xl) - 24px
H2: 3xl (text-3xl) - 30px - Bold
H3: lg (text-lg) - 18px - SemiBold

Body:
Default: sm (text-sm) - 14px
Muted: xs (text-xs) - 12px - text-muted-foreground

Labels:
Widget Title: lg - 18px - SemiBold
Card Title: sm - 14px - Medium
Stat Value: 2xl - 24px - Bold
```

## Spacing System

```
Widget Padding: p-4 (16px)
Widget Gap: gap-4 (16px)
Section Gap: space-y-6 (24px)
Card Padding: p-3 (12px)
Border Radius: rounded-lg (8px)
```

## Animation Specifications

### Sidebar Toggle
```css
transition: all 300ms ease
properties: width
```

### Widget Hover
```css
transition: shadow 200ms ease
from: shadow
to: shadow-lg
```

### Loading Pulse
```css
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite
```

### Page Transition
```css
/* Automatic via Next.js routing */
/* No custom transitions needed */
```

## Accessibility

### Keyboard Navigation
- All interactive elements are focusable
- Tab order follows visual hierarchy
- Focus visible on all elements

### ARIA Labels
- Sidebar: `navigation` role
- Widgets: Proper heading structure
- Buttons: Clear labels
- Links: Descriptive text

### Color Contrast
- All text meets WCAG AA standards
- Focus indicators have 3:1 contrast
- Icons have supporting text

## Responsive Breakpoints

```
sm:  640px  (Mobile landscape)
md:  768px  (Tablet)
lg:  1024px (Desktop)
xl:  1280px (Large desktop)
2xl: 1536px (Extra large)
```

### Layout Behavior

| Breakpoint | Sidebar | Grid Columns | Widget Layout |
|------------|---------|--------------|---------------|
| < 768px | Collapsed (auto) | 1 | Stacked |
| 768-1023px | Collapsed (auto) | 2 | 2-column |
| ≥ 1024px | Expanded | 3 | 3-column top, mixed bottom |

## Performance Metrics

**Target Metrics:**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

**Optimization Strategies:**
- Static page generation
- Code splitting by route
- Lazy loading widgets
- Image optimization (Next.js Image)
- CSS-in-JS with Tailwind (minimal runtime)

---

**Design Philosophy**: Clean, professional, mission-critical aesthetic with smooth interactions and clear visual hierarchy.
