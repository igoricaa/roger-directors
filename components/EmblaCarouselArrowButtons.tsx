import React, { PropsWithChildren, useCallback } from 'react';
import styles from './EmblaCarouselArrowButtons.module.css';
import { EmblaCarouselType } from 'embla-carousel';
import { toggleVideos } from '@/utils/utils';

type UsePrevNextButtonsType = {
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;

    toggleVideos(
      emblaApi.selectedScrollSnap(),
      emblaApi.selectedScrollSnap() - 1
    );

    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;

    toggleVideos(
      emblaApi.selectedScrollSnap(),
      emblaApi.selectedScrollSnap() + 1
    );

    emblaApi.scrollNext();
  }, [emblaApi]);

  return {
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className={[styles.emblaButton, styles.emblaButtonPrev].join(' ')}
      type='button'
      {...restProps}
    >
      <span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='18.593'
          height='33.792'
          viewBox='0 0 18.593 33.792'
        >
          <path
            id='Path_11'
            data-name='Path 11'
            d='M0,0,14.972,14.775,0,29.549'
            transform='translate(2.121 2.121)'
            fill='none'
            stroke='#fff'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='3'
          />
        </svg>
      </span>
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className={[styles.emblaButton, styles.emblaButtonNext].join(' ')}
      type='button'
      {...restProps}
    >
      <span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='18.593'
          height='33.792'
          viewBox='0 0 18.593 33.792'
        >
          <path
            id='Path_11'
            data-name='Path 11'
            d='M0,0,14.972,14.775,0,29.549'
            transform='translate(2.121 2.121)'
            fill='none'
            stroke='#fff'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='3'
          />
        </svg>
      </span>
      {children}
    </button>
  );
};
