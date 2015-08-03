
var Q = require('q');

exports.jsonTest = function (req) {

    var deferred = Q.defer();

    setTimeout(function () {

        deferred.resolve({
            json: {
                test: 'test'
            }
        });
    }, 500);

    return deferred.promise;
};

exports.nextTest = function (req) {

    req.nextValue = 'next value test';

    return Q.fcall(function () {
        return {
            next: true
        };
    });
};

exports.jsonTestFromNext = function (req) {

    return Q.fcall(function () {
        return {
            json: { nextValue: req.nextValue }
        };
    });
};

exports.redirectToJsonTest = function (req) {

    return Q.fcall(function () {
        return {
            redirect: '/test-json'
        }
    });
};

exports.jadeTest = function (req) {

    return Q.fcall(function () {
        return {
            render: {
                viewPath: 'test-view',
                viewData: {data: 'This comes from the controller'}
            }
        }
    });
};

exports.test404 = function (req) {

    return Q.fcall(function () {
        return {
            notFound: true
        };
    })
};