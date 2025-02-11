import { sanityFetch } from '@/utils/sanity/client';
import { PDF } from '@/utils/types';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const pdf: PDF = await sanityFetch({
      query: `*[_type == "pdf"][1]{
      title,
      'url': pdfFile.asset->url,
    }`,
      tags: ['pdf'],
    });

    console.log(pdf);

    if (!pdf?.url) {
      return new Response('PDF not found', { status: 404 });
    }

    // Redirect to the PDF URL
    return NextResponse.redirect(pdf.url);
  } catch (error) {
    console.error(error);
    return new Response('Error fetching PDF', { status: 500 });
  }
}
