import styles from './page.module.css';
import { PageCard } from '@/components/PageCard';
import { ColumnLayout } from '@/components/ColumnLayout';
import { sanityFetch } from '@/utils/sanity/client';
import ProjectCard from '@/components/ProjectCard';
import { isMobileDevice } from '@/utils/isMobile';
import { Project } from '@/utils/types';
import { pagesCards } from '@/utils/data';

export default async function Home() {
  async function getProjects() {
    'use server';

    const projects: Project[] = await sanityFetch({
      query: `*[_type == "project"]{
        'id': _id,
        title,
        slug,
        'desktopOrder': {
          'column': desktopOrder.column,
          'columnOrder': desktopOrder.columnOrder
        },
        'mobileOrder': {
          'column': mobileOrder.column,
          'columnOrder': mobileOrder.columnOrder
        },
        'featuredContent': {
          featuredSize,
          'featuredImage': {
            'url': featuredImage.asset->url,
            'alt': featuredImage.alt,
          },
          'featuredVideo': {
            'playbackId': featuredVideo.video.asset->playbackId
          },
        }
      }`,
      tags: ['project'],
    });

    return projects;
  }
  const projects: Project[] = await getProjects();
  const isMobile = isMobileDevice();

  const filterAndSortProjects = (projects: Project[], columnNumber: number) => {
    return isMobile
      ? columnNumber !== 3
        ? projects
            .filter((project) => project.mobileOrder.column === columnNumber)
            .sort(
              (a, b) => a.mobileOrder.columnOrder - b.mobileOrder.columnOrder
            )
        : []
      : projects
          .filter((project) => project.desktopOrder.column === columnNumber)
          .sort(
            (a, b) => a.desktopOrder.columnOrder - b.desktopOrder.columnOrder
          );
  };

  const firstColumnItems: any[] = filterAndSortProjects(projects, 1);
  const secondColumnItems: any[] = filterAndSortProjects(projects, 2);
  const thirdColumnItems: any[] = filterAndSortProjects(projects, 3);

  firstColumnItems.splice(3, 0, pagesCards[3]);
  secondColumnItems.splice(1, 0, pagesCards[0]);
  secondColumnItems.splice(4, 0, pagesCards[1]);
  isMobile
    ? secondColumnItems.splice(6, 0, pagesCards[2])
    : thirdColumnItems.splice(1, 0, pagesCards[2]);

  const priorityIndexes: number[] = isMobile ? [0, 1, 2] : [0, 1];

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

const Column = ({
  columnItems,
  priorityIndexes,
}: {
  columnItems: any[];
  priorityIndexes: number[];
}) => {
  return (
    <ColumnLayout>
      {columnItems.map((item: any, index: number) => {
        return item.type === 'page' ? (
          <PageCard key={index} content={item} size={item.size} />
        ) : (
          <ProjectCard
            key={index}
            project={item}
            priority={priorityIndexes.includes(index)}
          />
        );
      })}
    </ColumnLayout>
  );
};
