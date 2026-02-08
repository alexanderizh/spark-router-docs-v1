import { redirect } from 'next/navigation';
import { basePath } from '@/lib/metadata';

/**
 * Fallback redirect for `/`.
 * 初次进入时跳转到中文 API 接口文档页面。
 */
export default function RootPage() {
  redirect(`${basePath}/zh/docs/api`);
}
