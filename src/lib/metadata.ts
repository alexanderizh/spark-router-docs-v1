import type { Metadata } from 'next';

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

export const baseUrl =
  process.env.NODE_ENV === 'development' ||
  !process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
