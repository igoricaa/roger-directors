import { PinterestLayout } from '@/components/PinterestLayout';
import styles from './page.module.css';
import { Card } from '@/components/Card';
import BackToTopButton from '@/components/BackToTopButton';

export default function Home() {
  const projects: any = [
    {
      title: 'Project 1',
      description: 'This is a description of project 1',
      image: '/small.png',
      url: '/projects/project-1',
    },
    {
      title: 'Project 2',
      description: 'This is a description of project 2',
      image: '/medium.png',
      url: '/projects/project-1',
    },
    {
      title: 'Project 3',
      description: 'This is a description of project 3',
      image: '/large.png',
      url: '/projects/project-1',
    },
    {
      title: 'Project 4',
      description: 'This is a description of project 4',
      image: '/small.png',
      url: '/projects/project-1',
    },
    {
      title: 'Project 5',
      description: 'This is a description of project 5',
      image: '/medium.png',
      url: '/projects/project-1',
    },
    {
      title: 'Project 6',
      description: 'This is a description of project 6',
      image: '/large.png',
      url: '/projects/project-1',
    },
    {
      title: 'Project 7',
      description: 'This is a description of project 7',
      image: '/small.png',
      url: '/projects/project-1',
    },
    {
      title: 'Project 8',
      description: 'This is a description of project 8',
      image: '/medium.png',
      url: '/projects/project-1',
    },
    {
      title: 'Project 9',
      description: 'This is a description of project 9',
      image: '/large.png',
      url: '/project-9',
    },
    {
      title: 'Project 10',
      description: 'This is a description of project 10',
      image: '/small.png',
      url: '/projects/project-1',
    },
    {
      title: 'Project 11',
      description: 'This is a description of project 11',
      image: '/medium.png',
      url: '/projects/project-1',
    },
    {
      title: 'Project 12',
      description: 'This is a description of project 12',
      image: '/large.png',
      url: '/projects/project-1',
    },
  ];

  const fixedCards: any = [
    {
      type: 'page',
      title: 'About Us',
      description: 'Lorem ipsum dolor sit amet, conse ctetur adipis cing elit',
    },
    {
      type: 'page',
      title: 'Meet the Team',
      description: 'Lorem ipsum dolor sit amet, conse ctetur adipis cing elit',
    },
    {
      type: 'page',
      title: 'Contact',
      description: 'Lorem ipsum dolor sit amet, conse ctetur adipis cing elit',
    },
  ];

  const spot = projects.length / 3;

  projects.splice(spot + 3, 0, fixedCards[0]);
  projects.splice(spot * 2 + 2, 0, fixedCards[1]);
  projects.splice(spot * 3 + 2, 0, fixedCards[2]);

  const sizes = ['small', 'medium', 'large'];

  return (
    <main className={styles.main}>
      <PinterestLayout>
        {projects.map((project: any, index: number) => {
          return <Card key={index} content={project} size={sizes[index % 3]} />;
        })}
      </PinterestLayout>
    </main>
  );
}
