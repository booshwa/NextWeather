// /** @type {import('next').NextConfig} */
// module.exports = {
//   output: "export",
// };

/** @type {import('next').NextConfig} */

var nextConfig = {};

if (process.env.NODE_ENV == "production") {
  const basePath = process.env.BASE_PATH;
  const domain = process.env.DOMAIN;

  nextConfig = {
    output: "export",
    basePath,
    trailingSlash: true,
    images: {
      domains: [domain],
      path: `${basePath}/_next/image`,
    },
    async rewrites() {
      return [
        {
          source: `${basePath}/`,
          destination: `${basePath}/index`,
        },
      ];
    },
  };
} else {
  nextConfig = {
    reactStrictMode: false,
  };
}

module.exports = nextConfig;
