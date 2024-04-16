import Image from 'next/image';
import styles from './TeamMember.module.css';
import { useEffect, useState } from 'react';
import MuxVideo from '@mux/mux-video-react';

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
    <article
      key={member.id}
      className={[
        styles.teamMember,
        active !== null && active === index ? styles.active : '',
      ].join(' ')}
      onClick={() => openBio(index)}
    >
      <div className={styles.hoverStateWrapper}>
        <div className={styles.bgImageWrapper}>
          <Image
            src={`${member.image}`}
            alt={member.imageAlt}
            fill
            sizes='(max-width: 991px) 50vw, 33vw'
          />
        </div>
        <div className={styles.overlay}>
          <h2>{member.name}</h2>
        </div>
      </div>

      <div className={[styles.bioWrapper, slideClass].join(' ')}>
        {isDesktop && (
          <div className={styles.bioVideoWrapper}>
            <MuxVideo
              // ref={playerRef as React.RefObject<HTMLVideoElement>}
              // playbackId={
              //   videos.slideVideo.url
              //     ? videos.slideVideo.url
              //     : videos.slideVideo.playbackId
              // }
              muted
              autoPlay={false}
              loop
              minResolution='1440p'
              maxResolution='2160p'
              placeholder={undefined}
              // className={[
              //   styles.videoPlayer,
              //   'videoPlayer',
              //   selectorClass,
              // ].join(' ')}
              // onClick={handleVideoClick}
              poster='/blur.png'
            />
          </div>
        )}
        <div className={styles.memberInfoWrapper}>
          <div>
            {!isDesktop && (
              <div className={styles.bioVideoWrapper}>
                {/* <Image src={`${member.image}`} alt={member.imageAlt} fill /> */}
              </div>
            )}
            <h2>{member.name}</h2>
          </div>
          <p>{member.bio}</p>
        </div>
      </div>
      <button className={styles.closeBio} onClick={() => openBio(index)}>
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
      </button>
    </article>
  );
}
