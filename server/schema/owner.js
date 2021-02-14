const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString
} = graphql;

const Owner = new GraphQLObjectType({
  name:  'Owner',
  fields: () => ({
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    age: { type: GraphQLInt },
    city: {type: GraphQLString},
    pets: {
      type: new GraphQLList(require('./pet_type'))
    }
  })
});

module.exports = Owner;
