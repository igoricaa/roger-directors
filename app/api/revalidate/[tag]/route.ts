import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { tag: string } }
) {
  const tag = params.tag;

  revalidateTag(tag);

  return NextResponse.json(tag ?  tag + " revalidated!" : { error: 'No tag provided' });
}
