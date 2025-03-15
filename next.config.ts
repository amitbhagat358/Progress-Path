import { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   // logging: {
//   //   fetches: {
//   //     hmrRefreshes: true,
//   //     fullUrl: true,
//   //   },
//   // },
// };

// export default nextConfig;

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ["res.cloudinary.com", "images.unsplash.com"],
  },
};

export default nextConfig;

// export default withPWA(nextConfig);
