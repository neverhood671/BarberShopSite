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

let clientsFeed =   [ 
   [{
    feed_date: '11.08.2018',
    client_name: 'Борис',
    service_name: 'Стрижка',
    rate: 5,
    text: 'Эвакуатор приехал быстро, погрузили и довезли без промедлений.',
    is_active: true,
    rateArr: [ 0, 1, 2, 3, 4 ] },
   {
    feed_date: '10.08.2018',
    client_name: 'Алексей',
    service_name: 'Стрижка',
    rate: 5,
    text: 'Удобное и понятное приложение.',
    is_active: true,
    rateArr: [ 0, 1, 2, 3, 4 ] },
   {
    feed_date: '08.08.2018',
    client_name: 'Шамиль',
    service_name: 'Стрижка',
    rate: 5,
    text: 'Эвакуатор приехал быстро, погрузили и довезли без промедлений.',
    is_active: true,
    rateArr: [ 0, 1, 2, 3, 4 ] },
   {
    feed_date: '07.08.2018',
    client_name: 'Алексей',
    service_name: 'Стрижка',
    rate: 5,
    text: 'Все круто! Фиксированная цена.',
    is_active: true,
    rateArr: [ 0, 1, 2, 3, 4 ] }],
    [{
    feed_date: '07.08.2018',
    client_name: 'Andrey',
    service_name: 'Моделирование бороды',
    rate: 5,
    text: 'Быстро и профессионально!! Цена как и была рассчитана!!',
    is_active: true,
    rateArr: [ 0, 1, 2, 3, 4 ] },
   {
    feed_date: '04.08.2018',
    client_name: 'Александр',
    service_name: 'Стрижка',
    rate: 5,
    text: 'Все отлично, всё супер, Муса красавчик!',
    is_active: true,
    rateArr: [ 0, 1, 2, 3, 4 ] },
  {
    feed_date: '03.08.2018',
    client_name: 'Екатерина',
    service_name: 'Бритье',
    rate: 5,
    text: 'Прекрасный Водитель! Все быстро и профессионально👍',
    is_active: true,
    rateArr: [ 0, 1, 2, 3, 4 ] },
  {
    feed_date: '02.08.2018',
    client_name: 'Иван',
    service_name: 'Бритье',
    rate: 5,
    text: 'Все отлично!',
    is_active: true,
    rateArr: [ 0, 1, 2, 3, 4 ] } ],
   [{
    feed_date: '07.08.2018',
    client_name: 'Andrey',
    service_name: 'Стрижка',
    rate: 5,
    text: 'Быстро и профессионально!! Цена как и была рассчитана!!',
    is_active: true,
    rateArr: [ 0, 1, 2, 3, 4 ] },
   {
    feed_date: '04.08.2018',
    client_name: 'Александр',
    service_name: 'Стрижка',
    rate: 5,
    text: 'Все отлично, всё супер, Муса красавчик!',
    is_active: true,
    rateArr: [ 0, 1, 2, 3, 4 ] },
  {
    feed_date: '03.08.2018',
    client_name: 'Екатерина',
    service_name: 'Бритье',
    rate: 5,
    text: 'Прекрасный Водитель! Все быстро и профессионально👍',
    is_active: true,
    rateArr: [ 0, 1, 2, 3, 4 ] },
  {
    feed_date: '02.08.2018',
    client_name: 'Иван',
    service_name: 'Стрижка',
    rate: 5,
    text: 'Все отлично!',
    is_active: true,
    rateArr: [ 0, 1, 2, 3, 4 ] } ]];

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