'use client';

import { ImageMeta } from '@/utils/types';
import styles from './ProjectImagesSlider.module.css';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import Image from 'next/image';

const OPTIONS: EmblaOptionsType = {
  containScroll: false,
  align: 'start',
};

const ProjectImagesSlider = ({ images }: { images: ImageMeta[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <section className={styles.embla}>
      <div className={styles.emblaViewport} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {images.map((image, index) => (
            <div className={styles.emblaSlide} key={index}>
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes='100vw'
                priority
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
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
            disabled={selectedIndex + 1 >= images.length}
          />
        </div>
      )}
    </section>
  );
};

export default ProjectImagesSlider;
