/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "image.tmdb.org",
      "avatars.githubusercontent.com",
      "via.placeholder.com",
    ],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
