import graphql = require("graphql");
import * as _ from "lodash";

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const book = [
  { name: "Name of the wind", genre: "Fantasy", id: "1" },
  { name: "The final empire", genre: "Fantasy", id: "2" },
  { name: "The long earth", genre: "Sci-Fi", id: "3" },
];

/**
 Schema were you define Object types to connect
 your objects within the whole schema to use it in the
 graphqlHTTP function
 */
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // get data from db or other sources
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
