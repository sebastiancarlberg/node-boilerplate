// routes/users.js
var express                     = require('express'),
    AuthenticateController      = express.Router(),
    nJwt                        = require('njwt'),
    secureRandom                = require('secure-random'),
    config                      = require('../config'),
    User                        = require('../models/user');

AuthenticateController.route('/')
  .post(function(req, res) {
      // find the user
      User.findOne({
          username: req.body.username
      }, function(err, user) {
          if (err) throw err;

          if (!user) {
              res.json({
                  success: false,
                  message: 'Authentication failed. User not found.'
              });
          } else if (user) {
              if (user.password != req.body.password) {
                  res.json({
                      success: false,
                      message: 'Authentication failed. Wrong password.'
                  });
              } else {
                  // if user is found and password is right
                  var roles = user.roles;
                  console.log("roles: " + roles);
                  var claims = {
                      sub: user.username,
                      iss: 'https://localhost:8080',
                      permissions: 'admin'                                      // TODO: set based on user info
                  }

                  //var signingKey = secureRandom(256, {type: 'Buffer'}); // Create a highly random byte array of 256 bytes
                  var token = nJwt.create(claims, config.secret);
                  var tokenCompact = token.compact();

                  // return the information including token as JSON
                  res.json({
                      success: true,
                      message: 'Enjoy your token!',
                      token: tokenCompact,
                  });
              }
          }
      });
  });


module.exports = AuthenticateController;
