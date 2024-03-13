'use client';

import Image from 'next/image';
import styles from './ProjectCard.module.css';
import Link from 'next/link';

export default function ProjectCard({ project }: any) {
  const togglePlay = (event: any) => {
    const video = event.target as HTMLVideoElement;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className={[styles.card, styles[project.size]].join(' ')}>
      <Link
        href={project.url}
        onMouseEnter={togglePlay}
        onMouseLeave={togglePlay}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes='(max-width: 991px) 50vw, 33vw'
          priority={project.priority ? true : false}
        />
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
      </Link>
    </div>
  );
}
