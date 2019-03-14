const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


var Twit = require('twit');
var config = require('../config/twitter');
var T = new Twit(config);

// Anthem Tweets start
var anthemtweets = {};
T.get('search/tweets', { q: '#AnthemGame', count: 6 }, function(err, data, response) {
    anthemtweets = data.statuses;
  })
// Anthem Tweets end

// Division Tweets start
var divisiontweets = {};
T.get('search/tweets', { q: '#TheDivision2', count: 6 }, function(err, data, response) {
    divisiontweets = data.statuses;
  })
// Division Tweets end

// Welcome Page
router.get('/', (req, res) => res.render('welcome', { layout: 'layout' }));

// Dashboard Page
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        name: req.user.name,
        layout: 'layoutdash'
    }));

// Browse Page
router.get('/browse', ensureAuthenticated, (req, res) => 
    res.render('browse', {
        layout: 'layoutbrowse'
    }));

// Anthem Page
router.get('/anthem', ensureAuthenticated, (req, res) => 
    res.render('anthem', { 
        layout: 'layoutanthem',
        alltweets: anthemtweets 
    }));

// Division Page
router.get('/division', ensureAuthenticated, (req, res) => 
    res.render('division', { 
        layout: 'layoutdivision',
        alltweets: divisiontweets 
    }));

module.exports = router;