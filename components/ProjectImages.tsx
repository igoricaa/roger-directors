'use client';

import Image from 'next/image';
import styles from './ProjectImages.module.css';
import { useEffect, useState } from 'react';

type ProjectImage = {
  url: string;
  alt: string;
};

export default function ProjectImages({ images }: { images: ProjectImage[] }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
    }
  }, [isDesktop]);

  const desktopImages = () => {
    return images.map((image, index) => (
      <div className={styles.imageWrapper} key={index}>
        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes='(max-width: 1024px) 50vw, 33vw'
          quality={100}
        />
      </div>
    ));
  };

  const mobileColumns = [
    [images[2], images[0]],
    [images[1], images[3]],
    images.slice(-1),
  ];

  const mobileImages = () => {
    return (
      <>
        {mobileColumns.map((column, columnIndex) => (
          <div
            className={[
              styles.imagesColumn,
              styles[`imagesColumn${columnIndex}`],
            ].join(' ')}
            key={columnIndex}
          >
            {column.map((image, index) => (
              <div
                className={[
                  styles.imageWrapper,
                  styles[`image${index + 1}`],
                ].join(' ')}
                key={index}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes={columnIndex === 2 ? '100vw' : '50vw'}
                  quality={100}
                />
              </div>
            ))}
          </div>
        ))}
      </>
    );
  };

  return isDesktop ? desktopImages() : mobileImages();
}
