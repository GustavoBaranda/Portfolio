/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router routes (/about, /projects, /contact) are real server routes.
  // Do NOT set `output: 'export'` unless you also configure hosting rewrites for SPA fallback.
  // Keep this unset for Vercel / Node so hard refresh and direct URL entry work on subpaths.
  trailingSlash: false,
  allowedDevOrigins: ["localhost:3000", "192.168.0.194:3000", "192.168.0.*:3000"],
};

export default nextConfig;
