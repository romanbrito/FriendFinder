var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require("body-parser");
var fs = require('fs');
var friendsData = require('../data/friends.json');// read json file

// Sets up the Express app to handle data parsing
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.text());
router.use(bodyParser.json({ type: "application/vnd.api+json" }));

router.get('/api/friends', function (req, res) {
    res.json(friendsData);
});

router.post('/api/new', function(req, res) {
    var newuser = req.body;
    friendsData.push(newuser);
    fs.writeFile('app/data/friends.json', JSON.stringify(friendsData), 'utf8', function (err) { //save new user in file
       console.log(err);
    });
    console.log(newuser);
    res.json(newuser);
});

module.exports = router;