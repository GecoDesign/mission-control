# Things 3 Widget

A dashboard widget that displays active tasks from Things 3, filtered by the "Work  - Geco Design" area.

## Features

- **Today's Tasks**: Shows tasks scheduled for today
- **Upcoming Tasks**: Shows tasks with future deadlines
- **Rich Display**: Shows task name, deadline, project, and tags
- **Live Updates**: Refreshes every 5 minutes automatically
- **Area Filtering**: Only shows tasks from "Work  - Geco Design" area (note the double space)

## Setup Requirements

### For Real Data (Production)

The widget uses AppleScript to query Things 3. To enable this:

1. **Grant Automation Permissions**:
   - Go to **System Settings** → **Privacy & Security** → **Automation**
   - Find the process running Next.js (e.g., `Node`, `Terminal`, or your deployment service)
   - Enable permission to control **Things3**

2. **Environment Configuration**:
   - By default, uses mock data in development (`NODE_ENV=development`)
   - To force real data, set `USE_MOCK_THINGS=false` in `.env.local`

### For Development (Mock Data)

Mock data is used automatically when:
- `NODE_ENV=development`, OR
- `USE_MOCK_THINGS=true` is set, OR
- AppleScript queries fail (permissions not granted)

## File Structure

```
src/
├── components/dashboard/
│   ├── things-widget.tsx          # Widget component
│   └── dashboard-view.tsx         # Dashboard layout (includes widget)
├── app/api/things/
│   └── route.ts                   # API endpoint
├── lib/
│   └── things.ts                  # Things query logic
└── types/
    └── things.ts                  # TypeScript types & utilities
```

## How It Works

1. **Frontend** (`things-widget.tsx`):
   - Fetches data from `/api/things` every 5 minutes
   - Displays tasks in two sections: Today and Upcoming
   - Shows deadline info with color coding for overdue tasks
   - Displays task tags and project names

2. **API Route** (`app/api/things/route.ts`):
   - Dynamic server-side route
   - Calls `getThingsTasks()` from lib
   - Filters by area parameter

3. **Data Layer** (`lib/things.ts`):
   - Uses AppleScript to query Things 3
   - Parses task data (name, deadline, area, project, tags)
   - Filters by specified area
   - Falls back to mock data on errors

## Customization

### Change the Area Filter

Edit the fetch URL in `things-widget.tsx`:

```typescript
const response = await fetch('/api/things?area=Your%20Area%20Name')
```

### Adjust Refresh Interval

In `things-widget.tsx`, change the interval (in milliseconds):

```typescript
const interval = setInterval(loadTasks, 5 * 60 * 1000) // 5 minutes
```

### Modify Task Limit

In `lib/things.ts`, adjust the slice:

```typescript
return {
  today: today.slice(0, 20),    // Show 20 instead of 10
  upcoming: upcoming.slice(0, 20),
};
```

## Troubleshooting

### Widget Shows "Unable to load tasks"

1. Check browser console for errors
2. Verify the API endpoint is accessible: `http://localhost:3000/api/things`
3. Check server logs for AppleScript errors

### Widget Shows Mock Data in Production

1. Ensure `USE_MOCK_THINGS` is not set to `true`
2. Grant Automation permissions (see Setup Requirements above)
3. Verify Things 3 is installed and running
4. Check server logs for permission errors

### AppleScript Timeout

If queries are slow:
- Increase timeout in `lib/things.ts` (default 10s)
- Reduce number of tasks processed
- Check Things 3 database size

## Design Notes

The widget follows the Mission Control dashboard aesthetic:
- Card-based layout with hover effects
- Consistent typography and spacing
- Badge counters for quick overview
- Muted colors for secondary information
- Responsive grid layout (4 columns on large screens)
