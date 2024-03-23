'use client';

import Image from 'next/image';
import styles from './ProjectImages.module.css';
import { useEffect, useState } from 'react';

// type Image = {
//   _key: string;
//   alt: string;
//   asset: {
//     _ref: string;
//   };
// };

export default function ProjectImages({ images }: { images: any[] }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.matchMedia('(min-width: 991px)').matches);
    }
  }, [isDesktop]);

  const desktopImages = () => {
    return images.map((image, index) => (
      <div className={styles.imageWrapper} key={index}>
        <Image src={image.url} alt={`Project image ${index + 1}`} fill />
      </div>
    ));
  };

  const mobileImages = () => {
    return (
      <>
        <div className={styles.imagesColumn}>
          {images.slice(0, 2).map((image, index) => (
            <div
              className={[
                styles.imageWrapper,
                styles[`image${index + 1}`],
              ].join(' ')}
              key={index}
            >
              <Image src={image.url} alt={`Project image ${index + 1}`} fill />
            </div>
          ))}
        </div>
        <div className={styles.imagesColumn}>
          {images.slice(2, 4).map((image, index) => (
            <div
              className={[
                styles.imageWrapper,
                styles[`image${index + 3}`],
              ].join(' ')}
              key={index}
            >
              <Image src={image.url} alt={`Project image ${index + 1}`} fill />
            </div>
          ))}
        </div>
        <div className={styles.imagesColumn}>
          {images.slice(-1).map((image, index) => (
            <div
              className={[
                styles.imageWrapper,
                styles[`image${index + 5}`],
              ].join(' ')}
              key={index}
            >
              <Image src={image.url} alt={`Project image ${index + 1}`} fill />
            </div>
          ))}
        </div>
      </>
    );
  };

  return isDesktop ? desktopImages() : mobileImages();
}
