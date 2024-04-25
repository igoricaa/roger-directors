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

export const filterAndSortProjects = (
  projects: Project[],
  columnNumber: number,
  isMobile: boolean
) => {
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

export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
