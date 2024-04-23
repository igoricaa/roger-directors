'use client';

import Image from 'next/image';
import styles from './TeamMember.module.css';
import { useEffect, useRef, useState } from 'react';
import MuxVideo from '@mux/mux-video-react';
import { TeamMember as TeamMemberMeta } from '@/utils/types';
import muteIcon from '@/public/mute-icon.svg';
import unmuteIcon from '@/public/unmute-icon.svg';
import replayIcon from '@/public/replay-icon.svg';

export function TeamMember({
  member,
  index,
  toggleBio,
  active,
}: {
  member: TeamMemberMeta;
  index: number;
  toggleBio: (index: number) => void;
  active: number | null;
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const isActive = active !== null && active === index;

  useEffect(() => {
    if (typeof window !== 'undefined')
      setIsDesktop(window.matchMedia('(min-width: 991px)').matches);

    if (playerRef.current) {
      const video = playerRef.current as HTMLVideoElement;
      if (isActive) {
        !isDesktop && playerRef.current?.scrollIntoView({ behavior: 'smooth' });
        video.play();
      } else {
        video.pause();
      }
    }
  }, [isActive, index, isDesktop]);

  const teamMemberClickHandler = (index: number, clickEvent?: any) => {
    if (
      clickEvent &&
      videoWrapperRef.current &&
      !videoWrapperRef.current.contains(clickEvent.target)
    ) {
      toggleBio(index);
    }

    playerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  };

  const replayVideoHandler = () => {
    const video = playerRef.current as HTMLVideoElement;
    video.currentTime = 0;
    video.play();
  };

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
      key={member._id}
      className={[
        styles.teamMember,
        isActive ? styles.active : '',
        index % 2 !== 0 ? styles.odd : '',
      ].join(' ')}
      onClick={(event) => teamMemberClickHandler(index, event)}
    >
      <div className={styles.hoverStateWrapper}>
        <div className={styles.bgImageWrapper}>
          <Image
            src={`${member.imageUrl}`}
            alt={member.imageAlt}
            fill
            sizes='(max-width: 991px) 50vw, 33vw'
            priority={[...Array(6).keys()].includes(index) ? true : false}
          />
        </div>
        <div className={styles.overlay}>
          <h2>{member.name}</h2>
          <p>{member.position}</p>
        </div>
      </div>

      <div className={[styles.bioWrapper, slideClass].join(' ')}>
        <div ref={videoWrapperRef} className={styles.bioVideoWrapper}>
          <div
            className={[
              styles.videoControlButton,
              styles.replayVideoButton,
            ].join(' ')}
            onClick={replayVideoHandler}
          >
            <Image src={replayIcon} alt='Replay video' />
          </div>
          <MuxVideo
            ref={playerRef as React.RefObject<HTMLVideoElement>}
            playbackId={
              member.videoPlaybackId ? member.videoPlaybackId : member.videoUrl
            }
            muted={isVideoMuted}
            loop
            minResolution='1440p'
            maxResolution='2160p'
            playsInline
            placeholder={undefined}
          />
          <div
            className={[styles.videoControlButton, styles.muteVideoButton].join(
              ' '
            )}
            onClick={() => setIsVideoMuted(!isVideoMuted)}
          >
            <Image
              src={isVideoMuted ? muteIcon : unmuteIcon}
              alt='Mute video'
            />
          </div>
        </div>
        <div className={styles.memberInfoWrapper}>
          <h2>{member.name}</h2>
          <p>{member.bio}</p>
        </div>
      </div>
      <button
        className={styles.closeBio}
        onClick={() => teamMemberClickHandler(index)}
      >
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
