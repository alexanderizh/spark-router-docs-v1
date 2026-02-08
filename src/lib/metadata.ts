import type { Metadata } from 'next';

/** 二级目录部署时的路径前缀，需与 next.config basePath 保持一致 */
export const basePath =
  (process.env.NEXT_PUBLIC_BASE_PATH as string | undefined) || '/doc';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    icons: {
      icon: 'https://www.sparkrouter.to/cos/icon.png',
      shortcut: 'https://www.sparkrouter.to/cos/icon.png',
      apple: 'https://www.sparkrouter.to/cos/icon.png',
    },
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: 'https://www.sparkrouter.to',
      images: 'https://www.sparkrouter.to/cos/icon.png',
      siteName: 'Spark Router',
      type: 'website',
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: 'https://www.sparkrouter.to/cos/icon.png',
      ...override.twitter,
    },
  };
}

const origin =
  process.env.NODE_ENV === 'development' ||
  !process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? 'http://localhost:3000'
    : `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

export const baseUrl = new URL(
  basePath.endsWith('/') ? basePath : `${basePath}/`,
  origin
);
