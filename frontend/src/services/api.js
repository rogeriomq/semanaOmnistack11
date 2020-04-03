import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3333/graph'    
  })
})

export { apolloClient }

