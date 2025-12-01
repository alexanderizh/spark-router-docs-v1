import { createOpenAPI } from 'fumadocs-openapi/server';

// OpenAPI schema URLs
export const OPENAPI_URLS = {
  management:
    'https://raw.githubusercontent.com/QuantumNous/new-api/refs/heads/main/docs/openapi/api.json',
  aiModel:
    'https://raw.githubusercontent.com/QuantumNous/new-api/refs/heads/main/docs/openapi/relay.json',
};

// Default server configuration to avoid hydration mismatch
const DEFAULT_SERVERS = [
  {
    url: '{baseUrl}',
    description: 'API Server',
    variables: {
      baseUrl: {
        default: 'https://api.example.com',
        description: 'The base URL of the API server',
      },
    },
  },
];

export const openapi = createOpenAPI({
  // 设置代理 URL，解决 CORS 问题
  proxyUrl: '/api/proxy',
  // Use a function to inject servers into OpenAPI specs
  async input() {
    const schemas: Record<string, unknown> = {};

    for (const [key, url] of Object.entries(OPENAPI_URLS)) {
      const response = await fetch(url);
      const schema = (await response.json()) as Record<string, unknown>;

      // Inject servers if empty or undefined
      if (
        !schema.servers ||
        (Array.isArray(schema.servers) && schema.servers.length === 0)
      ) {
        schema.servers = DEFAULT_SERVERS;
      }

      schemas[url] = schema;
    }

    return schemas;
  },
});
