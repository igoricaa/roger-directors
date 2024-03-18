import { withNextVideo } from 'next-video/process';
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextVideo(nextConfig);
