'use client';

import { useState, useEffect } from 'react';
import styles from './CustomCursor.module.css';

interface Position {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [hoveringOverElement, setHoveringOverElement] =
    useState<boolean>(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX - 32, y: e.clientY - 32});
    };
    const onMouseEnter = () => {};
    const onMouseLeave = () => {
      setHoveringOverElement(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains('videoPlayer')) {
        setHoveringOverElement(true);
        target.style.cursor = 'none';
      } else {
        setHoveringOverElement(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className={[
        styles.customCursor,
        hoveringOverElement ? styles.hoveringOverElement : '',
      ].join(' ')}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {hoveringOverElement && <span>play</span>}
    </div>
  );
};

export default CustomCursor;
