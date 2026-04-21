import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["page.js", "page.jsx"],
  webpack: (config) => {
    config.resolve.alias["react-router-dom"] = path.resolve(
      "./src/compat/react-router-dom.js"
    );
    config.resolve.alias["react-slick"] = path.resolve(
      "./src/compat/react-slick.jsx"
    );
    return config;
  },
};

export default nextConfig;
