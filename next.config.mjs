// import { withNextVideo } from 'next-video/process';
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['cdn.sanity.io'],
  },
};

export default nextConfig;

// export default withNextVideo(nextConfig);
