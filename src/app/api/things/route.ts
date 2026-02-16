import { NextRequest, NextResponse } from 'next/server';
import { getThingsTasks } from '@/lib/things';

// Mark route as dynamic to prevent static generation errors
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const area = searchParams.get('area') || 'Work  - Geco Design';
    
    const tasks = await getThingsTasks(area);
    
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('API error fetching Things tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks', today: [], upcoming: [] },
      { status: 500 }
    );
  }
}
