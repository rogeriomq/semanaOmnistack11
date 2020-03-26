import { gql } from 'apollo-server-express'
import connection from '../../../database/connection'
const typeDefs = gql`
  type Incident {
    id: ID!
    title: String!
    description: String!
    value: Float!
    ong: Ong
  }

  extend type Query {
    incidents(page: Int, limit: Int): [Incident]
    countIncidents: Int!
  }

  input IncidentInput {
    title: String!
    description: String!
    value: Float!
    ong_id: String!
  }

  extend type Mutation {
    createIncident(incidentInput: IncidentInput): Incident
    deleteIncident(id: ID!, ong_id: String): Boolean
  }
`

const resolvers = {
  Incident: {
    ong: async ({ ong_id }) => {
      const ong = await connection('ongs')
        .select('*')
        .where({ id: ong_id })
        .first()
      // console.log('ong', ong)
      return ong
    }
  },
  Query: {
    incidents: async (_, { page, limit }) => {
      let query = connection('incidents')
      if (limit) query = query.limit(limit)
      if (page) query = query.offset((page - 1) * (limit || 0))

      const incidents = await query.select('*')
      return incidents
    },
    countIncidents: async () => {
      const [result] = await connection('incidents').count('id', {
        as: 'count'
      })
      return result.count
    }
  },
  Mutation: {
    createIncident: async (_, args) => {
      const { title, description, value, ong_id } = args.incidentInput
      console.log(args.incidentInput)
      const ong = await connection('ongs')
        .where({
          id: ong_id
        })
        .first()
      console.log('ong:', ong)
      const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id
      })

      // console.log(id)

      return {
        id,
        title,
        description,
        value,
        ong
      }
    },
    deleteIncident: async (_, args) => {
      const { id, ong_id } = args
      const result = await connection('incidents')
        .where({
          id,
          ong_id
        })
        .del()
      return new Boolean(result).valueOf()
    }
  }
}

export default {
  typeDefs,
  resolvers
}
