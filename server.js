
var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    RouteManager = require('./routeManager'),
    ctrl = require('./controller.js');

var app = express();

var routeManager = new RouteManager(
    {
        app: app,
        authenticated: function (req, res, next) {

            console.log('authenticated');
            next();
        },
        checkRole: function(role) {

            return function(req, res, next) {

                console.log('role: ' + role);
                next();
            };
        },
        actions: {

            notFound: function (req, res, next) {

                // For a more in depth 404 error handling, check out:
                // https://github.com/strongloop/express/blob/master/examples/error-pages/index.js
                res.status(404);
                res.end();
            },
            redirect: function (req, res, next) {

                res.send('redirect override');
            }
        }
    }
);

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
    authenticated: true,
    role: 'admin',
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

routeManager.set({
    method: 'get',
    route: '/test-404',
    actions: [ctrl.test404]
});

app.get('*', function(req, res, next) {

    res.send('default route');
});

app.listen(3030, function(){
    console.log('Express running on port ' + 3030);
    console.log("__dirname:" + __dirname);
});