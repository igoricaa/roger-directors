import styles from './AccordionItem.module.css';
import { Project } from '@/utils/types';
import MuxVideo from '@mux/mux-video-react';
import Image from 'next/image';
import { useState } from 'react';
import CloseButton from './CloseButton';

export default function ReservoirProjectLightboxContent({
  project,
  closeLightbox,
  lightboxRef,
}: {
  project: Project;
  closeLightbox: () => void;
  lightboxRef: React.Ref<HTMLImageElement | HTMLVideoElement>;
}) {
  const [lightBoxRatio, setLightBoxRatio] = useState(16 / 9);

  const previewVideo =
    project.previewContent.previewVideo.playbackId ||
    project.previewContent.previewVideo.url;

  return (
    <>
      {!previewVideo && project.previewContent.previewImage.url && (
        <Image
          src={project.previewContent.previewImage.url}
          alt={project.previewContent.previewImage.alt}
          ref={lightboxRef as React.Ref<HTMLImageElement>}
          width={500}
          height={300 / lightBoxRatio}
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: lightBoxRatio,
          }}
          sizes='(max-width: 991px) 100vw, 50vw'
          onLoadingComplete={({ naturalWidth, naturalHeight }) =>
            setLightBoxRatio(naturalWidth / naturalHeight)
          }
        />
      )}
      {previewVideo && (
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
      )}

      <CloseButton onClickHandler={closeLightbox} />
    </>
  );
}
