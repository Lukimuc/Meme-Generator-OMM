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

const app = express()
const port = 3002

app.listen(port, () => console.log('Example app listening on port ' + port))

// Setup  MongoDB:
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const url = 'mongodb://0.0.0.0:27017';

const apiMemeRouter = require("./routes/api/meme");

const dbName = 'memeGeneratorDB';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect().then(() => {
  console.log("Connected successfully to server");


});


// create User Document in DB
async function createUser(client, newUser) {
  const result = await client.db("memeGeneratorDB").collection("users").insertOne(newUser);
  console.log(`New User created with the ID ${result.insertedID}`);

  return result;
}

//find Memes marked as public
async function getPublicMemes(client) {
  const result = await client.db("memeGeneratorDB").collection("memes").find({ status: "public" }).toArray();
  if (result.length > 0) {
    console.log(`${result.length} public memes found`);
    return result;
  } else {
    console.log(`No public memes found`);
    return result;
  }
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


// ---- Memes ----
// create Meme Document in DB
async function createMeme(client, newMeme) {
  const result = await client.db("memeGeneratorDB").collection("memes").insertOne(newMeme);
  console.log(`New Meme created with the ID ${result.insertedID}`);

  return result;
}

// find all created Memes on DB
async function findAllMemes(client) {
  const cursor = await client.db("memeGeneratorDB").collection("memes").find();
  const result = await cursor.toArray();

  if (result.length > 0) {
    console.log(`Memes found`);
  } else {
    console.log(`No memes found`);
  }
  return result;
}

async function findMemesByUserID(client, userID) {
  const cursor = await client.db("memeGeneratorDB").collection("memes").find({ CreatorID: ObjectID(userID) });
  const result = await cursor.toArray();

  if (result.length > 0) {
    console.log(`Memes found`);
    console.log(result);
  } else {
    console.log(`No memes found`);
  }
  return result;
}

async function updateMemeByMemeID(client, memeID, req) {
  const { title, status, likes, imageDescription, viewsToday, likedBy, deleteLike } = req.body;
  let changes = {}
  console.log("viewsToday")

  if (title !== undefined) {
    changes.title = title;
  }

  if (status !== undefined) {
    changes.status = status;
  }

  if (likes !== undefined) {
    changes.likes = likes;
  }

  if (imageDescription !== undefined) {
    changes.imageDescription = imageDescription;
  }

  if (viewsToday !== undefined) {
    changes.viewsToday = viewsToday;
  }

  if (viewsToday !== undefined) {
    changes.viewsToday = viewsToday;
  }

  // like feature start - check if value in array has to be deleted 
  if (deleteLike) {
    await client.db("memeGeneratorDB").collection("memes").updateOne({ _id: ObjectID(memeID) },
      { $pull: { likedBy: likedBy } }); // delete value in array

    changes.likes = likes;
    await client.db("memeGeneratorDB").collection("memes").updateOne({ _id: ObjectID(memeID) },
      { $set: changes }); // new likes value
    updatedMeme = findMemeByMemeID(client, memeID);
    return updatedMeme;
  }

  // if not then add value to array
  if (likedBy !== undefined) {
    const result = await client.db("memeGeneratorDB").collection("memes").updateOne({ _id: ObjectID(memeID) },
      { $addToSet: { likedBy: likedBy } });
    updatedMeme = findMemeByMemeID(client, memeID);
    return updatedMeme;
  } // like feature end

  console.log("changes", changes);

  const result = await client.db("memeGeneratorDB").collection("memes").updateOne({ _id: ObjectID(memeID) },
    { $set: changes });

  if (result.modifiedCount > 0) {
    console.log("Meme has been updated: ", result.modifiedCount);
    updatedMeme = findMemeByMemeID(client, memeID)
    return updatedMeme;
  } else {
    console.log(`No changes applied`)
    return;
  }
}

async function findMemeByMemeID(client, memeID) {
  const result = await client.db("memeGeneratorDB").collection("memes").findOne({ _id: ObjectID(memeID) });


  if (result.length > 0) {
    console.log(`Meme found`);
    console.log(result);
  } else {
    console.log(`No meme found`);
  }
  return result;
}

// logs
async function findLogs(client) {
  const result = await client.db("memeGeneratorDB").collection("logs").findOne({ globalIdentifier: true });

  if (result.length > 0) {
    console.log(`Meme found`);
    console.log(result);
  } else {
    console.log(`No meme found`);
  }
  return result;
}


async function upsertLog(client, req) {
  //const { fileUploadButtonClickedTotal, urlButtonClickedTotal, thirdPartyButtonClickedTotal, cameraButtonClickedTotal, drawButtonClickedTotal } = req.body;
  console.log(req.body)

  data = req.body;
  const formattedData = data.map(({ name, clicks }) => {
    return { [name]: clicks };
  });
  console.log(formattedData);

  const combinedData = Object.assign({}, ...formattedData);
  console.log(combinedData);

  const changes = {
    "fileUploadButtonClickedTotal": combinedData['File Upload'],
    "urlButtonClickedTotal": combinedData.URL,
    "thirdPartyButtonClickedTotal": combinedData['Third Party'],
    "cameraButtonClickedTotal": combinedData.Camera,
    "drawButtonClickedTotal": combinedData.Draw,
    "globalIdentifier": true
  };

  const result = await client.db("memeGeneratorDB").collection("logs").updateOne({ globalIdentifier: true }, { $set: changes }, { upsert: true });

  console.log(`${result.matchedCount} documents matched the query criteria`);
  console.log(`${result.modifiedCount} documents were updated`);
  console.log(changes)
  return changes;
}


/* async function updateMemeByMemeID(client, memeID, req) {
  const { title, status, likes, imageDescription } = req.body;
  let changes = {}

  if (title !== undefined) {
    changes.title = title;
  }

  if (status !== undefined) {
    changes.status = status;
  }

  if (likes !== undefined) {
    changes.likes = likes;
  }

  if (imageDescription !== undefined) {
    changes.imageDescription = imageDescription;
  }

  console.log("changes", changes);

  const result = await client.db("memeGeneratorDB").collection("memes").updateOne({ _id: ObjectID(memeID) },
    { $set: changes });

  if (result.modifiedCount > 0) {
    console.log("Meme has been updated: ", result.modifiedCount);
    updatedMeme = findMemeByMemeID(client, memeID)
    console.log("updated Meme", updatedMeme._id)
    return updatedMeme;
  } else {
    console.log(`No changes applied`)
    return;
  }
} */



/* Endpoints: 
  /register  ---> Post --> Return: User 
  /signin route --> Post --> Return:  succes /fail
  /profile/:id --> GET --> Return User
  /image ---> PUT --> Change Counter, Returns Entries Number 
  / --> GET --> Return ALL User
*/
app.use(express.json());
app.use(cors(
));


// Page logs / Feature 22 - update clicks in Editor
app.get(("/log"), async (req, res) => {
  try {
    const log = await findLogs(client)
    res.json(log);
  } catch (error) {
    res.status(400).json("Error in app.get('/log': " + error);
  }
})

// Page logs / Feature 22 - update clicks in Editor
app.put(("/log"), async (req, res) => {
  try {
    const changes = await upsertLog(client, req)
    res.json(changes);
  } catch (error) {
    res.status(400).json("Error in app.get('/log': " + error);
  }
})

// update a specific Meme by MemeID
app.put(('/memes/:id'), async (req, res) => {
  const id = req.params.id
  console.log('/memes/:id executed')

  try {
    const updatedMeme = await updateMemeByMemeID(client, id, req);
    res.json(updatedMeme); // server response to frontend
  } catch (error) {
    console.log("Error in app.get('/meme/:id': " + error);
    res.status(400).json("Error in app.get('/meme/:id'': " + error);
  }
})




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

// REGISTER via google
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

// get the individual profile with defined IDs and their created memes
app.get('/profile/:id', async (req, res) => {
  const id = req.params.id

  try {
    const user = await findOneUserByID(client, id); // get's back a User as Object 
    const memes = await findMemesByUserID(client, id); // get's back all Memes created by the user
    // do something with the user ...
    const data = Object.assign({}, user, { memes });
    res.json(data); // server response to frontend

  } catch (error) {
    console.log("Error in app.get('profile/id': " + error);
    res.status(400).json("Error in app.get('profile/id': " + error);
  }
})

// create Meme
app.post(("/memes"), async (req, res) => {
  const { email, image_encoded } = req.body; // TODO get input from frontend 
  user = await findOneUserByEmail(client, email);

  newMeme = {
    "title": "test",
    "status": "public",
    "likes": 0,
    "memeCreated": new Date(),
    "CreatorID": user._id,
    "CreatorMail": user.email,
    "imageDescription": "This is a Description of the Picture made by the User used for the Screenreader",
    "viewsToday": 0,
    "likedBy": [],
    "image_encoded": image_encoded
  }
  createMeme(client, newMeme);
  res.json(newMeme);
})

// get all memes on db
app.get(("/memes"), async (req, res) => {
  memes = await findAllMemes(client);
  res.json(memes);
})

// get a specific Meme by MemeID
app.get(("/memes/:id"), async (req, res) => {
  const id = req.params.id

  try {
    const meme = await findMemeByMemeID(client, id);

    res.json(meme); // server response to frontend

  } catch (error) {
    console.log("Error in app.get('/meme/:id': " + error);
    res.status(400).json("Error in app.get('/meme/:id'': " + error);
  }
})


// update a specific Meme by MemeID
app.put(("/memes/:id"), async (req, res) => {
  const id = req.params.id

  try {
    const updatedMeme = await updateMemeByMemeID(client, id, req);
    res.json(updatedMeme); // server response to frontend
  } catch (error) {
    console.log("Error in app.get('/meme/:id': " + error);
    res.status(400).json("Error in app.get('/meme/:id'': " + error);
  }
})


// Streaming Server - HTTPS - Feature 18

const fs = require('fs');
const server = require('https').createServer({
  key: fs.readFileSync(__dirname + "/server.key"),
  cert: fs.readFileSync(__dirname + "/server.cert")
});
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', socket => {
  console.log("a user connected");

  socket.on('streaming', (data) => {
    //console.log("received streaming data: ", data);
    io.emit('streaming', data);
  });
});

server.listen(8080);

/* DO WE USE THIS? // get memes by specific user
app.get(("/memes/:userID"), async (req, res) => {
  const {id} = req.body;
  console.log(id);
  memes = await findAllMemes(client);
  res.json(memes);
}) */

/*
app.put('/memes/:id/like', (req, res) => {
  // retrieve the id of the meme to update from the request
  const id = req.params.id;

  // find the meme in the database and update the likes count
  client.db("memeGeneratorDB").collection("memes").updateOne({ _id: new ObjectID(id) }, { $inc: { likes: 1 } })
    .then(result => {
      console.log(`Meme with id ${id} updated`);
      res.send({ success: true });
    })
    .catch(err => {
      console.log(err);
      res.send({ success: false });
    });
});
*/
app.put('/memes/:id/like', async (req, res) => {
  // retrieve the id of the meme to update from the request
  const id = req.params.id;

  try {
    const data = await updateMemeByMemeID(client, id, req);
    res.json(data); // server response to frontend
  } catch (error) {
    console.log("Error in app.get('/meme/:id': " + error);
    res.status(400).json("Error beim liken app.get('/meme/:id'': " + error);
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

