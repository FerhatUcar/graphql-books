import express = require("express");
import { graphqlHTTP } from "express-graphql";
import schema = require("./schema/schema");

const app = express();

// @ts-ignore
app.use("/graphql", graphqlHTTP({ schema }));

app.listen(4000, () => {
  console.log("Running on port 4000");
});
