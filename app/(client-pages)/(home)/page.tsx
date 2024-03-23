import styles from './page.module.css';
import { PageCard } from '@/components/PageCard';
import { ColumnLayout } from '@/components/ColumnLayout';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  const projects: any = [
    {
      id: 1,
      title: 'Price iz Srbije',
      description: 'This is a description of project 1',
      image: '/price-main.jpg',
      url: '/projects/price-iz-srbije',
      video: '/price-iz-srbije.mp4',
      size: 'medium',
      priority: true,
    },
    {
      id: 2,
      title: 'Events',
      description: 'This is a description of project 2',
      image: '/events.jpg',
      url: '/projects/events',
      video: '/events.mp4',
      size: 'small',
      priority: true,
    },
    {
      id: 3,
      title: 'Femicid',
      description: 'This is a description of project 3',
      image: '/femicid.jpg',
      url: '/projects/femicid',
      video: '/femicid.mp4',
      size: 'large',
      priority: true,
    },
    {
      id: 4,
      title: 'Muzika nade',
      description: 'This is a description of project 4',
      image: '/muzika-nade.jpg',
      url: '/projects/muzika-nade',
      video: '/muzika-nade.mp4',
      size: 'square',
    },
    {
      id: 5,
      title: 'Haleon',
      description: 'This is a description of project 5',
      image: '/femicid.jpg',
      url: '/projects/haleon',
      video: '/femicid.mp4',
      size: 'large',
    },
    {
      id: 6,
      title: 'IDF',
      description: 'This is a description of project 6',
      image: '/idf.jpg',
      url: '/projects/idf',
      video: '/price-iz-srbije.mp4',
      size: 'medium',
    },
    {
      id: 7,
      title: 'HYKO',
      description: 'This is a description of project 7',
      image: '/hyko.jpg',
      url: '/projects/hyko',
      video: '/hyko.mp4',
      size: 'small',
    },
    {
      id: 8,
      title: 'Illy',
      description: 'This is a description of project 8',
      image: '/illy.jpg',
      url: '/projects/illy',
      videp: '/events.mp4',
      size: 'small',
    },
    {
      id: 9,
      title: 'Paralympics',
      description: 'This is a description of project 9',
      image: '/para.jpg',
      url: '/projects/paralympics',
      video: '/para.mp4',
      size: 'square',
    },
    {
      id: 10,
      title: 'Connectivity',
      description: 'This is a description of project 10',
      image: '/connectivity.jpg',
      url: '/projects/connectivity',
      video: '/connectivity.mp4',
      size: 'square',
    },
    {
      id: 11,
      title: 'Education',
      description: 'This is a description of project 11',
      image: '/education.jpg',
      url: '/projects/education',
      video: '/education.mp4',
      size: 'small',
    },
    {
      id: 12,
      title: 'Corpo videos',
      description: 'This is a description of project 12',
      image: '/corpo.jpg',
      url: '/projects/corpo-videos',
      video: '/corpo.mp4',
      size: 'medium',
    },
  ];

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

  const firstColumnIds: number[] = [1, 4, 5, 10];
  const secondColumnIds: number[] = [2, 6, 7, 11];
  const thirdColumnIds: number[] = [3, 8, 9, 12];

  let firstColumnCards: any[] = [];
  let secondColumnCards: any[] = [];
  let thirdColumnCards: any[] = [];

  projects.forEach((project: any) => {
    if (firstColumnIds.includes(project.id)) firstColumnCards.push(project);
    if (secondColumnIds.includes(project.id)) secondColumnCards.push(project);
    if (thirdColumnIds.includes(project.id)) thirdColumnCards.push(project);
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
