const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

//const authRouter = require('./src/routes/authRoutes')();
var app = express();

var port = 8000;

app.use(express.static('public'));
//app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: 'middleman'
}));

//require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');
//app.use('/auth', authRouter);

app.get('/', function (req, res) {
    
            res.render('index');
    });

app.listen(port, function (err) {
    console.log('Running server on port: ' + port)
});