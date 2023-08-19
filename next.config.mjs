/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: true,
    instrumentationHook: true,
  },
}

export default nextConfig
