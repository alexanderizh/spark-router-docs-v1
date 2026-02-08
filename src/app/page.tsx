import { redirect } from 'next/navigation';

/**
 * Fallback redirect for `/`.
 * 初次进入时跳转到中文 API 接口文档页面。
 */
export default function RootPage() {
  redirect('/zh/docs/api');
}
