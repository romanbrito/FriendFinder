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

router.post('/api/friends', function(req, res) {
    var friends = friendsData;
    function sumArraysABS ( array1, array2) {
        var arrDiff = array1.map(function (num, idx) {
            return Math.abs(num - array2[idx]);
        });
        var sum = arrDiff.reduce(function (a, b) {
            return a + b;
        }, 0);
        return sum;
    }
    var newuser = req.body;

    var bestMatcharr = [];

    for (var i = 0; i < friends.length; i++) {
        var sum = sumArraysABS(newuser.scores, friends[i].scores);
        friends[i].diff = sum;
        bestMatcharr.push(friends[i]);
    }

    bestMatcharr.sort(function (a, b) {
        return a.diff - b.diff;
    });

    res.json(bestMatcharr[0]);

    friendsData.push(newuser);
    fs.writeFile('app/data/friends.json', JSON.stringify(friendsData), 'utf8', function (err) { //save new user in file
       console.log(err);
    });
});

module.exports = router;