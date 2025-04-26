/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
    domains: ['localhost'],
  },
  output: 'standalone',
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Enable SWC minification for faster builds
  swcMinify: true,
  // Configure webpack for better performance
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 70000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
  // Enable compression for better performance
  compress: true,
  // Configure static page generation
  poweredByHeader: false,
  // Enable source maps in development
  productionBrowserSourceMaps: true,
  // Increase static page generation timeout
  staticPageGenerationTimeout: 300,
  // Configure page revalidation
  experimental: {
    // Enable incremental static regeneration
    isrMemoryCacheSize: 0,
    // Optimize static page generation
    optimizeCss: true,
    // Enable concurrent features
    workerThreads: true,
  },
  // Configure build optimization
  onDemandEntries: {
    // Increase the period before a page is disposed
    maxInactiveAge: 60 * 1000,
    // Number of pages to keep in memory
    pagesBufferLength: 5,
  },
}

module.exports = nextConfig 