'use client';

import Image from 'next/image';
import styles from './ProjectCard.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProjectCard({ project }: any) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.matchMedia('(min-width: 991px)').matches);
    }
  }, [isDesktop]);

  return (
    <div className={[styles.card, styles[project.size]].join(' ')}>
      <Link
        href={project.url}
        onMouseEnter={
          isDesktop ? (event: any) => event.target.play() : undefined
        }
        onMouseLeave={
          isDesktop ? (event: any) => event.target.pause() : undefined
        }
      >
        <Image
          src={project.image}
          className={project.video ? undefined : styles.noVideo}
          alt={project.title}
          fill
          sizes='(max-width: 991px) 50vw, 33vw'
          priority={project.priority ? true : false}
        />
        {isDesktop && project.video && (
          <video
            key={project.id}
            width='100%'
            autoPlay={false}
            muted
            loop
            playsInline
            className={styles.projectVideo}
          >
            <source src={project.video} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        )}
      </Link>
    </div>
  );
}
