'use client';

import styles from './ProjectDescriptionContainer.module.css';
import { useState } from 'react';

export default function ProjectDescriptionContainer({
  descriptionTitle,
  description,
  descriptionExceprt,
}: {
  descriptionTitle: string;
  description: string;
  descriptionExceprt: string;
}) {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className={styles.descriptionContainer}>
      <div
        className={[styles.innerWrapper, active ? styles.active : ''].join(' ')}
      >
        <h2>{descriptionTitle}</h2>
        <p>
          {active ? description : descriptionExceprt}
        </p>
        <div className={styles.closeBio} onClick={() => setActive(!active)}>
          <span onClick={() => setActive(!active)}>
            {active ? '' : 'Find out more'}
          </span>
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
              stroke='#232323'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='3'
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
