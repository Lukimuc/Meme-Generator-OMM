var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

// ##### IMPORTANT
// ### Your backend project has to switch the MongoDB port like this
// ### Thus copy paste this block to your project
const MONGODB_PORT = process.env.DBPORT || '27017';
const db = require('monk')(`127.0.0.1:${MONGODB_PORT}/omm-2223`); // connect to database omm-2021
console.log(`Connected to MongoDB at port ${MONGODB_PORT}`)
// ######

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

/* ------------ Lukas Test -------------- */

/* 
  /signin route --> Post --> Return:  succes /fail
  /register  ---> Post --> Return: User 
  /profile/:userID --> GET --> Return User
  /meme --> POST ---> Meme Sammlung 
*/

app.use(express.json());
const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@test.de',
      password: 'test',
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@test.de',
      password: 'test',
      joined: new Date()
    }
  ]
}


app.get('/', (req, res) => {
  res.json("2");
})


app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
    res.json("success");
  } else {
    res.status(400).json("Error logging in");
  }

})


/* ------------ Lukas Test Ende -------------- */


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
});

module.exports = app;

