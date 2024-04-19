'use client';

import Image from 'next/image';
import styles from './ProjectCard.module.css';
import { Link } from 'next-view-transitions';
import { useEffect, useState } from 'react';
import MuxVideo from '@mux/mux-video-react';
import { Project } from '@/utils/types';

export default function ProjectCard({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.matchMedia('(min-width: 991px)').matches);
    }
  }, [isDesktop]);

  const projectUrl = `/projects/${project.slug}`;

  return (
    <article
      className={[
        styles.card,
        styles[project.featuredContent.featuredSize],
      ].join(' ')}
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
          sizes='(max-width: 991px) 50vw, 33vw'
          priority={priority}
        />
        {isDesktop && project.featuredContent.featuredVideo.playbackId && (
          <MuxVideo
            playbackId={project.featuredContent.featuredVideo.playbackId}
            muted
            loop
            autoPlay={false}
            className={styles.projectVideo}
            style={{ objectFit: 'cover' }}
            placeholder={undefined}
            poster='/blur.png'
          />
        )}
      </Link>
    </article>
  );
}
