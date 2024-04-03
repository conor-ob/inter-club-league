import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'schema/**/schema.graphql',
  generates: {
    '../../apps/server/src/generated/schema.graphql': {
      plugins: ['schema-ast']
    },
    '../../apps/server/src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../context/ServerContext#ServerContext'
      }
    },
    '../app/generated/': {
      documents: ['../app/**/*.{ts,tsx}', '!**/node_modules/**'],
      preset: 'client',
      presetConfig: {
        persistedDocuments: true
      }
    }
  }
}

export default config
