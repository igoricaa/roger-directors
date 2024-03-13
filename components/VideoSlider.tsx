'use client';

import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { useCallback, useEffect } from 'react';
import styles from './VideoSlider.module.css';
import useEmblaCarousel from 'embla-carousel-react';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
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

export default function VideoSlider({ videos }: { videos: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const toggleMute = (videoIndex: number) => {
    const video = document.getElementById(
      `slide-${videoIndex}`
    ) as HTMLVideoElement;
    if (video.muted) {
      video.muted = false;
    } else {
      video.muted = true;
    }
  };

  const togglePlay = (event: any) => {
    const video = event.target as HTMLVideoElement;
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
              <video
                key={index}
                width='100%'
                id={`slide-${index + 1}`}
                autoPlay={selectedIndex === index}
                muted
                loop
                playsInline
                className={styles.nextVideoContainer}
                onClick={(event) => {
                  togglePlay(event);
                }}
              >
                <source src={video} type='video/mp4' />
                Your browser does not support the video tag.
              </video>

              <button
                type='button'
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
      </div>
    </section>
  );
}
