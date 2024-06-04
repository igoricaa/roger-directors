'use client';

import { EmblaOptionsType } from 'embla-carousel';
import styles from './VideoSlider.module.css';
import useEmblaCarousel from 'embla-carousel-react';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import VideoItem from './VideoItem';
import CustomCursor from './CustomCursor';
import { VideoPair } from '@/utils/types';
import { useState } from 'react';

const OPTIONS: EmblaOptionsType = {
  containScroll: false,
  align: 'start',
};

export default function VideoSlider({ videos }: { videos: VideoPair[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);
  const [isFirstVideoDownloaded, setIsFirstVideoDownloaded] = useState(false);

  return (
    <section className={styles.embla}>
      <CustomCursor />
      <div className={styles.emblaViewport} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {videos.map((videoPair, index) => (
            <div className={styles.emblaSlide} key={index}>
              <VideoItem
                key={index}
                videos={videoPair}
                autoplay={selectedIndex === index}
                preload={index === 0 || isFirstVideoDownloaded}
                selectorClass={`slide-${index + 1}`}
                firstVideoLoadedCallback={() => {
                  setIsFirstVideoDownloaded(true);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {videos.length > 1 && (
        <div className={styles.emblaControls}>
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={selectedIndex === 0}
          />
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
          <NextButton
            onClick={onNextButtonClick}
            disabled={selectedIndex + 1 >= videos.length}
          />
        </div>
      )}
    </section>
  );
}
