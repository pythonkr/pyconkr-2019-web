import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { createUploadLink } from 'apollo-upload-client'
import 'cross-fetch/polyfill'
import intl from 'react-intl-universal'

// DefinePlugin으로 초기화한 변수를 Typescript에서
// 인식하게 하기 위해 declare 구문을 추가했습니다
// next.config.js를 참고해주세요
declare var API_SERVER: string

const uploadLink = createUploadLink({
  uri: API_SERVER,
  fetch
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
      // alert(message);
    })
  }
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : ''
    }
  }
})

const acceptLanguageLink = setContext((_, { headers }) => {
  const locale = intl.getInitOptions().currentLocale

  return {
    headers: {
      ...headers,
      'Accept-Language': locale
    }
  }
})

const link = ApolloLink.from([
  authLink,
  errorLink,
  // httpLink,
  acceptLanguageLink,
  uploadLink
])

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})
