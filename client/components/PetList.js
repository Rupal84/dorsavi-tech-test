import React from 'react';
import query from '../queries/fetchOwnersAndPets';
import { useQuery, graphql } from '@apollo/client';

const PetList = (props) => {
    const {loading, data} = useQuery(query, {
        variables: { petName, city, petType },
      }); 
    const extractList = ({owners}) => {
        return owners.map(({pets}) => {
           return pets && pets.map((pet) => {
                return <li>{pet.name}</li>
            })
        })
    }
    if (loading) { return <div>Loading...</div>; }
    return (
       
        <ul>
            {extractList(data)}
        </ul>
    )
}

export default PetList;