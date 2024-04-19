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
        'order': {
          'column': order.column,
          'columnOrder': order.columnOrder
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

    // console.log('KONZOLA5' + JSON.stringify(projects[0].featuredContent));
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

  // const firstColumnProjects: string[] = isMobile
  //   ? [
  //       'stories-from-serbia',
  //       'music-of-hope',
  //       'hyko',
  //       'connectivity',
  //       'stop-femicide',
  //       'illy',
  //     ]
  //   : ['stories-from-serbia', 'music-of-hope', 'hyko', 'connectivity'];
  // const secondColumnProjects: string[] = isMobile
  //   ? [
  //       'events',
  //       'idf',
  //       'haleon',
  //       'education',
  //       'serbian-paralympics-team',
  //       'corporate-videos',
  //     ]
  //   : ['events', 'idf', 'haleon', 'education'];
  // const thirdColumnProjects: string[] = isMobile
  //   ? []
  //   : ['stop-femicide', 'illy', 'serbian-paralympics-team', 'corporate-videos'];

  // const firstColumnCards: any[] = [];
  // const secondColumnCards: any[] = [];
  // const thirdColumnCards: any[] = [];

  // projects.forEach((project: any) => {
  //   if (firstColumnProjects.includes(project.slug))
  //     firstColumnCards.push(project);
  //   if (secondColumnProjects.includes(project.slug))
  //     secondColumnCards.push(project);
  //   if (!isMobile && thirdColumnProjects.includes(project.slug))
  //     thirdColumnCards.push(project);
  // });

  // firstColumnCards.sort(
  //   (a, b) =>
  //     firstColumnProjects.indexOf(a.slug) - firstColumnProjects.indexOf(b.slug)
  // );

  // secondColumnCards.sort(
  //   (a, b) =>
  //     secondColumnProjects.indexOf(a.slug) -
  //     secondColumnProjects.indexOf(b.slug)
  // );

  // if (!isMobile)
  //   thirdColumnCards.sort(
  //     (a, b) =>
  //       thirdColumnProjects.indexOf(a.slug) -
  //       thirdColumnProjects.indexOf(b.slug)
  //   );

  firstColumnItems.splice(3, 0, pagesCards[3]);
  secondColumnItems.splice(1, 0, pagesCards[0]);
  thirdColumnItems.splice(4, 0, pagesCards[1]);
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
