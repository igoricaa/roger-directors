export type Video = {
  playbackId?: string;
  url?: string;
};

export type VideoPair = {
  title: string;
  fullVideo: Video;
  slideVideo: Video;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  loopText: string;
  description: string;
  descriptionTitle: string;
  descriptionExcerpt: string;
  featuredImage: any;
  featuredVideo: any;
  images: any[];
  videos: VideoPair[];
  prev: string;
  next: string;
};

export type PageCard = {
  type: string;
  title: string;
  description: any;
  size: string;
};