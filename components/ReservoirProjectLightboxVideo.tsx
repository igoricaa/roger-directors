import styles from './ReservoirProjectCard.module.css';
import { Project } from '@/utils/types';
import MuxVideo from '@mux/mux-video-react';

export default function ReservoirProjectLightboxVideo({
  project,
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
        minResolution='1440p'
        maxResolution='2160p'
        className={styles.previewReservoirProjectVideo}
        placeholder={undefined}
      />
    </>
  );
}
