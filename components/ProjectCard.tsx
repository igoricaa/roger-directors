'use client';

import Image from 'next/image';
import styles from './ProjectCard.module.css';
import Link from '@/components/Link';
// import Link from '@/components/LinkCustom';
import { useEffect, useState } from 'react';
import MuxVideo from '@mux/mux-video-react';
import { Project } from '@/utils/types';
import { useInView } from 'react-intersection-observer';

export default function ProjectCard({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const { ref, inView } = useInView({
    rootMargin: '200px 0px 200px 0px',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
    }
  }, [isDesktop]);

  const projectUrl = `/projects/${project.slug}`;

  return (
    <article
      className={[
        styles.card,
        styles[project.featuredContent.featuredSize],
      ].join(' ')}
      ref={ref}
    >
      <Link
        href={projectUrl}
        onMouseEnter={
          isDesktop && project.featuredContent.featuredVideo.playbackId
            ? (event: any) => event.target.play()
            : undefined
        }
        onMouseLeave={
          isDesktop && project.featuredContent.featuredVideo.playbackId
            ? (event: any) => event.target.pause()
            : undefined
        }
        className={styles.contentWrapper}
      >
        <Image
          src={project.featuredContent.featuredImage.url}
          className={
            project.featuredContent.featuredVideo.playbackId
              ? undefined
              : styles.noVideo
          }
          alt={project.featuredContent.featuredImage.alt}
          fill
          sizes='(max-width: 1024px) 50vw, 33vw'
          priority={priority}
        />

        {isDesktop &&
          project.featuredContent.featuredVideo.playbackId &&
          inView && (
            <MuxVideo
              playbackId={project.featuredContent.featuredVideo.playbackId}
              muted
              loop
              autoPlay={false}
              className={styles.projectVideo}
              placeholder={undefined}
            />
          )}
      </Link>
    </article>
  );
}
