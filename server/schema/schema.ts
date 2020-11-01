import graphql = require("graphql");
import * as _ from "lodash";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

const books = [
  { name: "Name of the wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The final empire", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The long earth", genre: "Sci-Fi", id: "3", authorId: "3" },
];

const authors = [
  { name: "Patrick Roth", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Dick", age: 66, id: "3" },
];

/**
 Schema were you define Object types to connect
 your objects within the whole schema to use it in the
 graphqlHTTP function
 */
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // get data from db or other sources
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
