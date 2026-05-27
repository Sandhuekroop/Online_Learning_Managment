// // /** @type {import('next').NextConfig} */
// // const nextConfig = {};

// // export default nextConfig;

// import path from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack(config) {
//     config.resolve.alias['@'] = path.resolve(__dirname);
//     return config;
//   },
//   images:{
//     domains:['firebasestorage.googleapis.com']
//   }
// };

// export default nextConfig;


import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webpackBuildWorker: true,   // ✅ REQUIRED for App Router API routes in webpack mode
  },

  webpack(config) {
    // config.resolve.alias['@'] = path.resolve(__dirname);
    config.resolve.alias['@'] = path.resolve(__dirname, '@');

    return config;
  },

  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

export default nextConfig;
