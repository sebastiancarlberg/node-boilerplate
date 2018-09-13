// routes/users.js
var express             = require('express'),
    nJwt                = require('njwt'),
    config              = require('../config'),
    tokenController     = express.Router();

tokenController.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        nJwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                // respond to request with error
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // continue with the request
                req.decoded = decoded;
                console.log('username: ' + decoded.body.sub);
                
                next();                                                         // TODO: only if correct permission in token
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});


module.exports = tokenController;
