import MuxPlayer from '@mux/mux-player-react';
import styles from './VideoItem.module.css';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import MuxPlayerElement from '@mux/mux-player';
import { VideoPair } from '@/utils/helpers';

export default function VideoItem({
  videos,
  autoplay,
  selectorClass,
}: {
  videos: VideoPair;
  autoplay: boolean;
  selectorClass: string;
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const playerRef = useRef<MuxPlayerElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined')
      setIsDesktop(window.matchMedia('(min-width: 991px)').matches);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeFullscreenHandler();
      }
    };

    const videoPlayer = playerRef.current as HTMLVideoElement;
    if (videoPlayer) {
      videoPlayer.addEventListener('click', () => {
        setIsFullScreen(true);
        document.body.classList.add('stopScrolling');
      });
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerRef]);

  const toggleMute = () => {
    const video = playerRef.current as MuxPlayerElement;
    if (video.muted) {
      video.muted = false;
    } else {
      video.muted = true;
    }
  };

  const closeFullscreenHandler = () => {
    setIsFullScreen(false);
    document.body.classList.remove('stopScrolling');
  };

  return (
    <>
      <MuxPlayer
        ref={playerRef}
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
        className={[styles.videoPlayer, 'videoPlayer', selectorClass].join(' ')}
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

            <MuxPlayer
              playbackId={
                videos.fullVideo.url
                  ? videos.fullVideo.url
                  : videos.fullVideo.playbackId
              }
              metadata={{ video_title: videos.title }}
              autoPlay={autoplay}
              minResolution='1440p'
              maxResolution='2160p'
              className={styles.fullVideoPlayer}
            />
          </>,
          document.body
        )}
      {isDesktop && (
        <button
          type='button'
          id='muteButton'
          className={styles.muteButton}
          onClick={toggleMute}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='41.047'
            height='32.116'
            viewBox='0 0 41.047 32.116'
          >
            <g id='Mute_Icon' transform='translate(-4.5 -12.5)'>
              <path
                id='Path_24'
                data-name='Path 24'
                d='M25.609,14l-10.1,8.913H6V34.2h9.507l10.1,8.913Z'
                transform='translate(0 0)'
                fill='#fff'
                stroke='#fff'
                strokeLinejoin='round'
                strokeWidth='3'
              />
              <path
                id='Path_25'
                data-name='Path 25'
                d='M49,26,60.884,40.261m0-14.261L49,40.261'
                transform='translate(-17.449 -4.87)'
                fill='none'
                stroke='#fff'
                strokeLinecap='round'
                strokeWidth='3'
              />
            </g>
          </svg>
        </button>
      )}
    </>
  );
}
