# Mission Control 🚀

A professional dashboard for productivity management with a grid-based layout inspired by mission control centers.

![Mission Control](https://img.shields.io/badge/Version-2.0-blue) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)

## ✨ Features

### Dashboard Homepage
- **Quick Stats Widget** - Real-time overview of tasks, ideas, and cards with completion rate
- **Active Tasks Widget** - Today's tasks with progress tracking and quick completion
- **Kanban Summary Widget** - Visual breakdown of cards across all columns
- **Latest Briefing Widget** - Daily summary with key highlights
- **Top Ideas Widget** - Highest-rated business ideas (4+ stars)
- **Project Progress Widget** - Active projects with progress bars

### Full Sections
- **Kanban Board** - Drag-and-drop workflow management
- **Daily Briefings** - Daily summaries and highlights
- **Task Tracker** - Task management with due dates and time tracking
- **Business Ideas** - Capture and rate innovative ideas
- **Project Timeline** - Track projects and milestones
- **Quick Notes** - Fast note-taking with markdown support

## 🎨 Design System

### Professional Aesthetic
- Modern grid-based layout with sidebar navigation
- Smooth animations and micro-interactions
- Hover effects on widgets with shadow transitions
- Clean, professional color scheme optimized for dark mode
- Status indicators with color coding:
  - 🟢 Green: Completed/Success
  - 🔵 Blue: In Progress
  - 🟡 Yellow: Pending/Planning
  - 🔴 Red: Urgent

### UI Components
- Built on **shadcn/ui** component library
- Consistent spacing, shadows, and borders
- Responsive design for mobile, tablet, and desktop
- Loading skeletons for smooth data fetching

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Database**: Supabase (PostgreSQL)
- **Charts**: Recharts
- **Drag & Drop**: @dnd-kit
- **Animations**: Framer Motion
- **Theme**: next-themes (dark/light mode)

## 📦 Installation

```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase credentials

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Schema
The app requires the following Supabase tables:
- `tasks` - Task tracking
- `kanban_columns` - Kanban board columns
- `kanban_cards` - Kanban cards
- `briefings` - Daily briefings
- `business_ideas` - Business ideas
- `projects` - Project timeline
- `notes` - Quick notes

## 🎯 Usage

### Navigation
- Use the **sidebar** to navigate between sections
- Click the **collapse button** to minimize the sidebar
- The sidebar auto-collapses on mobile devices

### Dashboard Widgets
Each widget provides:
- Real-time data from Supabase
- Loading skeletons during fetch
- Empty states when no data available
- Interactive elements (checkboxes, progress bars)

### Customization
- **Theme Toggle**: Switch between light/dark mode in the header
- **Responsive Layout**: Widgets automatically adapt to screen size
- **Widget Content**: Each widget fetches only the data it needs for performance

## 📱 Mobile Responsiveness

- Sidebar collapses automatically on screens < 1024px
- Grid layout adapts: 3 columns (desktop) → 2 columns (tablet) → 1 column (mobile)
- Touch-friendly interface with proper spacing
- Optimized loading states for slower connections

## 🎨 Color Palette

### Dark Mode (Default)
- Background: `#0A0E17` (deep navy)
- Card: `#0A0E17` (matching background)
- Accent: `#1E293B` (slate)
- Primary: Blue to Purple gradient
- Success: Green
- Warning: Yellow
- Error: Red

### Light Mode
- Background: White
- Card: White
- Accent: Light gray
- Follows system theme by default

## 🚀 Deployment

### Vercel (Recommended)
Already deployed to: https://mission-control-mu-ten.vercel.app

For new deployments:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📊 Performance

- **Static Generation**: All routes pre-rendered at build time
- **Code Splitting**: Automatic chunk optimization by Next.js
- **Lazy Loading**: Widgets load independently
- **Optimized Images**: Next.js Image component for all images
- **Bundle Size**: ~150KB first load JS (gzipped)

## 🔄 Updates from v1.0

### Major Changes
- ✅ Grid-based dashboard layout (replaced tab navigation)
- ✅ Sidebar navigation with collapsible state
- ✅ Six dedicated dashboard widgets
- ✅ Individual page routes for each section
- ✅ Improved header with gradient logo
- ✅ Professional color scheme and animations
- ✅ Better mobile responsiveness
- ✅ Loading skeletons for all widgets

### Migration Notes
See [MIGRATION.md](./MIGRATION.md) for detailed upgrade instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Design inspired by Linear, Notion, and NASA mission control centers
- Built with amazing open-source tools and libraries
- shadcn/ui for beautiful component primitives

---

**Built with ❤️ by Alex & MiniMe**
