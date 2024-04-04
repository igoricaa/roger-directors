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

const OPTIONS: EmblaOptionsType = {
  containScroll: false,
  loop: true,
  align: 'start',
};

export default function VideoSlider({ videos }: { videos: VideoPair[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

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
                selectorClass={`slide-${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {videos.length > 1 && (
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
      )}
    </section>
  );
}
