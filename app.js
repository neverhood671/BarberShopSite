var express = require('express');
var config = require('./config.json');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json({
    type: 'application/json'
}));

app.set('view engine', 'pug');
app.set('views', __dirname + '/src/view');

app.use(express.static(__dirname + '/build'));
app.use('/', require('./src/controller/site.js'));


app.use(function(req, res, next) {
    res.sendStatus(404);
});

app.listen(config.http_port, function () {
    console.log('Applications started on', config.http_port);
});


