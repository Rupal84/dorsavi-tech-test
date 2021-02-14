import React from 'react';
import query from '../queries/fetchOwnersAndPets';
import { useQuery } from '@apollo/client';

const PetList = (props) => {
    const {petName, city, petType} = props;
    const {loading, data} = useQuery(query, {
        variables: { petName, city, petType },
      }); 
    const extractList = ({owners}) => {
        const males = owners.filter((owner)=>owner.gender === 'Male');
        const females = owners.filter((owner)=>owner.gender === 'Female');
        const malesList = males.map((male) => {
            const {pets} = male
           return pets && pets.map((pet) => {
                return <li key={pet.name}>{pet.name} - {male.city}</li>
            })
        })
        const femalesList = females.map((female) => {
            const {pets} = female;
            return pets && pets.map((pet) => {
                 return <li key={pet.name}>{pet.name} - {female.city}</li>
             })
         })

         return (
             <div>
                 <h3>Male</h3>
                 <ul key='males'>
                     {malesList}
                 </ul>
                 <h3>Female</h3>
                 <ul key='females'>
                     {femalesList}
                 </ul>
             </div>
         )
    }
    if (loading) { return <div>Loading...</div>; }
    return (
        <div>
            {extractList(data)}
        </div>
    )
}

export default PetList;