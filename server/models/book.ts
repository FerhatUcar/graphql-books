import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

// create and export collection/model 'Book'
// with the bookSchema
module.exports = model("Book", bookSchema);
