import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@navigation"] = path.resolve("./src/lib/navigation.js");
    config.resolve.alias["react-slick"] = path.resolve(
      "./src/compat/react-slick.jsx"
    );
    return config;
  },
};

export default nextConfig;
