import gql from 'graphql-tag';

export default gql`
  query getOwners{
    owners {
      name,
      gender,
      pets {
        name,
        type
      }
    }
  }
`;
