'use client';

import styles from './VideoItem.module.css';
import { useEffect, useRef, useState } from 'react';
import { VideoPair } from '@/utils/types';
import MuxVideo from '@mux/mux-video-react';
import dynamic from 'next/dynamic';

export default function VideoItem({
  videos,
  autoplay,
  selectorClass,
}: {
  videos: VideoPair;
  autoplay: boolean;
  selectorClass: string;
}) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);
  const ProjectFullscreenVideo = dynamic(
    () => import('./ProjectFullscreenVideo')
  );

  useEffect(() => {
    if (typeof window !== 'undefined')
      setIsDesktop(window.matchMedia('(min-width: 991px)').matches);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeFullscreen();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerRef]);

  const closeFullscreen = () => {
    setIsFullScreen(false);
    document.body.classList.remove('stopScrolling');
  };

  const handleVideoClick = () => {
    if (!isDesktop) return;
    setIsFullScreen(true);
    document.body.classList.add('stopScrolling');
  };

  return (
    <>
      <MuxVideo
        ref={playerRef as React.RefObject<HTMLVideoElement>}
        playbackId={
          videos.slideVideo.url
            ? videos.slideVideo.url
            : videos.slideVideo.playbackId
        }
        muted
        autoPlay={autoplay}
        playsInline
        loop
        minResolution='1440p'
        maxResolution='2160p'
        placeholder={undefined}
        className={[styles.videoPlayer, 'videoPlayer', selectorClass].join(' ')}
        onClick={handleVideoClick}
      />

      {isFullScreen && (
        <ProjectFullscreenVideo
          video={videos.fullVideo}
          closeFullscreen={closeFullscreen}
        />
      )}
    </>
  );
}
