import { isMobileDevice } from './isMobile';
import { Project } from './types';

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
const isMobile = isMobileDevice();

export const filterAndSortProjects = (projects: Project[], columnNumber: number) => {
  return isMobile
    ? columnNumber !== 3
      ? projects
          .filter((project) => project.mobileOrder.column === columnNumber)
          .sort((a, b) => a.mobileOrder.columnOrder - b.mobileOrder.columnOrder)
      : []
    : projects
        .filter((project) => project.desktopOrder.column === columnNumber)
        .sort(
          (a, b) => a.desktopOrder.columnOrder - b.desktopOrder.columnOrder
        );
};
