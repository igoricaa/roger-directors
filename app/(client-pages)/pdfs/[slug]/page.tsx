import { sanityFetch } from '@/utils/sanity/client';
import { PDF } from '@/utils/types';

export async function generateStaticParams() {
  const pdfs: PDF[] = await sanityFetch({
    query: `*[_type == "pdf"]{
    slug,
  }`,
    tags: ['pdf'],
  });

  return pdfs.map((pdf) => ({
    slug: pdf.slug,
  }));
}

const PDFPreview = async ({ params }: { params: { slug: string } }) => {
  async function getPDF(slug: string) {
    'use server';

    const pdf: PDF = await sanityFetch({
      query: `*[_type == "pdf" && slug == $slug][0]{
          _id,
          slug,
          'url': pdfFile.asset->url,
        }`,
      params: { slug },
      tags: ['pdf'],
    });

    return pdf;
  }

  const pdf: PDF = await getPDF(params.slug);

  return <div>PDFPreview</div>;
};

export default PDFPreview;
