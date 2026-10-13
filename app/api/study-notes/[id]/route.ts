import { NextResponse } from 'next/server';
import { studyNotes } from '@/app/types/assets';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const note = studyNotes.find((n) => n.id === id);

  if (!note) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(note);
}
