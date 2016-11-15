let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:6565/lesson10';

const Contact = require('./contact');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

// middleware to use for all requests
app.use((req, res, next) => {
	console.log(req.url);
	next();
});

let db;
MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err);

  console.log(`The successful connection to the MongoDB server: ${url}`)
  db = database;
  app.listen(port, () => {
    console.log(`Listening Express MongoDB Contacts App, port: ${port}`);
  });
})

app.get('/', (req, res) => {
    res.redirect('/contacts');
});

// CRUD

// Create
app.post('/contacts', (req, res) => {
  let contact = new Contact(req.body);
  db.collection('contacts').insert(contact, (err, result) => {
    if (err) return console.log(err);
    console.log(`contacts saved to database`);
    res.redirect('/contacts');
  })
});

// Read
app.get('/contacts', (req, res) => {
  let contact = new Contact(req.query);
  db.collection('contacts').find(contact.toSearch()).toArray((err, result) => {
    if (err) return console.log(err);
    res.render('contacts.ejs', {contacts: result});
  })});

// Update
app.put('/contacts', (req, res) => {
  db.collection('contacts').findOneAndUpdate({_id: new mongodb.ObjectID(req.body.contact_id)}, {
    $set: new Contact(req.body.contact)
  }, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  })
})

// Delete
app.delete('/contacts', (req, res) => {
  db.collection('contacts').findOneAndDelete({_id: new mongodb.ObjectID(req.body.contact_id)}, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  })    
})