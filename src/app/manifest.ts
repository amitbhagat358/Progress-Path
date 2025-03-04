import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Progress Path",
    short_name: "PP",
    description: "Progress Tracking app made by Amit Bhagat",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icons/pp-logo192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/pp-logo512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
