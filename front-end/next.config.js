/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    webpack: (config) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': require('path').resolve(__dirname, 'src'),
      };
      return config;
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.travelandleisureasia.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'picsum.photos',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'via.placeholder.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'www.india-tours.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'upload.wikimedia.org',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 's7ap1.scene7.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'www.photobank.in',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'pbs.twimg.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'http',
          hostname: 'visittotravel.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'housenama.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'encrypted-tbn0.gstatic.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'encrypted-tbn1.gstatic.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'encrypted-tbn2.gstatic.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'encrypted-tbn3.gstatic.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'enjoyonsen.city.beppu-jp.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'www.voylla.com',
          port: '',
          pathname: '/**',
        },
        
      ],
    },
  };

  module.exports = nextConfig;