var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../model/account');


var routesMap = {
    '/': 'pages/main/main.pug',
    '/contacts': 'pages/contacts/contacts',
    '/services': 'pages/services/services',
    '/recall': 'pages/recall/recall'
};


router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    console.log('username: ' + req.body.username);
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            console.log(err);
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


router.use(function(req, res, next) {

    var params = {};

    params.path = req.path.split('/')[1] || '';
    params.viewFile = routesMap['/' + params.path];
    req.templateParams = params;

    next();
});

router.use(function(req, res, next) {

    var view = req.templateParams.viewFile;
    if (view) {
        res.render(view, req.templateParams);
    } else {
        res.status(404).render('404', {});
    }

});



module.exports = router;