/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/integrador/:path*',
        destination: 'https://integrador-api-production.up.railway.app/:path*',
      },
    ];
  },
};

export default nextConfig;
