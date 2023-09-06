/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: true,
    serverActions: true,
    instrumentationHook: true,
  },
}

export default nextConfig
