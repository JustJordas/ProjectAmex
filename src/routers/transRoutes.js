var express = require('express');
var transRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var database = require('../controllers/database')();

var router = function () {
    transRouter.route('/checkTransaction')
        .post(function (req, res) {
            console.log("Check transaction body:", req.body);
            var card = {
                number: req.body.card_number,
                cvc: req.body.cvc
            }
            //var vendor = 

            database.checkValidCard(card, function (result) {
                console.log('Card:', result);

                if (result.valid == true) {
                    if (result.balance > transaction.money2spend && result.expiryDate > Date().getTime()) {#
                        var transaction = {
                            consumer: result.number,
                            vendor: null,
                            amount: 100
                        }

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
                            } else {
                                console.log('Invalid transaction');
                            }
                        });
                    } else {
                        console.log('Balance or expiry date invalid');
                    }
                    //Check balance and etc etc
                } else {
                    //close stuff
                    console.log('Invalid card');
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
