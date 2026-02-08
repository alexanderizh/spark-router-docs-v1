import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { NextRequest, NextResponse } from 'next/server';
import type { NextFetchEvent } from 'next/server';
import { i18n } from '@/lib/i18n';

const basePath =
  (process.env.NEXT_PUBLIC_BASE_PATH as string | undefined) || '/doc';

/**
 * 去掉 pathname 的 basePath 前缀，得到“应用内路径”。
 * 例如 basePath='/doc' 时：/doc -> '/'，/doc/zh/docs -> '/zh/docs'
 */
function pathWithoutBase(pathname: string): string {
  if (!basePath) return pathname || '/';
  if (pathname === basePath || pathname === basePath + '/') return '/';
  if (pathname.startsWith(basePath + '/')) return pathname.slice(basePath.length);
  return pathname;
}

/**
 * 把“应用内路径”拼成带 basePath 的完整 pathname。
 */
function withBasePath(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (!basePath) return p;
  const base = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  return p === '/' ? base : `${base}${p}`;
}

/** 根路径（初次进入）希望跳转到中文 API 文档 */
const ROOT_REDIRECT_PATH = '/zh/docs/api';

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  const pathname = request.nextUrl.pathname;
  const path = pathWithoutBase(pathname);

  // 根路径：统一重定向到 /zh/docs/api（与 app/page.tsx 行为一致）
  if (path === '' || path === '/') {
    return NextResponse.redirect(new URL(withBasePath(ROOT_REDIRECT_PATH), request.url));
  }

  // 应用内路径已带语言前缀则直接放行（使用原始 request，保证 basePath 正确）
  const pathLocale = i18n.languages.find(
    (locale) => path.startsWith(`/${locale}/`) || path === `/${locale}`
  );
  if (pathLocale) {
    return NextResponse.next();
  }

  // 无语言前缀：用 fumadocs 的 format 生成带 basePath 的重定向地址
  const i18nHandler = createI18nMiddleware({
    ...i18n,
    format: (locale: string, p: string) =>
      withBasePath(`/${locale}${p === '/' ? '' : p}`),
  });

  // 仅在此分支会重定向，传入“应用内路径”让 fumadocs 正确识别并只做一次 redirect
  const url = request.nextUrl.clone();
  url.pathname = path;
  const reqWithPath = new NextRequest(url, request);
  return i18nHandler(reqWithPath, event);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets/|robots\\.txt|sitemap\\.xml|llms?\\.txt|llm-full\\.txt|llms-full\\.txt).*)',
  ],
};
