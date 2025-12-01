import { generateFiles } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';
import { OPENAPI_URLS } from '../src/lib/openapi';

const apis = [
  {
    name: 'AI Model API',
    input: OPENAPI_URLS.aiModel,
    output: './content/docs/zh/api/ai-model',
  },
  {
    name: 'Management API',
    input: OPENAPI_URLS.management,
    output: './content/docs/zh/api/management',
  },
];

async function generate() {
  for (const api of apis) {
    await generateFiles({
      input: createOpenAPI({ input: [api.input] }),
      output: api.output,
      per: 'operation',
      groupBy: 'tag',
      includeDescription: true,
      addGeneratedComment: true,
    });
    console.log(`✅ ${api.name} docs generated!`);
  }
}

generate()
  .then(() => console.log('✅ All done!'))
  .catch((err) => {
    console.error('❌ Failed:', err);
    process.exit(1);
  });
