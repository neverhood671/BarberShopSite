var express = require('express');
var config = require('./config.json');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('./src/model/account');

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/src/view');

app.use(bodyParser.json({
    type: 'application/json'
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static(__dirname + '/build'));
app.use('/', require('./src/controller/site.js'));




passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');

app.use(function(req, res, next) {
    res.sendStatus(404);
});


app.listen(config.http_port, function () {
    console.log('Applications started on', config.http_port);
});


