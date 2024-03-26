import styles from './page.module.css';
import ProjectDescriptionContainer from '@/components/ProjectDescriptionContainer';
import Link from 'next/link';
import { client } from '@/utils/sanity/client';
import VideoSlider from '@/components/VideoSlider';
import ProjectImages from '@/components/ProjectImages';

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
  masterVideo: Video;
  prev: string;
  next: string;
};

type Video = {
  playbackId: string;
  title: string;
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
        masterVideo{
          title,
          'playbackId': video.asset->playbackId,
        },
        'prev': *[_type == 'project' && _createdAt < ^._createdAt] | order(_createdAt asc)[0] {
          title,
          slug
        },
        'next': *[_type == 'project' && ^._createdAt < _createdAt] | order(_createdAt asc)[0] {
          title,
          slug
        }
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

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>{project.title}</h1>
      </header>
      <article className={styles.article}>
        <div className={styles.videosWrapper}>
          <VideoSlider
            videos={project.videos}
            masterVideo={project.masterVideo}
          />
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
        {project.prev && <AdjacentProject type='prev' project={project.prev} />}
        {project.next && <AdjacentProject type='next' project={project.next} />}
      </section>
    </main>
  );
}

const AdjacentProject = ({ type, project }: { type: string; project: any }) => {
  const projectUrl = `/projects/${project.slug}`;

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
        <h3>{project.title}</h3>
      </Link>
    </article>
  );
};
