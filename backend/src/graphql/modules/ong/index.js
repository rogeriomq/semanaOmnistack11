import { gql } from 'apollo-server-express'
import crypto from 'crypto'
import connection from '../../../database/connection'

const typeDefs = gql`
  "Type representing the table ongs in database."
  type Ong {
    id: ID!
    name: String!
    email: String!
    "Fone number with DDD"
    whatsapp: String!
    city: String!
    "Two Chars, ex: TO"
    uf: String!
    "Resolver field incidents the Ong"
    incidents: [Incident]
  }

  extend type Query {
    # login: String
    ongs: [Ong]
    session(id: String!): Ong 
    # logout: String
    # addIncident: String
    # removeIncident: String
    # listIncidents: [Incident]
  }

  input OngInput {
    name: String!
    email: String!
    whatsapp: String!
    city: String!
    uf: String!
  }

  extend type Mutation {
    createOng(ongInput: OngInput): Ong!
    updateOng(
      id: String!
      name: String
      email: String
      whatsapp: String
      city: String
      uf: String
    ): Ong!
  }
`

const resolvers = {
  Ong: {
    incidents: async (ong) => {
      const incidents = await connection('incidents').where({
        ong_id: ong.id
      })
      return incidents
    }
  },
  Query: {
    ongs: async (parent, args, context, info) => {
      const ongs = await connection('ongs').select('*')
      return ongs
    },
    session: async (_, { id }) => {
      const ong = await connection('ongs').where({id}).first()
      return ong 
    }
  },
  Mutation: {
    createOng: async (parent, args, context, info) => {
      const { name, email, whatsapp, city, uf } = args.ongInput

      const ong = {
        id: crypto.randomBytes(4).toString('HEX'),
        name,
        email,
        whatsapp,
        city,
        uf
      }
      await connection('ongs').insert({
        ...ong
      })

      // console.log('Created: ', ongCreated)
      return ong
    }
  }
}

export default {
  typeDefs,
  resolvers
}
