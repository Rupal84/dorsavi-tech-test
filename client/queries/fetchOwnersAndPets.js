import gql from 'graphql-tag';

export default gql`
  query getPetOwners($petName: String, $city: String, $petType: String) {
    owners (petName: $petName, city: $city, petType: $petType){
      name,
      gender,
      pets {
        name,
        type
      },
      city
    }
  }
`;
