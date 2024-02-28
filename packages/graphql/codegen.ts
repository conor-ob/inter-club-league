import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '**/schema.graphql',
  generates: {
    'schema.graphql': {
      plugins: ['schema-ast']
    },
    '../../apps/api/src/generated/schema.graphql': {
      plugins: ['schema-ast']
    },
    '../../apps/api/src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../context/ServerContext#ServerContext'
      }
    }
  }
};

export default config;
