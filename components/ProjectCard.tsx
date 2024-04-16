'use client';

import Image from 'next/image';
import styles from './ProjectCard.module.css';
import { Link } from 'next-view-transitions';
import { useEffect, useState } from 'react';
import MuxVideo from '@mux/mux-video-react';

export default function ProjectCard({
  project,
  priority,
}: {
  project: any;
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
    <article className={[styles.card, styles[project.featuredSize]].join(' ')}>
      <Link
        href={projectUrl}
        onMouseEnter={
          isDesktop && project.featuredVideoPlaybackId
            ? (event: any) => event.target.play()
            : undefined
        }
        onMouseLeave={
          isDesktop && project.featuredVideoPlaybackId
            ? (event: any) => event.target.pause()
            : undefined
        }
      >
        <Image
          src={project.featuredImage}
          className={
            project.featuredVideoPlaybackId ? undefined : styles.noVideo
          }
          alt={project.featuredImageAlt}
          fill
          sizes='(max-width: 991px) 50vw, 33vw'
          priority={priority}
        />
        {isDesktop && project.featuredVideoPlaybackId && (
          <MuxVideo
            playbackId={project.featuredVideoPlaybackId}
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
