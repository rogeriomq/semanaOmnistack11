import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import modules from './graphql/modules'
import routes from './other-routes'

const context = (request, response) => {
  return {
    request,
    response
  }
}

const apollo = new ApolloServer({
  context,
  modules,
  tracing: false
})

const app = express()

apollo.applyMiddleware({ app, path: '/graph' })

app.use(routes)

app.listen({ port: 3333 }, () => {
  console.log(
    `🚀 Server ready at http://localhost:3333${apollo.graphqlPath} to GraphQL API`
  )
})
