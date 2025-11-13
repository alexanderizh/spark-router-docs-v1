/**
 * Asset path helper for MDX files
 * This is a simplified version that can be used directly in MDX
 */

// Get the base path at build time
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * Get the full path for an asset
 * @param path - Asset path starting with /
 */
export function assetPath(path: string): string {
  if (!path || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return BASE_PATH ? `${BASE_PATH}${normalizedPath}` : normalizedPath;
}

// Export as default for easier import in MDX
export default assetPath;
