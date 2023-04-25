'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const booksSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  // spayNeuter: { type: Boolean, required: true },
});

const Books = mongoose.model('books', booksSchema);

module.exports = Books;
