var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var crypto = require('crypto');
const key = 'americanexpress';

var url = 'mongodb://test:pass@ds129183.mlab.com:29183/middleman'; //do change this

var database = function () {
    var issueNewCard = function (card, callback) {
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('consumers');

            card.number = crypto.createHmac('sha256', key).update(card.number).digest('hex');
            card.cvc = crypto.createHmac('sha256', key).update(card.cvc).digest('hex');
            card.expiryDate = Date.getTime(); //current UNIX time.

            //TODO check for duplicates..and if not, move on
            collection.insert(card, function (result) {
                if (result.nInserted > 0) {
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
                    //return callback(card);
                } else {
                    //return callback(card);
                }

                return callback(card);
            })
        });
    }


    return {
        checkValidCard: checkValidCard,
        issueNewCard: issueNewCard
    }
}

module.exports = database;
