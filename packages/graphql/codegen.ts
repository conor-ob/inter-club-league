import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    '**/schema.graphql',
    {
      'https://orchestrator.pgatour.com/graphql': {
        headers: {
          'X-Api-Key': 'da2-gsrx5bibzbb4njvhl7t37wqyl4'
        }
      }
    }
  ],
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
