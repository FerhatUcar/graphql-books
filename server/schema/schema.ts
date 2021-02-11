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
  GraphQLNonNull,
} = graphql;

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
      resolve() {
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
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
    deleteBook: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Book.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
