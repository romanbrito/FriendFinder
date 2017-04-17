var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require("body-parser");

// Sets up the Express app to handle data parsing
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.text());
router.use(bodyParser.json({ type: "application/vnd.api+json" }));

router.post('/api/new', function(req, res) {
    var newuser = req.body;
    console.log(newuser);
});

module.exports = router;