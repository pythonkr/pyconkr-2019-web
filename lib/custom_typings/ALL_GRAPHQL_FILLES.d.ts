/* eslint-disable */
declare module '*.graphql' {
    import { DocumentNode } from 'apollo-boost'
    const queryDoc: DocumentNode
    export = queryDoc
}
  
declare module '*.gql' {
    import { DocumentNode } from 'apollo-boost'
    const queryDoc: DocumentNode
    export = queryDoc
}
  