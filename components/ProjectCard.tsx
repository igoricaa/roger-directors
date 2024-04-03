'use client';

import Image from 'next/image';
import styles from './ProjectCard.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';

export default function ProjectCard({ project }: any) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.matchMedia('(min-width: 991px)').matches);
    }
  }, [isDesktop]);

  const projectUrl = `/projects/${project.slug}`;

  return (
    <div className={[styles.card, styles[project.featuredSize]].join(' ')}>
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
          // priority={project.priority ? true : false}
        />
        {isDesktop && project.featuredVideoPlaybackId && (
          <MuxPlayer
            playbackId={project.featuredVideoPlaybackId}
            metadata={{ video_title: project.featuredVideoTitle }}
            muted
            loop
            autoPlay={false}
            minResolution='1440p'
            maxResolution='2160p'
            className={styles.projectVideo}
            style={{ objectFit: 'cover' }}
          />
        )}
      </Link>
    </div>
  );
}
