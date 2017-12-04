var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var crypto = require('crypto');
const key = 'americanexpress';

var url = 'mongodb://test:pass@ds129386.mlab.com:29386/amex_test'; //do change this


var database = function () {
    var issueNewCard = function (card, callback) {
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('consumers');

            card.number = crypto.createHmac('sha256', key).update(card.number).digest('hex');
            card.cvc = crypto.createHmac('sha256', key).update(card.cvc).digest('hex');
            var d = new Date();
            card.expiryDate = d.getTime(); //current UNIX time.

            //TODO check for duplicates..and if not, move on
            collection.insert(card, function (err, result) {
                console.log(result);
                if (!err) {
                    //it s alright
                    return callback(true);
                } else {
                    return callback(false);
                }
            })
        });
    }

    var checkValidCard = function (card, callback) {
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('consumers');

            card.number = crypto.createHmac('sha256', key).update(card.number).digest('hex');
            card.cvc = crypto.createHmac('sha256', key).update(card.cvc).digest('hex');

            collection.find(card).toArray(function (err, result) {
                var card = {
                    valid: false
                }

                if (result.length == 1) {
                    card = result[0];
                    card.valid = true;
                }

                return callback(card);
            })
        });
    }

    var addTransaction = function (transaction, callback) {
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('transactions');

            transaction.consumer = crypto.createHmac('sha256', key).update(transaction.consumer).digest('hex');
            transaction.vendor = crypto.createHmac('sha256', key).update(transaction.vendor).digest('hex');

            collection.insert(transaction, function (err, result) {
                console.log(result);
                if (!err) {
                    //it s alright
                    return callback(true);
                } else {
                    return callback(false);
                }
            })
        })
    }

    var updateBalanceConsumer = function (filter, callback) {
        mongodb.connect(url, function (err, db) {
                var collection = db.collection('consumer');

                collection.find(filter).toArray(function (err, result) {
                    if (result.length == 1) {
                        //collection
                    }
                })
            }
        }
    }


    return {
        checkValidCard: checkValidCard,
        issueNewCard: issueNewCard
    }
}

module.exports = database;
