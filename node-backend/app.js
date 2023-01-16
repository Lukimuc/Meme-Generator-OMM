var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require('bcrypt-nodejs');
var cors = require('cors');
var Grid = require('gridfs-stream');

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

const app = express()
const port = 3002

app.listen(port, () => console.log('Example app listening on port ' + port))

// Setup  MongoDB:
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const url = 'mongodb://localhost:27017';

const dbName = 'memeGeneratorDB';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect().then(() => {
  console.log("Connected successfully to server");


});

// Setup Filestream (we use this to upload a Image to the DB)



// create User Document in DB
async function createUser(client, newUser) {
  const result = await client.db("memeGeneratorDB").collection("users").insertOne(newUser);
  console.log(`New User created with the ID ${result.insertedID}`);

  return result;
}

// create Meme Document in DB
async function createMeme(client, newMeme) {
  const result = await client.db("memeGeneratorDB").collection("memes").insertOne(newMeme);
  console.log(`New Meme created with the ID ${result.insertedID}`);

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

// get a specific User by ID in DB
async function findOneUserByID(client, id) {
  const result = await client.db("memeGeneratorDB").collection("users").findOne({ _id: new ObjectID(id) });

  if (result) {
    console.log(`found a user in the collection with the id ${id}`);
    //console.log(result);
    return result;
  } else {
    console.log(`No user found with the id ${id}`);
    return result;
  }
}

// update a specific User by email in DB
async function updateOneUserByEmail(client, email, updatedUser) {
  const result = await client.db("memeGeneratorDB").collection("users").updateOne({ email: email }, { $set: updatedUser });

  console.log(`${result.matchedCount} documents matched the query criteria`);
  console.log(`${result.modifiedCount} documents were updated`);
  return result;
}

// update a specific user by ID
async function updateOneUserByID(client, id, updatedUser) {
  const result = await client.db("memeGeneratorDB").collection("users").updateOne({ _id: new ObjectID(id) }, { $set: updatedUser });

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

/* Endpoints: 
  /register  ---> Post --> Return: User 
  /signin route --> Post --> Return:  succes /fail
  /profile/:id --> GET --> Return User
  /image ---> PUT --> Change Counter, Returns Entries Number 
  / --> GET --> Return ALL User
*/
app.use(express.json());
app.use(cors());

// REGISTER new user
app.post('/register', (req, res) => {
  const { email, firstname, lastname, password } = req.body; // get input from frontend 
  const hash = bcrypt.hashSync(password);

  newUser = {
    "firstname": firstname,
    "lastname": lastname,
    "email": email,
    "password": hash,
    "entries": 0,
    "userCreated": new Date()
  }
  createUser(client, newUser);
  res.json(newUser);
})

// register by google
app.post('/registerGoogle', (req, res) => {
  const { email, firstname, lastname } = req.body; // get input from frontend 


  newUser = {
    "firstname": firstname,
    "lastname": lastname,
    "email": email,
    "password": "",
    "entries": 0,
    "userCreated": new Date()
  }
  createUser(client, newUser);
  res.json(newUser);
})

// LOGIN a existing User via Form
app.post('/signin', async (req, res) => {
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;

  try {
    const user = await findOneUserByEmail(client, inputEmail);
    if (user != null) {
      const isValid = bcrypt.compareSync(inputPassword, user.password); // generate hash password with bcrypth
      if (isValid) { // if pw matches
        res.json(user); // send user to frontend
      } else { res.status(400).json("Wrong Credentials"); }
    } else { res.status(400).json("Please fill in both the email field as well as the password"); }
  } catch (error) { console.log("app.post/signin error: " + error); }
})

app.post('/signinGoogle', async (req, res) => {
  const inputEmail = req.body.email;
  try {
    const user = await findOneUserByEmail(client, inputEmail);

    if (user != null) {
      res.json(user); // send user to frontend
    } else { res.status(400).json("Somethings wrong with Google Login"); }
  } catch (error) { console.log("app.post/signin error: " + error); }
})

// get all users out of database - REMOVE LATER
app.get('/', (req, res) => {
  res.json("Empty Route app.get/");
})

// get the individual profile with defined IDs
app.get('/profile/:id', async (req, res) => {
  const { id } = req.body;  // get which id should be used for profile

  try {
    const user = await findOneUserByID(client, id); // get's back a User as Object 
    // do something with the user ...
    console.log("result " + Object.entries(user));
    console.log("email:" + user.email);

    res.json(user); // server response to frontend

  } catch (error) {
    console.log("Error in app.get('profile/id': " + error);
    res.status(400).json("Error in app.get('profile/id': " + error);
  }
})

/* // add a image to the profile and increase the image entries
app.put('/image', async (req, res) => {
  const { id } = req.body;
  const user = await findOneUserByID(client, id);

  updateOneUserByID(client, id, { entries: user.entries + 1 })
  res.json(user.entries + 1);
}) */

// create Meme
app.post(("/meme"), async (req, res) => {
  const {email } = req.body; // TODO get input from frontend 
  user = await findOneUserByEmail(client, email);
  

  newMeme = {
    "title": "test",
    "image_encoded": "test",
    "status": "public",
    "likes": 0,
    "memeCreated": new Date(),
    "CreatorID": user._id,
    "CreatorMail": user.email,
  }
  createMeme(client, newMeme);
  res.json(newMeme);
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

