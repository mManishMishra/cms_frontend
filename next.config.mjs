/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      'localhost',
      'hcinterior.in',
      'apidev.hcinterior.in',
    ],
  },
  async rewrites() {

    // Define city routes
    const citiesRoutes = [
      { source: '/interior-designers-in-noida', destination: '/services-detail?city=noida', },
      { source: '/interior-designers-in-greater-noida', destination: '/services-detail?city=greater_noida', },
      { source: '/interior-designers-in-delhi', destination: '/services-detail?city=delhi', },
      { source: '/interior-designers-in-gurgaon', destination: '/services-detail?city=gurugram', },
      { source: '/best-interior-designers-in-faridabad', destination: '/services-detail?city=faridabad', },
      { source: '/interior-designers-in-ghaziabad', destination: '/services-detail?city=ghaziabad', },
      { source: '/interior-designers-in-manesar', destination: '/services-detail?city=manesar', },
      { source: '/interior-designers-in-dwarka', destination: '/services-detail?city=dwarka', },
    ];

    // Combine static and blog routes
    const combinedRoutes = [...citiesRoutes];

    return combinedRoutes;

  },
};

export default nextConfig;