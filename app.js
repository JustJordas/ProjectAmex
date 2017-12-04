const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('client-sessions');

const authRouter = require('./src/routers/transRoutes')();
var app = express();

var port = 8000;

app.use(express.static('public'));
//app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(session({
    cookieName: 'session',
    secret: 'AmericanExpress',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

//require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/transaction', transRouter);

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, function (err) {
    console.log('Running server on port: ' + port)
});
