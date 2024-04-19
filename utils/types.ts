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
  slideImage: string;
  slideImageAlt: string;
  videos: VideoPair[];
  prev: string;
  next: string;
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
