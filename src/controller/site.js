var express = require('express');
var router = express.Router();


var routesMap = {
    '/': 'pages/main/main.pug',
    '/contacts': 'pages/contacts/contacts',
    '/services': 'pages/services/services',
    '/recall': 'pages/recall/recall'
};


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