
// next.config.js
module.exports = {
  images: {
    domains: [
      'blooogerai.s3.ap-south-1.amazonaws.com', // Your S3 bucket URL
      's3.ap-south-1.amazonaws.com', // Regional endpoint
      'lh3.googleusercontent.com', // Googleusercontent
      'm.media-amazon.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blooogerai.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  "rewrites": [
      {
        "source": "/(.*)",
        "destination": "/"
      }
    ]
}