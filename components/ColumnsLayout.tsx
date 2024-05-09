'use client';

import styles from './ColumnsLayout.module.css';
import { Project } from '@/utils/types';
import { filterAndSortProjects } from '@/utils/utils';
import { pagesCards } from '@/utils/data';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Column from './Column';

export default function ColumnsLayout({ projects }: { projects: Project[] }) {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobileVar = window.matchMedia('(max-width: 1024px)').matches;
      setIsMobile(isMobileVar);
    }
  }, []);

  const priorityIndexes: number[] = isMobile ? [0, 1, 2] : [0, 1];

  const firstColumnItems: any[] = filterAndSortProjects(projects, 1, isMobile);
  const secondColumnItems: any[] = filterAndSortProjects(projects, 2, isMobile);
  const thirdColumnItems: any[] = filterAndSortProjects(projects, 3, isMobile);

  if (pathname === '/') {
    firstColumnItems.splice(3, 0, pagesCards[3]);
    secondColumnItems.splice(1, 0, pagesCards[0]);
    secondColumnItems.splice(4, 0, pagesCards[1]);
    isMobile
      ? secondColumnItems.splice(6, 0, pagesCards[2])
      : thirdColumnItems.splice(1, 0, pagesCards[2]);
  }

  return (
    <main className={styles.main}>
      <Column
        columnItems={firstColumnItems}
        priorityIndexes={priorityIndexes}
      />
      <Column
        columnItems={secondColumnItems}
        priorityIndexes={priorityIndexes}
      />
      {!isMobile && (
        <Column
          columnItems={thirdColumnItems}
          priorityIndexes={priorityIndexes}
        />
      )}
    </main>
  );
}
