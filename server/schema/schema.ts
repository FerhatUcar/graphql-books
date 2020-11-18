import graphql = require("graphql");

const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// const books = [
//   { name: "Name of the wind", genre: "Fantasy", id: "1", authorId: "1" },
//   { name: "The final empire", genre: "Fantasy", id: "2", authorId: "2" },
//   { name: "The long earth", genre: "Sci-Fi", id: "3", authorId: "3" },
//   { name: "The hero of ages", genre: "Fantasy", id: "4", authorId: "2" },
//   { name: "The color of magic", genre: "Fantasy", id: "5", authorId: "3" },
//   { name: "The light fantastic", genre: "Fantasy", id: "6", authorId: "3" },
// ];
//
// const authors = [
//   { name: "Patrick Roth", age: 44, id: "1" },
//   { name: "Brandon Sanderson", age: 42, id: "2" },
//   { name: "Terry Dick", age: 66, id: "3" },
// ];

/**
 Schema were you define Object types to connect
 your objects within the whole schema to use it in the
 graphqlHTTP function
 */
const BookType: any = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,

      // looking into the authors array to check if the
      // parent.authorId matches the ID
      resolve(parent, args) {
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType: any = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),

      // looking into the books array to check if the
      // parent.id matches the authorId
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },

      // find the ID of the book
      resolve(parent, args) {
        // get data from db or other sources
        // looking into the books collection and check
        // if the args.id matches the book ID
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },

      // find the ID of the author
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
