const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  type User {
    _id: ID
    name: String!
    email: String!
    age: Int!
    favoriteBooks: [Book]
  }

  type Book {
    _id: ID
    name: String!
    author: String!
    description: String
    category: CategoryEnum!
    pageCount: Int
    dateAddedToLibrary: String
  }

  enum CategoryEnum {
    ADVENTURE
    SCIFI
    FANTASY
    ROMANCE
    GOTHIC
    TRAVEL
    UNKNOWN
  }

  input AddBookInput {
    name: String!
    author: String!
    description: String
    category: CategoryEnum! = UNKOWN
    pageCount: Int
  }

  input AddUserInput {
    name: String!
    email: String!
    age: Int!
  }

  type Query {
    getBook(_id: ID!): Book
    getAllBooks: [Book]
    getUser(userId: ID!): User
  }

  type Mutation {
    addBook(book: AddBookInput!): Book!
    deleteBook(_id: ID!): Book
    createUser(userInput: AddUserInput!): User
    addFavoriteBook(userId: ID!, bookId: ID!): User!
  }
`;
