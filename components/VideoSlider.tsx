'use client';

import { EmblaOptionsType } from 'embla-carousel';
import { useEffect, useState } from 'react';
import styles from './VideoSlider.module.css';
import useEmblaCarousel from 'embla-carousel-react';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import MuxPlayer from '@mux/mux-player-react';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';

const OPTIONS: EmblaOptionsType = {
  containScroll: false,
  loop: true,
  align: 'start',
};

type Video = {
  title: string;
  playbackId: string;
};

export default function VideoSlider({ videos }: { videos: Video[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined')
      setIsDesktop(window.matchMedia('(min-width: 991px)').matches);
  }, []);

  const toggleMute = (videoIndex: number) => {
    const video = document.getElementsByClassName(
      `slide-${videoIndex}`
    )[0] as HTMLVideoElement;
    if (video.muted) {
      video.muted = false;
    } else {
      video.muted = true;
    }
  };

  const togglePlay = (videoIndex: number) => {
    const video = document.getElementsByClassName(
      `slide-${videoIndex}`
    )[0] as HTMLVideoElement;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <section className={styles.embla}>
      <div className={styles.emblaViewport} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {videos.map((video, index) => (
            <div className={styles.emblaSlide} key={index}>
              <div
                className={styles.muxPlayerWrapper}
                onClick={() => togglePlay(index + 1)}
              >
                <MuxPlayer
                  playbackId={video.playbackId}
                  metadata={{ video_title: video.title }}
                  muted
                  autoPlay={selectedIndex === index}
                  loop
                  minResolution='1440p'
                  maxResolution='2160p'
                  className={[
                    styles.nextVideoContainer,
                    `slide-${index + 1}`,
                  ].join(' ')}
                />
              </div>

              {isDesktop && (
                <button
                  type='button'
                  id='muteButton'
                  className={styles.muteButton}
                  onClick={() => toggleMute(index + 1)}
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
            </div>
          ))}
        </div>
      </div>

      <div className={styles.emblaControls}>
        <PrevButton onClick={onPrevButtonClick} />
        <div className={styles.emblaDots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={[
                styles.emblaDot,
                index === selectedIndex ? styles.emblaDotSelected : '',
              ].join(' ')}
            />
          ))}
        </div>
        <NextButton onClick={onNextButtonClick} />
        {!isDesktop && (
          <button
            type='button'
            className={styles.muteButton}
            onClick={() => toggleMute(selectedIndex + 1)}
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
      </div>
    </section>
  );
}
