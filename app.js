const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('client-sessions');

const transRouter = require('./src/routers/transRoutes')();
const generalRouter = require('./src/routers/generalRoutes')();
var app = express();

var port = 8000;

app.use(session({
    cookieName: 'session',
    secret: 'AmericanExpress',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/transaction', transRouter);
app.use('/general', generalRouter);

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, function (err) {
    console.log('Running server on port: ' + port)
});
