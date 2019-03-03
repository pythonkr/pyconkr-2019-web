
import {
  ApolloClient,
} from 'apollo-client'
import { ModifiableWatchQueryOptions } from 'apollo-client/core/watchQueryOptions'

export type QueryDefinitionType<
  QueryResult,
  QueryVars,
> = {
  _type: '__QUERY_DEFINITION_TYPE';
  resultTYPEHOLDER: QueryResult;
  varsTYPEHOLDER: QueryVars;
  query: any;
}
export function createQueryDefinition<QueryResult, QueryVars> (
  query: any,
): QueryDefinitionType<QueryResult, QueryVars> {
  return {
    _type: '__QUERY_DEFINITION_TYPE',
    resultTYPEHOLDER: undefined as any,
    varsTYPEHOLDER: undefined as any,
    query,
  }
}

export function sendQuery<
  QueryResult,
  QueryVars,
> (
  queryDefinition: QueryDefinitionType<QueryResult, QueryVars>
) {
  return (apolloClient: ApolloClient<any>) => {
    return (variables: QueryVars) =>
      apolloClient.query<QueryResult, QueryVars>({
        query: queryDefinition.query,
        variables,
      })
  }
}

export function watchQuery<
  QueryResult,
  QueryVars,
> (
  queryDefinition: QueryDefinitionType<QueryResult, QueryVars>,
) {
  return (apolloClient: ApolloClient<any>) => {
    return (
      variables: QueryVars,
      watchOptions?: ModifiableWatchQueryOptions<QueryVars>,
    ) =>
      apolloClient.watchQuery<QueryResult, QueryVars>({
        ...watchOptions,
        query: queryDefinition.query,
        variables,
      })
  }
}
