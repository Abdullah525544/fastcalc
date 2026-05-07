import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tools/tip-calculator",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/tools/tap-tempo",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/tools/password-generator",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/tools/grade-calculator",
        destination: "/tools",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
