var express = require('express');
var generalRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var database = require('../controllers/database')();

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

    generalRouter.route('/createAcc')
        .get(function (req, res) {
            res.render('createCard');
        })
        .post(function (req, res) {
            var card = {
                number: req.body.card_number,
                cvc: req.body.cvc
            }

            database.issueNewCard(card, function (result) {
                console.log("Create new acc:", result);
            })
        })

    return generalRouter;
};

module.exports = router;
