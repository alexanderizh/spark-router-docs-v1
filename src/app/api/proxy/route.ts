import { openapi } from '@/lib/openapi';

export const { GET, HEAD, PUT, POST, PATCH, DELETE } = openapi.createProxy({
  // 不限制目标域名，允许用户测试任意 API 地址
  // 注意：这意味着代理会转发请求到任何用户指定的地址
});
