import styles from './page.module.css';
import { PageCard } from '@/components/PageCard';
import { ColumnLayout } from '@/components/ColumnLayout';
import { client } from '@/utils/sanity/client';
import ProjectCard from '@/components/ProjectCard';

type Project = {
  _id: string;
  title: string;
  slug: string;
  featuredImage: any;
  featuredVideo: any;
};

export default async function Home() {
  const pagesCards: any = [
    {
      type: 'page',
      title: 'About Us',
      description: {
        __html: 'Digital Dreams.<br>Analog Hearts.<br>Integrated Futures.',
      },
      size: 'medium',
    },
    {
      type: 'page',
      title: 'Meet the Team',
      description: { __html: 'Meet the People' },
      size: 'square',
    },
    {
      type: 'page',
      title: 'Contact',
      description: { __html: 'Let&apos;s connect' },
      size: 'square',
    },
    {
      type: 'page',
      title: 'Blog',
      description: { __html: 'The reservoir' },
      size: 'small',
    },
  ];

  async function getProjects() {
    'use server';
    const projects = await client.fetch<Project[]>(
      `*[_type == "project"]{
        'id': _id,
        title,
        slug,
        size,
        'featuredImage': featuredImage.asset->url,
        'featuredImageAlt': featuredImage.alt,
        'featuredVideoPlaybackId': featuredVideo.video.asset->playbackId,
        'featuredVideoTitle': featuredVideo.title,
      }`,
      {},
      {
        cache: 'force-cache',
        next: { tags: ['homeProjects'] },
      }
    );
    
    return projects;
  }

  const firstColumnProjects: string[] = [
    'price-iz-srbije',
    'music-of-hope',
    'hyko',
    'connectivity',
  ];
  const secondColumnProjects: string[] = [
    'events',
    'idf',
    'haleon',
    'education',
  ];
  const thirdColumnProjects: string[] = [
    'stop-femicide',
    'illy',
    'serbian-paralympics-team',
    'corpo-videos',
  ];

  let firstColumnCards: any[] = [];
  let secondColumnCards: any[] = [];
  let thirdColumnCards: any[] = [];

  const projects: Project[] = await getProjects();

  projects.forEach((project: any) => {
    if (firstColumnProjects.includes(project.slug))
      firstColumnCards.push(project);
    if (secondColumnProjects.includes(project.slug))
      secondColumnCards.push(project);
    if (thirdColumnProjects.includes(project.slug))
      thirdColumnCards.push(project);
  });

  firstColumnCards.splice(3, 0, pagesCards[3]);
  secondColumnCards.splice(1, 0, pagesCards[0]);
  secondColumnCards.splice(4, 0, pagesCards[1]);
  thirdColumnCards.splice(1, 0, pagesCards[2]);

  // za responsive podeli u 2 kolone

  return (
    <main className={styles.main}>
      <ColumnLayout>
        {firstColumnCards.map((card: any, index: number) => {
          return card.type === 'page' ? (
            <PageCard key={index} content={card} size={card.size} />
          ) : (
            <ProjectCard key={index} project={card} />
          );
        })}
      </ColumnLayout>
      <ColumnLayout>
        {secondColumnCards.map((card: any, index: number) => {
          return card.type === 'page' ? (
            <PageCard key={index} content={card} size={card.size} />
          ) : (
            <ProjectCard key={index} project={card} />
          );
        })}
      </ColumnLayout>
      <ColumnLayout>
        {thirdColumnCards.map((card: any, index: number) => {
          return card.type === 'page' ? (
            <PageCard key={index} content={card} size={card.size} />
          ) : (
            <ProjectCard key={index} project={card} />
          );
        })}
      </ColumnLayout>
    </main>
  );
}
