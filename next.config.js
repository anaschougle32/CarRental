/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true, 
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    // Ignore WebSocket optional dependencies warnings
    config.ignoreWarnings = [
      { module: /node_modules\/ws\/lib\/buffer-util\.js/ },
      { module: /node_modules\/ws\/lib\/validation\.js/ },
    ];
    return config;
  },
};

module.exports = nextConfig;
