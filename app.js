const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();

// Pssport configuration
require('./config/passport')(passport);

// Database Configuration
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave:true,
    saveUninitialized: true
  }));

  // Middleware for Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Connect flash
  app.use(flash());

  // Global variables
  app.use((req, res, next) => {
      res.locals.successmsg = req.flash('successmsg');
      res.locals.errormsg = req.flash('errormsg');
      res.locals.error = req.flash('error');
      next();
    });

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));