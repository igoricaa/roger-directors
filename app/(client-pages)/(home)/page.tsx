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

  const firstColumnItems: any[] = isMobile
    ? projects
        .filter((project) => project.mobileOrder.column === 1)
        .sort((a, b) => a.mobileOrder.columnOrder - b.mobileOrder.columnOrder)
    : projects
        .filter((project) => project.desktopOrder.column === 1)
        .sort(
          (a, b) => a.desktopOrder.columnOrder - b.desktopOrder.columnOrder
        );

  const secondColumnItems: any[] = isMobile
    ? projects
        .filter((project) => project.mobileOrder.column === 2)
        .sort((a, b) => a.mobileOrder.columnOrder - b.mobileOrder.columnOrder)
    : projects
        .filter((project) => project.desktopOrder.column === 2)
        .sort(
          (a, b) => a.desktopOrder.columnOrder - b.desktopOrder.columnOrder
        );

  const thirdColumnItems: any[] = isMobile
    ? []
    : projects
        .filter((project) => project.desktopOrder.column === 3)
        .sort(
          (a, b) => a.desktopOrder.columnOrder - b.desktopOrder.columnOrder
        );

  firstColumnItems.splice(3, 0, pagesCards[3]);
  secondColumnItems.splice(1, 0, pagesCards[0]);
  secondColumnItems.splice(4, 0, pagesCards[1]);
  isMobile
    ? secondColumnItems.splice(6, 0, pagesCards[2])
    : thirdColumnItems.splice(1, 0, pagesCards[2]);

  const priorityIndexes: Number[] = isMobile ? [0, 1, 2] : [0, 1];

  return (
    // TODO: refaktorisi, ponavljanje koda
    <main className={styles.main}>
      <ColumnLayout>
        {firstColumnItems.map((card: any, index: number) => {
          return card.type === 'page' ? (
            <PageCard key={index} content={card} size={card.size} />
          ) : (
            <ProjectCard
              key={index}
              project={card}
              priority={priorityIndexes.includes(index)}
            />
          );
        })}
      </ColumnLayout>
      <ColumnLayout>
        {secondColumnItems.map((card: any, index: number) => {
          return card.type === 'page' ? (
            <PageCard key={index} content={card} size={card.size} />
          ) : (
            <ProjectCard
              key={index}
              project={card}
              priority={priorityIndexes.includes(index)}
            />
          );
        })}
      </ColumnLayout>
      {thirdColumnItems.length > 0 && (
        <ColumnLayout>
          {thirdColumnItems.map((card: any, index: number) => {
            return card.type === 'page' ? (
              <PageCard key={index} content={card} size={card.size} />
            ) : (
              <ProjectCard
                key={index}
                project={card}
                priority={priorityIndexes.includes(index)}
              />
            );
          })}
        </ColumnLayout>
      )}
    </main>
  );
}
