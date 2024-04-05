/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "reqres.in",
        pathname: "*/**",
      },
    ],
  },
};

export default nextConfig;
