let express = require('express');
let passport = require('passport');
let Account = require('../model/account');
let router = express.Router();


let routesMap = {
    '/': 'pages/main/main.pug',
    '/contacts': 'pages/contacts/contacts',
    '/services': 'pages/services/services',
    '/recall': 'pages/recall/recall',
    '/appointment': 'pages/appointment/appointment',
    '/account':  'pages/account/account'
};

let clientsFeed = require('../data/recalls.json');

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    
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
    res.redirect('/account');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/api/makeAppointment', function(req, res) {
    console.log('hey!!!!');
    //todo: insert data to db
});


router.use(function(req, res, next) {

    let params = {};

    params.path = req.path.split('/')[1] || '';
    params.viewFile = routesMap['/' + params.path];
    if (params.path === 'recall'){
        params.clientsFeed = clientsFeed;
    }
    req.templateParams = params;

    next();
});

router.use(function(req, res, next) {

    let view = req.templateParams.viewFile;
    if (view) {
        res.render(view, req.templateParams);
    } else {
        res.status(404).render('404', {});
    }

});



module.exports = router;