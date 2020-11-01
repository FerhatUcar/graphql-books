import express = require("express");
import { graphqlHTTP } from "express-graphql";
const schema = require("./schema/schema");

const app = express();

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("Running on port 4000");
});
