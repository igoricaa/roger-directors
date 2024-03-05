import Image from 'next/image';
import styles from './TeamMember.module.css';
import { useEffect, useState } from 'react';

export function TeamMember({
  member,
  index,
  openBio,
  active,
}: {
  member: any;
  index: number;
  openBio: (index: number) => void;
  active: number | null;
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined')
      setIsDesktop(window.matchMedia('(min-width: 991px)').matches);
  }, []);

  const slideClass = isDesktop
    ? index % 3 === 0
      ? styles.slideRight
      : index % 3 === 1
      ? styles.slideCenter
      : styles.slideLeft
    : index % 2 === 0
    ? styles.slideRight
    : styles.slideLeft;

  return (
    <div
      key={member.id}
      className={[
        styles.teamMember,
        active !== null && active === index ? styles.active : '',
      ].join(' ')}
    >
      <div className={styles.hoverStateWrapper}>
        <div className={styles.bgImageWrapper}>
          <Image src={`/${member.image}`} alt={member.name} fill />
        </div>
        <div className={styles.overlay}>
          <h2>{member.name}</h2>
        </div>
      </div>
      <div className={[styles.bioWrapper, slideClass].join(' ')}>
        {isDesktop && (
          <div className={styles.bioImageWrapper}>
            <Image src={`/${member.image}`} alt={member.name} fill />
          </div>
        )}
        <div className={styles.memberInfoWrapper}>
          <div>
            {!isDesktop && (
              <div className={styles.bioImageWrapper}>
                <Image src={`/${member.image}`} alt={member.name} fill />
              </div>
            )}
            <h2>{member.name}</h2>
          </div>
          <p>{member.bio}</p>
        </div>
      </div>
      <div className={styles.closeBio} onClick={() => openBio(index)}>
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
  );
}
