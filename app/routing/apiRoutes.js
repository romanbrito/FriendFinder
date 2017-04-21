"use strict";

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

    for (var i = 0; i < friendsData.length; i++) {
        var sum = sumArraysABS(newuser.scores, friendsData[i].scores);
        friendsData[i].diff = sum;
        bestMatcharr.push(friendsData[i]);
    }

    bestMatcharr.sort(function (a, b) {
        return a.diff - b.diff;
    });

    res.json(bestMatcharr[0]);//

    // remove .diff from object
    var friendsobj = [];
    for (var i = 0; i < friendsData.length; i++) {
        friendsobj.push(
            {name: friendsData[i].name,
            photo: friendsData[i].photo,
            scores: friendsData[i].scores
            }
        );
    }
    friendsobj.push(newuser);

    friendsData = friendsobj;
    fs.writeFile('app/data/friends.json', JSON.stringify(friendsobj), 'utf8', function (err) { //save file
       console.log("error " + err);
    });
});

module.exports = router;