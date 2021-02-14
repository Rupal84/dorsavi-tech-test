import React from 'react';
import query from '../queries/fetchOwnersAndPets';
import { useQuery, graphql } from '@apollo/client';

const PetList = () => {
    const {loading, data} = useQuery(query);    
    console.log('loading', loading, data);
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