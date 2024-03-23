import styles from './page.module.css';
import ProjectDescriptionContainer from '@/components/ProjectDescriptionContainer';
import Link from 'next/link';
import { client } from '@/utils/sanity/client';
import VideoSlider from '@/components/VideoSlider';
import ProjectImages from '@/components/ProjectImages';

// type Project = {
//   id: string;
//   title: string;
//   slug: string;
//   descriptionTitle: string;
//   description: string;
//   descriptionExceprt: string;
//   videos: string[];
//   images: string[];
//   prevProjectTitle: string;
//   prevProjectUrl: string;
//   nextProjectTitle: string;
//   nextProjectUrl: string;
// };

// const project: Project = {
//   id: '1',
//   title: 'Project 1',
//   slug: 'project-1',
//   descriptionTitle: 'This is a description title of project 1',
//   description:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   descriptionExceprt:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   images: ['/small.png'],
//   videos: [
//     '/projectVideo.mp4',
//     '/projectVideo2.mp4',
//     '/projectVideo3.mp4',
//     '/projectVideo4.mp4',
//     '/projectVideo5.mp4',
//   ],
//   prevProjectTitle: 'Project 0',
//   prevProjectUrl: '/projects/project-0',
//   nextProjectTitle: 'Project 2',
//   nextProjectUrl: '/projects/project-2',
// };

// const media: any[] = [
//   {
//     src: '/project-1.jpg',
//   },
//   {
//     src: '/project-2.jpg',
//   },
//   {
//     src: '/project-3.jpg',
//   },
//   {
//     src: '/project-4.jpg',
//   },
//   {
//     src: '/project-5.jpg',
//   },
// ];
// export default function Project({ project }: { project: Project }) {

type Project = {
  _id: string;
  title: string;
  slug: string;
  loopText: string;
  description: string;
  descriptionTitle: string;
  descriptionExcerpt: string;
  images: any[];
  videos: any[];
  prev: string;
  next: string;
};

export default async function Project({
  params,
}: {
  params: { slug: string };
}) {
  async function getProject() {
    'use server';
    const project = await client.fetch<Project>(
      `*[_type == "project" && slug == $slug][0]{
        _id,
        title,
        slug,
        loopText,
        description,
        descriptionTitle,
        descriptionExcerpt,
        images[]{
            'alt': alt,
            'url': asset->url,
        },
        videos[]{
          title,
          'playbackId': video.asset->playbackId,
        },
        'prev': *[_type == 'project' && !(_id in path('drafts.**')) && _createdAt < ^._createdAt]._id | order(_createdAt desc)[0],
        'next': *[_type == 'project' && !(_id in path('drafts.**')) && _createdAt > ^._createdAt]._id | order(_createdAt desc)[0]
      }`,
      { slug: params.slug },
      {
        cache: 'force-cache',
        next: { tags: ['projects'] },
      }
    );

    
    return project;
  }

  const project = await getProject();
  console.log('PROJEKAT: ' + project);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>{project.title}</h1>
      </header>
      <article className={styles.article}>
        <div className={styles.videosWrapper}>
          <VideoSlider videos={project.videos} />
        </div>
        <div className={styles.headingAnimated}>
          <h2>{project.loopText}</h2>
          <h2>{project.loopText}</h2>
          <h2>{project.loopText}</h2>
          <h2>{project.loopText}</h2>
        </div>

        <div className={styles.contentGrid}>
          <ProjectDescriptionContainer
            descriptionTitle={project.descriptionTitle}
            description={project.description}
            descriptionExceprt={project.descriptionExcerpt}
          />

          <ProjectImages images={project.images} />
        </div>
      </article>
      <section className={styles.adjacentProjects}>
        {/* <AdjacentProject
          type='prev'
          projectUrl={project.prevProjectUrl}
          projectTitle={project.prevProjectTitle}
        />
        <AdjacentProject
          type='next'
          projectUrl={project.nextProjectUrl}
          projectTitle={project.nextProjectTitle}
        /> */}
      </section>
    </main>
  );
}

const AdjacentProject = ({
  type,
  projectUrl,
  projectTitle,
}: {
  type: string;
  projectUrl: string;
  projectTitle: string;
}) => {
  return (
    <article
      className={[styles.adjacentProjectWrapper, styles[type]].join(' ')}
    >
      <Link href={projectUrl}>
        <span>{type} project</span>

        <span className={styles.adjacentPostArrow}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18.593'
            height='33.792'
            viewBox='0 0 18.593 33.792'
          >
            <path
              id='Path_11'
              data-name='Path 11'
              d='M0,0,14.972,14.775,0,29.549'
              transform='translate(2.121 2.121)'
              fill='none'
              stroke='#fff'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='3'
            />
          </svg>
        </span>
        <h3>{projectTitle}</h3>
      </Link>
    </article>
  );
};
