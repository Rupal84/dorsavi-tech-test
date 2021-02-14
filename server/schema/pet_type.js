const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const Pet = new GraphQLObjectType({
  name:  'Pet',
  fields: () => ({
    name: { type: GraphQLString },
    type: { type: GraphQLString }  
  })
});

module.exports = Pet;
