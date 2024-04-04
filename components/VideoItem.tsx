'use client';

import styles from './VideoItem.module.css';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { VideoPair } from '@/utils/types';
import MuxVideo from '@mux/mux-video-react';

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
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeFullscreenHandler();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerRef]);

  const closeFullscreenHandler = () => {
    setIsFullScreen(false);
    document.body.classList.remove('stopScrolling');
  };

  const handleVideoClick = () => {
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
        metadata={{ video_title: videos.title }}
        muted
        autoPlay={autoplay}
        loop
        minResolution='1440p'
        maxResolution='2160p'
        placeholder={undefined}
        className={[styles.videoPlayer, 'videoPlayer', selectorClass].join(' ')}
        onClick={handleVideoClick}
      />

      {isFullScreen &&
        createPortal(
          <>
            <button
              className={styles.closeFullscreenButton}
              onClick={closeFullscreenHandler}
            >
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
            </button>

            <MuxVideo
              playbackId={
                videos.fullVideo.url
                  ? videos.fullVideo.url
                  : videos.fullVideo.playbackId
              }
              metadata={{ video_title: videos.title }}
              controls
              disablePictureInPicture
              autoPlay
              minResolution='1440p'
              maxResolution='2160p'
              className={styles.fullVideoPlayer}
              placeholder={undefined}
            />
          </>,
          document.body
        )}
    </>
  );
}
