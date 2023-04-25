'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Books = require('./models/books.js');


async function seed() {
  // name: {type: String, required: true},
  // color: {type: String, required: true},
  // spayNeuter: {type: Boolean, required: true},
  // location: {type: String, required: true}

  // *** await Model.create({...})
  const Cat = mongoose.model('cat', catSchema);

  await Books.create({
    title: 'randomBook',
    description: 'test book descript',
    status: "checkedout"
});
  console.log('Ronald was created');

  await Books.create({
    title: 'randomBook',
    description: 'test book descript',
    status: "checkedout"
});

  console.log('Karl was created');

  mongoose.disconnect();
}

seed();

// model.export = Cat;