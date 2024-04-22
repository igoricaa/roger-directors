export type Video = {
  playbackId?: string;
  url?: string;
};

export type VideoPair = {
  title: string;
  fullVideo: Video;
  slideVideo: Video;
};

export type ImageMeta = {
  url: string;
  alt: string;
};

type ProjectOrder = {
  column: number;
  columnOrder: number;
};

type ProjectFeaturedContent = {
  featuredSize: string;
  featuredImage: ImageMeta;
  featuredVideo: Video;
};

type ReservoirProjectPreviewContent = {
  previewImage: ImageMeta;
  previewVideo: Video;
};

export type Project = {
  title: string;
  type: string;
  slug: string;
  loopText: string;
  description: string;
  descriptionTitle: string;
  descriptionExcerpt: string;
  desktopOrder: ProjectOrder;
  mobileOrder: ProjectOrder;
  featuredContent: ProjectFeaturedContent;
  images: ImageMeta[];
  slideImage: ImageMeta;
  videos: VideoPair[];
  prev: string;
  next: string;
  previewContent: ReservoirProjectPreviewContent;
};

export type PageCard = {
  type: string;
  title: string;
  description: any;
  buttonText: string;
  size: string;
};

export type TeamMember = {
  _id: number;
  name: string;
  bio: string;
  position: string;
  imageUrl: string;
  imageAlt: string;
  videoPlaybackId: string;
  videoUrl: string;
  videoTitle: string;
};

export type Route = {
  name: string;
  path: string;
};
