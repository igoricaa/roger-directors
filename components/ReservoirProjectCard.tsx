'use client';

import Image from 'next/image';
import styles from './ReservoirProjectCard.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import MuxVideo from '@mux/mux-video-react';
import { Project } from '@/utils/types';
import dynamic from 'next/dynamic';

export default function ReservoirProjectCard({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const lightboxRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  const ReservoirProjectLightboxContent = dynamic(
    () => import('./ReservoirProjectLightboxContent')
  );

  const handleClickOutside = useCallback((event: any) => {
    if (
      lightboxRef &&
      lightboxRef.current &&
      !lightboxRef.current!.contains(event.target)
    ) {
      closeLightbox();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.matchMedia('(min-width: 991px)').matches);
    }

    document.addEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside, isDesktop]);

  const closeLightbox = () => {
    setShowLightbox(false);
    if (
      lightboxRef.current &&
      lightboxRef.current instanceof HTMLVideoElement
    ) {
      if (!lightboxRef.current.paused) lightboxRef.current.pause();
    }
  };

  return (
    <article
      className={[
        styles.card,
        styles[project.featuredContent.featuredSize],
        styles.reservoir,
      ].join(' ')}
    >
      <>
        <div
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
          onClick={() => setShowLightbox(true)}
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
              placeholder={undefined}
            />
          )}
        </div>

        {showLightbox && (
          <div
            className={[
              styles.lightbox,
              showLightbox ? styles.active : '',
            ].join(' ')}
          >
            <ReservoirProjectLightboxContent
              lightboxRef={lightboxRef as React.Ref<HTMLImageElement>}
              project={project}
              closeLightbox={closeLightbox}
            />
          </div>
        )}
      </>
    </article>
  );
}
