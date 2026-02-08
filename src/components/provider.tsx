'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import { basePath } from '@/lib/metadata';

export function Provider({
  children,
  i18n,
}: {
  children: ReactNode;
  i18n: Parameters<typeof RootProvider>[0]['i18n'];
}) {
  return (
    <RootProvider
      i18n={i18n}
      search={{
        options: {
          // 带 basePath 的搜索 API，避免 404（Next 在 basePath 下挂载所有路由）
          api: `${basePath}/api/search`,
        },
      }}
    >
      {children}
    </RootProvider>
  );
}
