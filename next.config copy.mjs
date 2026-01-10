/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true, // Enable gzip compression (helps load speed)
  poweredByHeader: false, // Hides "X-Powered-By: Next.js"

  images: {
    unoptimized: false, // Use Next.js image optimization
    domains: [
      'localhost',
      'high.creation.dev.crudbyte.com', // no need to prefix with http
      'app.hcinterior.in',
    ],
  },

  async rewrites() {
    const citiesRoutes = [
      { source: '/interior-designers-in-noida', destination: '/services-detail?city=noida' },
      { source: '/interior-designers-in-greater-noida', destination: '/services-detail?city=greater_noida' },
      { source: '/interior-designers-in-delhi', destination: '/services-detail?city=delhi' },
      { source: '/interior-designers-in-gurgaon', destination: '/services-detail?city=gurugram' },
      { source: '/best-interior-designers-in-faridabad', destination: '/services-detail?city=faridabad' },
      { source: '/interior-designers-in-ghaziabad', destination: '/services-detail?city=ghaziabad' },
      { source: '/interior-designers-in-manesar', destination: '/services-detail?city=manesar' },
      { source: '/interior-designers-in-dwarka', destination: '/services-detail?city=dwarka' },
    ];
    return [...citiesRoutes];
  },

  experimental: {
    optimizeCss: true, // Reduce CSS size
  },

  output: 'standalone', // Better for production deployments
};

export default nextConfig;
