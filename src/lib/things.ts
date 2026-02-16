import { exec } from 'child_process';
import { promisify } from 'util';
import type { ThingsTask } from '@/types/things';

const execAsync = promisify(exec);

/**
 * Query Things 3 via AppleScript
 * Things 3 has excellent AppleScript support which doesn't require Full Disk Access
 */
async function queryThingsViaAppleScript(list: 'today' | 'upcoming'): Promise<ThingsTask[]> {
  const script = `
    tell application "Things3"
      set taskList to to dos of list "${list}"
      set output to ""
      
      repeat with todo in taskList
        set todoName to name of todo
        set todoId to id of todo
        set todoStatus to status of todo
        set todoNotes to notes of todo
        
        -- Get area
        set todoArea to ""
        try
          set todoArea to name of area of todo
        end try
        
        -- Get project
        set todoProject to ""
        try
          set todoProject to name of project of todo
        end try
        
        -- Get tags
        set todoTags to ""
        try
          set tagList to tags of todo
          set tagNames to {}
          repeat with aTag in tagList
            set end of tagNames to name of aTag
          end repeat
          set AppleScript's text item delimiters to ","
          set todoTags to tagNames as string
          set AppleScript's text item delimiters to ""
        end try
        
        -- Get deadline
        set todoDeadline to ""
        try
          set todoDeadline to (due date of todo as string)
        end try
        
        -- Format as JSON-ish (we'll parse it)
        set output to output & "###TASK###" & todoId & "|||" & todoName & "|||" & todoStatus & "|||" & todoArea & "|||" & todoProject & "|||" & todoTags & "|||" & todoDeadline & "|||" & todoNotes & linefeed
      end repeat
      
      return output
    end tell
  `;
  
  try {
    const { stdout } = await execAsync(`osascript -e '${script.replace(/'/g, "'\"'\"'")}'`, {
      timeout: 10000
    });
    
    const tasks: ThingsTask[] = [];
    const lines = stdout.split('###TASK###').filter(line => line.trim());
    
    for (const line of lines) {
      const parts = line.trim().split('|||');
      if (parts.length >= 8) {
        tasks.push({
          uuid: parts[0] || '',
          title: parts[1] || '',
          status: parts[2] || '',
          area: parts[3] || '',
          project: parts[4] || '',
          tags: parts[5] ? parts[5].split(',').filter(t => t) : [],
          deadline: parts[6] || null,
          notes: parts[7] || '',
          type: 'to-do',
          createdDate: '',
          modifiedDate: '',
          todayIndex: null,
        });
      }
    }
    
    return tasks;
  } catch (error) {
    console.error(`Error querying Things ${list}:`, error);
    return [];
  }
}

/**
 * Get mock data for development/testing
 */
function getMockTasks(): { today: ThingsTask[]; upcoming: ThingsTask[] } {
  const mockToday: ThingsTask[] = [
    {
      uuid: '1',
      title: 'Review mission control dashboard design',
      status: 'open',
      area: 'Work  - Geco Design',
      project: 'Dashboard Redesign',
      tags: ['urgent', 'design'],
      deadline: new Date().toISOString(),
      notes: '',
      type: 'to-do',
      createdDate: '',
      modifiedDate: '',
      todayIndex: 0,
    },
    {
      uuid: '2',
      title: 'Update Things 3 widget documentation',
      status: 'open',
      area: 'Work  - Geco Design',
      project: '',
      tags: ['documentation'],
      deadline: null,
      notes: '',
      type: 'to-do',
      createdDate: '',
      modifiedDate: '',
      todayIndex: 1,
    },
  ];

  const mockUpcoming: ThingsTask[] = [
    {
      uuid: '3',
      title: 'Prepare client presentation slides',
      status: 'open',
      area: 'Work  - Geco Design',
      project: 'Q1 Planning',
      tags: ['presentation'],
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      notes: '',
      type: 'to-do',
      createdDate: '',
      modifiedDate: '',
      todayIndex: null,
    },
    {
      uuid: '4',
      title: 'Schedule team sync meeting',
      status: 'open',
      area: 'Work  - Geco Design',
      project: '',
      tags: ['team', 'planning'],
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      notes: '',
      type: 'to-do',
      createdDate: '',
      modifiedDate: '',
      todayIndex: null,
    },
  ];

  return { today: mockToday, upcoming: mockUpcoming };
}

/**
 * Query Things 3 database for tasks in a specific area
 */
export async function getThingsTasks(area: string = "Work  - Geco Design"): Promise<{
  today: ThingsTask[];
  upcoming: ThingsTask[];
}> {
  // Check if we should use mock data (for development or if Things access fails)
  const useMock = process.env.USE_MOCK_THINGS === 'true' || process.env.NODE_ENV === 'development';
  
  if (useMock) {
    console.log('Using mock Things data for development');
    return getMockTasks();
  }

  try {
    // Query via AppleScript
    const [allTodayTasks, allUpcomingTasks] = await Promise.all([
      queryThingsViaAppleScript('today'),
      queryThingsViaAppleScript('upcoming'),
    ]);

    // If both return empty (likely permission issue), fall back to mock
    if (allTodayTasks.length === 0 && allUpcomingTasks.length === 0) {
      console.warn('No tasks returned from Things - using mock data. Grant Automation permissions to Node.js/Terminal for real data.');
      return getMockTasks();
    }

    // Filter by area (with exact match for "Work  - Geco Design" including double space)
    const today = allTodayTasks.filter(task => 
      task.area === area && task.status !== 'completed'
    );
    
    const upcoming = allUpcomingTasks.filter(task => 
      task.area === area && task.status !== 'completed'
    );

    return {
      today: today.slice(0, 10), // Limit to 10 tasks
      upcoming: upcoming.slice(0, 10),
    };
  } catch (error) {
    console.error('Error fetching Things tasks:', error);
    console.warn('Falling back to mock data');
    return getMockTasks();
  }
}
