const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

var Twit = require('twit');
var config = require('../config/twitter');
var T = new Twit(config);

var anthemtweets = {};
T.get('search/tweets', { q: '#AnthemGame', count: 3 }, function(err, data, response) {
    anthemtweets = data.statuses;
  })

// Welcome Page
router.get('/', (req, res) => res.render('welcome', { layout: 'layout' }));

// Dashboard Page
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        name: req.user.name,
        layout: 'layoutdash'
    }));

// Anthem Page
router.get('/anthem', ensureAuthenticated, (req, res) => 
    res.render('anthem', { 
        layout: 'layout',
        alltweets: anthemtweets 
    }));

module.exports = router;