var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var crypto = require('crypto');
const key = 'americanexpress';

//password = crypto.createHmac('sha256', key).update(password).digest('hex');

var url = 'mongodb://test:pass@ds129183.mlab.com:29183/middleman';

var database = function () {
    var issueNewCard = function (card, callback) {
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('consumers');

            card.number = crypto.createHmac('sha256', key).update(card.number).digest('hex');
            card.cvc = crypto.createHmac('sha256', key).update(card.cvc).digest('hex');

            //TODO check for duplicates..and if not, move on
            collection.insert(card, result) {
                if (result.nInserted > 0) {
                    //it s alright
                    return callback(true)
                } else {
                    return callback(false);
                }
            }
        });
    }

    var checkValidCard = function (card, callback) {
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('consumers');

            card.number = crypto.createHmac('sha256', key).update(card.number).digest('hex');
            card.cvc = crypto.createHmac('sha256', key).update(card.cvc).digest('hex');

            //TODO check for duplicates..and if not, move on
            collection.find(card).toArray(function (err, result)) {
                var card = {
                    valid: false
                }

                if (result.length == 1) {
                    card = result[0];
                    card.valid = true;
                    return callback(card);
                } else {
                    return callback(card);
                }
            }
        });
    }


    return {
        checkValidCard: checkValidCard,

    }
}

module.exports = database;
