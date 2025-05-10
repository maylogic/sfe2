import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: process.env.GRAPHQL_URL ?? 'http://localhost/graphql',
    documents: ['./graphql/**/*.graphql'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './gql/': {
            preset: 'client',
            config: {
                withCompositionFunctions: true,
                useTypeImports: true,
            },
        },
    },
}

export default config
