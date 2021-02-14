const axios = require('axios')
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLString } = graphql;
const OwnerType = require('./owner');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    owners: {
      type: new GraphQLList(OwnerType),
      args: { petName: { type: GraphQLString } },
      resolve(parentValue, {petName}) {
         return axios.get('https://dorsavicodechallenge.azurewebsites.net/Melbourne').then(({data})=> {
           if(petName) {
            return data.reduce((acc, owner) => {
              const petsFound = owner.pets ? owner.pets.filter(pet => pet.name === petName) : [];
              if(petsFound.length > 0) {
                acc.push({...owner, pets: petsFound})
              }
              return acc
            }, []);
           }
          return data
         });
      }
    }
  })
});

module.exports = RootQuery;
