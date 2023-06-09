'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// *** BRING IN MONGOOSE ***
const mongoose = require('mongoose');

// **** BRING IN MODEL TO SERVER FOR ENDPOINTS ****
const Books = require('./models/books.js');

const app = express();

// middleware
app.use(cors());

//TODO: ADD MIDDLEWARE - BODYPARSER LAB12
app.use(express.json());


// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));



// *** CONNECT MONGOOSE TO MONGODB AND BRING IT INTO MY SERVER ***
mongoose.connect("mongodb+srv://corianacory:CAnnetteW1!@cluster0.vwjyeci.mongodb.net/?retryWrites=true&w=majority");

// *** HELPFUL FOR YOU TO TROUBLESHOOT IN YOUR TERMINAL AS TO WHY YOU CAN'T CONNECT TO MONGODB ***
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// ENDPOINTS
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

// *** ENDPOINT THAT WILL RETRIEVE ALL BOOKS FROM THE DB ****

app.get('/books', async (request, response, next) => {
  try {
    // TODO: GET ALL BOOKS FROM DB AND SEND IT ON THE RESPONSE
    let allBooks = await Books.find({}); //Model.find({}) -> return all documents from the DB

    response.status(200).send(allBooks);
  } catch (error) {
    next(error);
  }
});

//THIS IS MY ENDPOINT TO ADD BOOKS TO BD LAB12
app.post('/books', postBooks);

async function postBooks(request, response, next){
  // console.log(request.body);
  try {
    //TODO LAB 12: TAKE IN DATA THAT COMES IN ON REQUEST 
    let booksData = request.body; 

    //TODO LAB 12: HAVE MY MODEL CREAT NEW INSTANCE OF BOOKS TO MY DATABASE
    let createdBooks = await Books.create(booksData); 

    //TODO: SEND THAT ON THE RESPONSE 
    response.status(200).send(createdBooks);
   } catch (error) {
      next(error);
  }
}

//ENDPOINT TO DELETE A BOOK LAB 12
app.delete('/books/:booksID', deleteBooks);

async function deleteBooks (request, response, next) {
  // console.log(request.params)

  try {

    let id = request.params.booksID

    await Books.findByIdAndDelete(id);

    response.status(200).send('Book deleted!')
  } catch (error) {
    next (error);
  }
  }

  //TODO: ENDPOINT TO UPDATE BOOKS LAB 13

  app.put('/booksID/:booksID', updateBooks);

  async function updateBooks(request, response, next) {
    try {
// TODO: GRAB THE ID FROM THE REQUEST.PARAMS & DATA FROM REQUEST.BODY LAB 13
let id = request.params.booksID;
let booksData = request.body;

//TODO: USE MODEL METHOD OF FINDBYIDANDUPDATE AND PASS TO ID, DATA, OPTIONS OBJECT LAB 13 
//NEED 3 ARGUEMENT (ID, DATA, OPTIONS OBJECTS -> {new: true, overwrite: true})
let updatedBooks = await Books.findByIdAndUpdate(id, booksData, {new: true, overwrite: true});

//TODO: SEND ON RESPONCE, THE UDATED BOOKS LAB 13
  response.status(200).send(updatedBooks);

    } catch (error) {
      next(error)
    }
  }

app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

// ERROR
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
