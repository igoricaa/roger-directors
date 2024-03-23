export const toggleVideos = (
  currentSlideIndex: number,
  nextSlideIndex: number
) => {
  const currentVideo = document.getElementsByClassName(
    `slide-${currentSlideIndex + 1}`
  )[0] as HTMLVideoElement;

  const nextVideo = document.getElementsByClassName(
    `slide-${nextSlideIndex + 1}`
  )[0] as HTMLVideoElement;

  if (!currentVideo.paused) currentVideo.pause();
  if (nextVideo.paused) nextVideo.play();
};
