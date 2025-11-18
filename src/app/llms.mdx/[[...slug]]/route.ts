import { getLLMText, source } from '@/lib/source';
import { notFound } from 'next/navigation';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params;

  // Try to find the page in any locale
  // For i18n projects, the URL might not include locale prefix
  const allPages = source.getPages();
  const page = allPages.find((p) => {
    const pageSlugs = p.slugs.join('/');
    const requestSlugs = slug?.join('/') || '';
    return pageSlugs === requestSlugs;
  });

  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}

export function generateStaticParams() {
  return source.generateParams();
}
