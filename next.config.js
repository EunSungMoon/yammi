/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.jsx', 'api.js'],
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
      pure: true,
    },
  },
  serverRuntimeConfig: {
    mode: process.env.MODE,
  },
  publicRuntimeConfig: {
    appVersion: process.env.APP_VERSION,
    mode: process.env.MODE,
    apiHost: process.env.API_HOST,
    apiVersion: process.env.API_VERSION,
    naverLoginClientId: process.env.NAVER_LOGIN_CLIENT_ID,
  },
};

module.exports = nextConfig;
