import { NextResponse } from 'next/server';
import { studyNotes } from '@/app/types/assets';
import type { StudyNote } from '@/app/types/assets';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const noteId = id;
    
    // Find the note server-side only
    const note = studyNotes.find((n) => n.id === noteId);
    
    if (!note) {
      return NextResponse.json(
        { error: 'Study note not found' },
        { status: 404 }
      );
    }
    
    // Check access entitlement
    // Currently only allowing 'Free' tier content
    // In a real app, this would check user authentication and subscription status
    if (note.access !== 'Free') {
      return NextResponse.json(
        { error: 'Access denied. This content requires a Premium subscription.' },
        { status: 403 }
      );
    }
    
    // Return only the authorized note
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch study note' },
      { status: 500 }
    );
  }
}
