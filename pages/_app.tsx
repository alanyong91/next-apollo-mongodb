import '../styles/globals.css'

// import dotenv from 'dotenv'
// import dotenvExpand from 'dotenv-expand'

import type { AppProps } from 'next/app'

import { ApolloProvider } from '@apollo/react-hooks';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'

// dotenvExpand(dotenv.config())

function App({ Component, pageProps }: AppProps) {
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
export default App
