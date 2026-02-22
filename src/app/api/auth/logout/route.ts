import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  // Delete authentication cookie
  cookies().delete('mission-control-auth')
  
  return NextResponse.json({ success: true })
}
