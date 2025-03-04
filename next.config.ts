// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   // logging: {
//   //   fetches: {
//   //     hmrRefreshes: true,
//   //     fullUrl: true,
//   //   },
//   // },
// };

// export default nextConfig;

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
    skipWaiting: true, // Forces service worker to update
    clientsClaim: true, // Takes control immediately
  },
});

const nextConfig = {};

export default withPWA(nextConfig);
