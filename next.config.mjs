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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com https://connect.facebook.net https://admin.makkahtravel.co.uk https://images.dmca.com https://embed.tawk.to https://*.tawk.to;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://embed.tawk.to https://*.tawk.to;
              font-src 'self' https://fonts.gstatic.com data: https://embed.tawk.to https://*.tawk.to;
              img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com https://*.facebook.com https://admin.makkahtravel.co.uk https://images.dmca.com https://www.dmca.com https://*.tawk.to;
              connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://admin.makkahtravel.co.uk https://*.tawk.to wss://*.tawk.to https://api64.ipify.org;
              frame-src 'self' https://*.facebook.com https://admin.makkahtravel.co.uk https://*.tawk.to;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              upgrade-insecure-requests;
            `.replace(/\s{2,}/g, " ").trim(),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
