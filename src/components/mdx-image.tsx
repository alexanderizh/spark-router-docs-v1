import { withBasePath } from '@/lib/base-path';

/**
 * MDX Image component with automatic basePath handling
 * Uses native img tags for static export compatibility
 */
export function MDXImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, ...rest } = props;

  // Handle missing src
  if (!src || typeof src !== 'string') {
    return null;
  }

  // Only add basePath to local paths, not external URLs
  const processedSrc = withBasePath(src);

  // Always use native img tag for static export compatibility
  return <img src={processedSrc} {...rest} />;
}
