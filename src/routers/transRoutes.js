var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

//var database = require('../controllers/database')();

var router = function () {
    authRouter.route('/checkTransaction')
        .post(function (req, res) {
            var card = req.body.card;
            //var vendor = 

            database.checkValidCard(card, function (result) {
                if (result.valid == true) {
                    if (result.balance > transaction.money2spend && result.expiryDate > Date().getTime()) {
                        transaction.consumer = card.number;

                        db.addTransaction(transaction, function (returnedTransaction) {
                            if (returnedTransaction.valid == true) {
                                var money = returnedTransaction.money2spend;

                                db.updateBalanceConsumer(card.number, money, function (returnedConsumerUpdate) {
                                    db.updateBalanceVendor(vendor.number, money, function (returnedVendorUpdate) {
                                        db.updateBalanceBank(money, function (returnedBankUpdate) {
                                            //TODO think of it..Change it

                                            res.redirect('/trans/succes');

                                            connsole.log('Returned bank:', returnedBankUpdate);
                                        });

                                        console.log('Returned vendor:', returnedConsumerUpdate);
                                    });

                                    console.log('Returned consumer:', returnedConsumerUpdate);
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
        });

    transRouter.route('/succes')
        .get(function (req, res) {
            res.render('succes')
        })

    return transRouter;
};

module.exports = router;
