var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

//var database = require('../controllers/database')();

var router = function () {
    authRouter.route('/test')
        .get(function (req, res) {
            res.render("test2");
            console.log("From /test:", req.user);
        });

    authRouter.route('/checkTransaction')
        .post(function (req, res) {
            /*TODO check stuff..if we need to keep track of the card session
                query DB 
                
                if(user) {
                    req.session.card = req.body.card;
                }
            */

            var card = req.body.card;
            //var vendor = 

            database.checkValidCard(card, function (result) {
                if (result.valid == true) {
                    if (result.balance > transaction.money2spend) {
                        transaction.consumer = card.number;

                        db.addTransaction(transaction, function (returnedTransaction) {
                            if (returnedTransaction.valid == true) {
                                var money = returnedTransaction.money2spend;

                                db.updateBalanceConsumer(card.number, money, function (returnedConsumerUpdate) {
                                    db.updateBalanceVendor(vendor.number, money, function (returnedVendorUpdate) {
                                        db.updateBalanceBank(money, function (returnedBankUpdate) {
                                            //TODO think of it..Change it
                                        });
                                    });
                                });
                            }
                        });
                    } else {

                    }
                    //Check balance and etc etc
                } else {
                    //close stuff
                }
            })
        })


    /*
        authRouter.route('/tryRandomLogin')
            .get(function (req, res) {
                req.user = {
                    name: "Me",
                    secondName: "Mario"
                }

                console.log(req.user);

                res.render("test2");
            });
    */
    return authRouter;
};

module.exports = router;
