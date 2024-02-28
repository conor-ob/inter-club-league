import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '**/schema.graphql',
  generates: {
    'schema.graphql': {
      plugins: ['schema-ast']
    },
    'src/graphql-types.d.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      // config: {
      //   contextType: '../context/ServerContext#ServerContext'
      // }
    }
  }
}

export default config
