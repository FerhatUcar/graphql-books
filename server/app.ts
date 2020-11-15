import express = require("express");
import { graphqlHTTP } from "express-graphql";
const schema = require("./schema/schema");
const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://ferhat_31:deliall50@gql-ferhat.wnp3x.mongodb.net/gql-ferhat?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect((err: Error) => {
  const collection = client.db("test").collection("devices");

  console.log("Connected to database");

  if (err) console.error(err.message);

  // perform actions on the collection object
  client.close();
});

const app = express();

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("Running on port 4000");
});
