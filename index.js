const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// models and types
const Book = require("./Models/Book");
const User = require("./Models/User");

// database connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

// graphQL server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    Book,
    User
  }
});
// graphQL middleware
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;

// start the express server
// add ${server.graphqlPath} after PORT
app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}${server.graphqlPath}`)
);
