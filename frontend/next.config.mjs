/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Agar aapka repo name 'ai-task-manager' hai toh ye line zaroori hai
  basePath: '/ai-task-manager',
  assetPrefix: '/ai-task-manager',
};

export default nextConfig;