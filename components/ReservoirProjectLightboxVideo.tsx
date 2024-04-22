import styles from './ReservoirProjectCard.module.css';
import { Project } from '@/utils/types';
import MuxVideo from '@mux/mux-video-react';
import CloseButton from './CloseButton';

export default function ReservoirProjectLightboxVideo({
  project,
  closeLightbox,
  lightboxRef,
}: {
  project: Project;
  closeLightbox: () => void;
  lightboxRef: React.Ref<HTMLVideoElement>;
}) {
  return (
    <>
      <MuxVideo
        ref={lightboxRef as React.Ref<HTMLVideoElement>}
        playbackId={project.previewContent.previewVideo.playbackId}
        controls
        disablePictureInPicture
        autoPlay
        minResolution='1440p'
        maxResolution='2160p'
        className={styles.previewReservoirProjectVideo}
        placeholder={undefined}
      />

      <CloseButton onClickHandler={closeLightbox} />
    </>
  );
}
