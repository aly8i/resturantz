/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["firebasestorage.googleapis.com","hfc-resto.appspot.com","images.app.goo.gl","lh3.googleusercontent.com"]
  },
}

module.exports = nextConfig
