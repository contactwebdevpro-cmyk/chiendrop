/** @type {import('next').NextConfig} */
const nextConfig = { images: { formats: ["image/avif", "image/webp"] }, poweredByHeader: false,
  async headers() {
    return [{ source: "/", headers: [{ key: "Link", value: '</sitemap.xml>; rel="sitemap", </llms.txt>; rel="describedby"' }] }];
  },
};
export default nextConfig;
