import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'schema/**/schema.graphql',
  generates: {
    '../../apps/api/src/generated/schema.graphql': {
      plugins: ['schema-ast']
    },
    '../../apps/api/src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../context/ServerContext#ServerContext'
      }
    },
    '../../packages/app/generated/': {
      documents: ['../../packages/app/**/*.{ts,tsx}', '!**/node_modules/**'],
      preset: 'client',
      presetConfig: {
        persistedDocuments: true
      }
    }
  }
}

export default config
