const axios = require('axios')
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLString } = graphql;
const OwnerType = require('./owner');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    owners: {
      type: new GraphQLList(OwnerType),
      args: { petName: { type: GraphQLString }, city: { type: GraphQLString }, petType: { type: GraphQLString } },
      resolve(parentValue, { petName, city, petType }) {
        if (city === 'melbourne') {
          return axios.get('https://dorsavicodechallenge.azurewebsites.net/Melbourne').then(({ data }) => {
            return filterPets({'Melbourne': data}, petType, petName);
          });
        } else if(city === 'sydney') {
          return axios.get('https://dorsavicodechallenge.azurewebsites.net/Sydney').then(({ data }) => {
            return filterPets({'Sydney': data}, petType, petName)
          });
        } else {
          const apiCallMel =  axios.get('https://dorsavicodechallenge.azurewebsites.net/Melbourne');
          const apiCallSyd =  axios.get('https://dorsavicodechallenge.azurewebsites.net/Sydney');
          return axios.all([apiCallMel, apiCallSyd]).then(axios.spread((...responses) => {
            const responseMel = responses[0].data
            const responseSyd = responses[1].data
            return filterPets({'Melbourne': responseMel, 'Sydney': responseSyd}, petType, petName);
          })).catch(errors => {
            // react on errors.
          })
        }        
      }
    }
  })
});

const filterPets = (data, petType, petName) => {
  const res = []
  Object.entries(data).forEach(([key, value]) => {
    const filteredList = value.reduce((acc, ele)=> {
      const pets = ele.pets || [];
      const petsFound = pets && pets.filter((pet)=> {
        if(petType && petName) {
          return pet.name === petName && pet.type === petType
        } else if(petType) {
          return pet.type === petType
        } else if(petName) {
          return pet.name === petName
        } else {
          return true
        }      
      })
      if (petsFound.length > 0) {
        acc.push({ ...ele, pets: petsFound, city: key })
      }
      return acc
    }, [])
    res.push(...filteredList);
  })
  return res
}

module.exports = RootQuery;
