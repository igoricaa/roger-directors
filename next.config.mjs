/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_MAPS_API_KEY: 'AIzaSyBnjDbgu-BXDMw4H6j_wwv8zRGvUVK6Rgs',
    MUX_TOKEN_ID: 'c0fd6566-6796-4e58-b0a1-25c6cd8d619c',
    MUX_TOKEN_SECRET:
      'evmby6xJjsqwwZMPHaw3aSEBNWFrkr35soB2ydUnCOyfKbPXnWXmVFbktZit3aFt8J9O/dII+op',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
