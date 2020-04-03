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