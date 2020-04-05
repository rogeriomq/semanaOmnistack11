import { gql } from '@apollo/client';

export const QuerySession = result => {
  return gql`
    query Session($id: String!) {
      session(id: $id) {
        ${result}
      }
    }
  `;
};

export const MutationCreateIncident = result => gql`
  mutation CreateIncident($incidentInput: IncidentInput!) {
    createIncident(incidentInput: $incidentInput) {
     ${result}
    }
  }
`

export const MutationDeleteIncident = () => gql`
  mutation DeleteIncident($id: ID!, $ong_id: String!) {
    deleteIncident(id: $id, ong_id: $ong_id)
  }
`