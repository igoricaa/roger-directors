'use client';

import Image from 'next/image';
import styles from './ReservoirProjectCard.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import MuxVideo from '@mux/mux-video-react';
import { Project } from '@/utils/types';
import dynamic from 'next/dynamic';
import CloseButton from './CloseButton';

export default function ReservoirProjectCard({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightBoxRatio, setLightBoxRatio] = useState(16 / 9);
  const lightboxRef = useRef<HTMLImageElement | HTMLVideoElement>(null);

  const ReservoirProjectLightboxVideo = dynamic(
    () => import('./ReservoirProjectLightboxVideo')
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
      setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
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

  const previewVideo =
    project.previewContent.previewVideo.playbackId ||
    project.previewContent.previewVideo.url;

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
            sizes='(max-width: 1024px) 50vw, 33vw'
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

        <div
          className={[styles.lightbox, showLightbox ? styles.active : ''].join(
            ' '
          )}
        >
          {!previewVideo && project.previewContent.previewImage.url && (
            <Image
              src={project.previewContent.previewImage.url}
              alt={project.previewContent.previewImage.alt}
              ref={lightboxRef as React.Ref<HTMLImageElement>}
              width={500}
              height={300 / lightBoxRatio}
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: lightBoxRatio,
              }}
              sizes='(max-width: 1024px) 100vw, 50vw'
              onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                setLightBoxRatio(naturalWidth / naturalHeight)
              }
            />
          )}
          {previewVideo && (
            <ReservoirProjectLightboxVideo
              lightboxRef={lightboxRef as React.Ref<HTMLVideoElement>}
              project={project}
              closeLightbox={closeLightbox}
            />
          )}
          <CloseButton onClickHandler={closeLightbox} />
        </div>
      </>
    </article>
  );
}
