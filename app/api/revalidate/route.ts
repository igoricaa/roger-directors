import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
  const tags = ['project', 'teamMember', 'reservoirProject', 'pdf'];

  for (const tag of tags) {
    revalidateTag(tag);
  }

  return NextResponse.json('Content revalidated!');
}
