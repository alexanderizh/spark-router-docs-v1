import { createOpenAPI } from 'fumadocs-openapi/server';

// OpenAPI schema URLs
export const OPENAPI_URLS = {
  management:
    'https://raw.githubusercontent.com/QuantumNous/new-api/refs/heads/main/docs/openapi/api.json',
  aiModel:
    'https://raw.githubusercontent.com/QuantumNous/new-api/refs/heads/main/docs/openapi/relay.json',
};

export const openapi = createOpenAPI({
  input: Object.values(OPENAPI_URLS),
});
