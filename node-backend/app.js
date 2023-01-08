var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require('bcrypt-nodejs');
var cors = require('cors');

// ##### IMPORTANT
// ### Your backend project has to switch the MongoDB port like this
// ### Thus copy paste this block to your project
/* const MONGODB_PORT = process.env.DBPORT || '27017';
const db = require('monk')(`127.0.0.1:${MONGODB_PORT}/omm-2223`); // connect to database omm-2021
console.log(`Connected to MongoDB at port ${MONGODB_PORT}`)
// ######
console.log(db);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const e = require('express');

var app = express(); */

/* ------------ Lukas Test -------------- */

// mongoDB Test
// app.js (or index.js)
//const express = require('express')
const app = express()
const port = 3002

app.listen(port, () => console.log('Example app listening on port ' + port))

// Setup  MongoDB:
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

const dbName = 'memeGeneratorDB';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect()

// async function main() {
//   /* // Setup  MongoDB:
//   const MongoClient = require('mongodb').MongoClient;
//   const assert = require('assert');
//   const url = 'mongodb://localhost:27017';

//   const dbName = 'memeGeneratorDB';
//   const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true }); */

//   try {
//     await client.connect(); // gets back a promise, it waits for it bc of the await keyword
//     /* await createUser(client,
//       {
//         "name": "testUserCreatedbyMethod",
//         "email": "testUserCreatedbyMethod",
//         "password": "testUserCreatedbyMethod"
//       }); */

//     // await findOneUserByEmail(client,"john@test.de");

//     // await updateOneUserByEmail(client,"john@test.de", {entries: 6});

//     //  await deleteOneUserByEmail(client, "testUserCreatedbyMethod")
//   } catch (error) {
//     console.error(error);
//   } finally { // finally: regardles of the outcome it executes and closes the connection
//     await client.close();
//   }
// }

// main().catch(console.error);

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// create User Document in DB
async function createUser(client, newUser) {
  const result = await client.db("memeGeneratorDB").collection("users").insertOne(newUser);
  console.log(`New User created with the ID ${result.insertedID}`);

  return result;
}

// get a specific User by email in DB
async function findOneUserByEmail(client, email) {
  const result = await client.db("memeGeneratorDB").collection("users").findOne({ 'email': email });

  if (result) {
    console.log(`found a user in the collection with the email ${email}`);
    console.log(result);
  } else {
    console.log(`No user found with the email ${email}`);
  } return result;
}

// update a specific User by email in DB
async function updateOneUserByEmail(client, email, updatedUser) {
  const result = await client.db("memeGeneratorDB").collection("users").updateOne({ email: email }, { $set: updatedUser });

  console.log(`${result.matchedCount} documents matched the query criteria`);
  console.log(`${result.modifiedCount} documents were updated`);
  return result;
}

// upsert a specific User by email in DB -> If the user exists update the attribute, otherwise create a new user
async function upsertOneUserByEmail(client, email, updatedUser) {
  const result = await client.db("memeGeneratorDB").collection("users").updateOne({ email: email }, { $set: updatedUser }, { upsert: true });

  console.log(`${result.matchedCount} documents matched the query criteria`);
  console.log(`${result.modifiedCount} documents were updated`);
  return result;
}


async function deleteOneUserByEmail(client, email) {
  const result = await client.db("memeGeneratorDB").collection("users").deleteOne({ email: email });
  console.log(`${result.deletedCount} documents got deleted`);
  return result;
}


app.use(express.json());
app.use(cors());

/* Endpoints: 
  /register  ---> Post --> Return: User 
  /signin route --> Post --> Return:  succes /fail
  /profile/:id --> GET --> Return User
  /image ---> PUT --> Change Counter, Returns Entries Number 
  / --> GET --> Return ALL User
*/

// register new user -> ID still hard coded
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  newUser = {
    "name": name,
    "email": email,
    "password": password,
    "entries": 0,
    "pwHash": "",
    "userCreated": new Date()
  }
  createUser(client, newUser);
  res.json("Success: New User created")
})

// login, check (only!) the first user within fake database on the top 
app.post('/signin', (req, res) => {
  
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("Error logging in");
  }
})

// get all users out of database - REMOVE LATER
app.get('/', async (req, res) => {
  //res.send(database.users);
  const result = await findOneUserByEmail(client, "john@test.de")
  console.log(result);
  res.json(result);
})

// get the individual profil with defined IDs
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if (!found) {
    res.status(400).json("not found");
  }
})

// add a image to the profile and increase the image entries
app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  })
  if (!found) {
    res.status(400).json("not found");
  }
})

/* ------------ Lukas Test Ende -------------- */


// ????????? is the following part required ??????????
/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
  req.db = db;
  next();
});


// the login middleware. Requires BasicAuth authentication
app.use((req, res, next) => {
  const users = db.get('users');
  users.findOne({ basicauthtoken: req.headers.authorization }).then(user => {
    if (user) {
      req.username = user.username;  // test test => Basic dGVzdDp0ZXN0
      next()
    }
    else {
      res.set('WWW-Authenticate', 'Basic realm="401"')
      res.status(401).send()
    }
  }).catch(e => {
    console.error(e)
    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send()
  })
})



app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;

