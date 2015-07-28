
var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    RouteManager = require('express-route-manager'),
    ctrl = require('./controller.js');

var app = express();

var routeManager = new RouteManager({app: app});

app.set('port', 3030);
app.set('views', path.normalize(__dirname + '/'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.normalize(__dirname + '/')));

routeManager.set({
    method: 'get',
    route: '/test-json',
    actions: [ctrl.jsonTest]
});

routeManager.set({
    method: 'get',
    route: '/test-next',
    actions: [ctrl.nextTest, ctrl.jsonTestFromNext]
});

routeManager.set({
    method: 'get',
    route: '/test-redirect',
    actions: [ctrl.redirectToJsonTest]
});

routeManager.set({
    method: 'get',
    route: '/test-jade',
    actions: [ctrl.jadeTest]
});

app.get('*', function(req, res, next) {

    res.send('default route');
});

app.listen(3030, function(){
    console.log('Express running on port ' + 3030);
    console.log("__dirname:" + __dirname);
});