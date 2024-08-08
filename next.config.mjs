/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qszwpnlacxirnweqburh.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;