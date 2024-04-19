import styles from './page.module.css';
import ProjectDescriptionContainer from '@/components/ProjectDescriptionContainer';
import { Link } from 'next-view-transitions';
import { sanityFetch } from '@/utils/sanity/client';
import VideoSlider from '@/components/VideoSlider';
import ProjectImages from '@/components/ProjectImages';
import { Project as ProjectT } from '@/utils/types';
import Image from 'next/image';

export async function generateStaticParams() {
  const projects: ProjectT[] = await sanityFetch({
    query: `*[_type == "project"]{
      slug,
    }`,
    tags: ['project'],
  });

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function Project({
  params,
}: {
  params: { slug: string };
}) {
  async function getProject(slug: string) {
    'use server';

    const project: ProjectT = await sanityFetch({
      query: `*[_type == "project" && slug == $slug][0]{
        _id,
        title,
        slug,
        loopText,
        description,
        descriptionTitle,
        descriptionExcerpt,
        'slideImage': slideImage.asset->url,
        'slideImageAlt' : slideImage.alt,
        images[]{
            alt,
            'url': asset->url,
        },
        videos[]{
          title,
          'fullVideo': {
            'playbackId': fullVideo.playbackId,
            'url': fullVideo.video.asset->playbackId,
          },
          'slideVideo': {
            'playbackId': slideVideo.playbackId,
            'url': slideVideo.video.asset->playbackId,
          }
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
      params: { slug },
      tags: ['project'],
    });

    return project;
  }

  const areProjectVideosAvailable = (project: ProjectT) => {
    return Object.values(project.videos[0].slideVideo).every(
      (x) => x === null || x === ''
    );
  };

  const project = await getProject(params.slug);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>{project.title}</h1>
      </header>
      <article className={styles.article}>
        {project.slideImage && areProjectVideosAvailable(project) && (
          <div className={styles.slideImageWrapper}>
            <Image
              src={project.slideImage.url}
              alt={project.slideImage.alt}
              fill
              sizes='100vw'
              priority
            />
          </div>
        )}
        {project.videos && !areProjectVideosAvailable(project) && (
          <div className={styles.videosWrapper}>
            <VideoSlider videos={project.videos} />
          </div>
        )}
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

          {project.images && <ProjectImages images={project.images} />}
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
