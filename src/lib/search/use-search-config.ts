import { useMemo } from 'react';

interface UseSearchConfigOptions {
  locale?: string;
  api?: string;
}

export function useSearchConfig(options: UseSearchConfigOptions) {
  const { locale, api = '/api/search' } = options;

  return useMemo(
    () => ({
      type: 'fetch' as const,
      locale,
      api,
    }),
    [locale, api]
  );
}
