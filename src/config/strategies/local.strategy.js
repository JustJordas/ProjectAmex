var passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

var database = require('../../controllers/database')();

module.exports = function () {
    passport.use(new localStrategy({
            usernameField: 'cardNumber',
            passReqToCallback: true
        },
        function () {
            return true;
        }
        //database.checkCredentials( /* TODO */ )));
    ))
};
