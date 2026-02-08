import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

// Next.js 16 只允许 protocol, hostname, port, pathname, search，避免 searchParams 等非法键
const ALLOWED_REMOTE_PATTERN_KEYS = ['protocol', 'hostname', 'port', 'pathname', 'search'];
function sanitizeRemotePatterns(patterns) {
  if (!Array.isArray(patterns)) return patterns;
  return patterns.map((p) => {
    if (typeof p === 'object' && p !== null && !(p instanceof URL)) {
      const sanitized = {};
      for (const key of ALLOWED_REMOTE_PATTERN_KEYS) {
        if (key in p && p[key] !== undefined) sanitized[key] = p[key];
      }
      return sanitized;
    }
    return p;
  });
}

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: sanitizeRemotePatterns([
      {
        protocol: 'https',
        hostname: 'www.sparkrouter.to',
        pathname: '/cos/**',
      },
    ]),
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        // newapi.pro domains
        'docs.newapi.pro',
        'newapi.pro',
        'www.newapi.pro',
        // newapi.ai domains
        'docs.newapi.ai',
        'newapi.ai',
        'www.newapi.ai',
        // Vercel preview
        'new-api-docs-v1.vercel.app',
      ],
    },
  },
  async headers() {
    return [
      {
        // Apply charset to HTML pages
        source: '/:lang(en|zh|ja)/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/html; charset=utf-8',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:lang/docs/:path*.mdx',
        destination: '/:lang/llms.mdx/:path*',
      },
    ];
  },
};

const nextConfig = withMDX(config);

// 在 withMDX 合并后再次规范化 remotePatterns，避免出现 searchParams 等非法键
function withSanitizedImages(exportedConfig) {
  if (typeof exportedConfig === 'function') {
    return function (ctx) {
      const resolved = exportedConfig(ctx);
      if (resolved?.images?.remotePatterns) {
        resolved.images.remotePatterns = sanitizeRemotePatterns(resolved.images.remotePatterns);
      }
      return resolved;
    };
  }
  if (exportedConfig?.images?.remotePatterns) {
    exportedConfig.images.remotePatterns = sanitizeRemotePatterns(exportedConfig.images.remotePatterns);
  }
  return exportedConfig;
}

export default withSanitizedImages(nextConfig);
