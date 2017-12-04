var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var passport = require('passport');

//var database = require('../controllers/database')();

var router = function () {
    authRouter.route('/test')
        .get(function (req, res) {
            res.render("test2");
        })

    return authRouter;
};

module.exports = router;
