import { sanityFetch } from '@/utils/sanity/client';
import { PDF } from '@/utils/types';

const PDFList = async () => {
  async function getPDFs() {
    'use server';

    const pdfs: PDF[] = await sanityFetch({
      query: `*[_type == "pdf"]{
      slug,
      'url': pdfFile.asset->url,
    }`,
      tags: ['pdf'],
    });

    return pdfs;
  }

  const pdfs: PDF[] = await getPDFs();

  return (
    <div>
      {pdfs.map((pdf) => (
        <div key={pdf.slug}>{pdf.slug}</div>
      ))}
    </div>
  );
};

export default PDFList;
