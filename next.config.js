/** @type {import('next').NextConfig} */

// const nextConfig = {
module.exports = {
  reactStrictMode: true,
  /**   output: 'export', */
  distDir: "build",

  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
    unoptimized: true
  },



// for CORS policy
/**   async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  },
  */
 
};



// module.exports = nextConfig;

