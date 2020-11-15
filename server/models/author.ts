import { Schema, model } from "mongoose";

const authorSchema = new Schema({
  name: String,
  age: Number,
});

// create and export collection/model 'Author'
// with the authorSchema
module.exports = model("Author", authorSchema);
