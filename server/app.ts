import express = require("express");
import { graphqlHTTP } from "express-graphql";
const schema = require("./schema/schema");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// allow cross-origin requests
app.use(cors());

const uri =
  "mongodb+srv://ferhat_31:deliall50@gql-ferhat.wnp3x.mongodb.net/books-db?retryWrites=true&w=majority";

mongoose.connect(uri);
mongoose.connection.once("open", () => console.log("Connected to database"));

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));
app.listen(4000, () => console.log("Running on port 4000"));
