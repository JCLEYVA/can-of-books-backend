'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const booksSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  location: { type: String, required: true },
  spayNeuter: { type: Boolean, required: true },
});

const Books = mongoose.model('books', booksSchema);

module.exports = Books;