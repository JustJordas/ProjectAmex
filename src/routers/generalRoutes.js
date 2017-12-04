var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

//var database = require('../controllers/database')();


var router = function () {
    generalRouter.route('/pay')
        .get(function (req, res) {
            //check vendor details in the database.#
            //if it goes through
            if (true) {
                res.render('pay');
            } else {
                res.redirect('/');
            }
        })

    return generalRouter;
};

module.exports = router;
