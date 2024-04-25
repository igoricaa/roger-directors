import styles from './ProjectFullscreenVideo.module.css';
import MuxVideo from '@mux/mux-video-react';
import { createPortal } from 'react-dom';
import CloseButton from './CloseButton';
import { Video } from '@/utils/types';

const ProjectFullscreenVideo = ({
  video,
  closeFullscreen,
  isMobile,
}: {
  video: Video;
  closeFullscreen: () => void;
  isMobile: boolean;
}) => {
  return createPortal(
    <div
      className={[
        styles.fullVideoPlayerWrapper,
        isMobile ? styles.mobile : '',
      ].join(' ')}
    >
      <MuxVideo
        playbackId={video.url ? video.url : video.playbackId}
        controls
        disablePictureInPicture
        autoPlay
        minResolution='1440p'
        maxResolution='2160p'
        className={styles.fullVideoPlayer}
        placeholder={undefined}
      />
      <CloseButton onClickHandler={closeFullscreen} />
    </div>,
    document.body
  );
};

export default ProjectFullscreenVideo;
