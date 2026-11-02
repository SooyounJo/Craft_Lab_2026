/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Export the public Site while preserving local Next.js server workflows.
  ...(process.env.CRAFTLAB_STATIC_EXPORT === "1" ? { output: "export", trailingSlash: true } : {}),
};

export default nextConfig;
