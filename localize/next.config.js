module.exports = {
  images: {
    domains: ['res.cloudinary.com', 'api.qrserver.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
