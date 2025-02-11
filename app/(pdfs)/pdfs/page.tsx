import { sanityFetch } from '@/utils/sanity/client';
import { PDF } from '@/utils/types';
import styles from './page.module.css';

const PDFList = async () => {
  async function getPDFs() {
    'use server';

    const pdfs: PDF[] = await sanityFetch({
      query: `*[_type == "pdf"]{
      title,
      'url': pdfFile.asset->url,
    }`,
      tags: ['pdf'],
    });

    return pdfs;
  }

  const pdfs: PDF[] = await getPDFs();

  return (
    <div className={styles.pdfList}>
      <h1>PDF Files:</h1>
      {pdfs.map((pdf) => (
        <div key={pdf.title} className={styles.pdfItem}>
          <p className={styles.pdfTitle}>title: {pdf.title}</p>
          <p className={styles.pdfUrl}>url: {pdf.url}</p>
        </div>
      ))}
    </div>
  );
};

export default PDFList;
