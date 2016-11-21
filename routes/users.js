// routes/users.js
var express             = require('express'),
    UsersController     = express.Router(),
    nJwt                = require('njwt'),
    config              = require('../config');
    tokenvalidation     = require('../middleware/tokenvalidation');
    User                = require('../models/user');

UsersController.use(tokenvalidation);

UsersController.route('/')
  .get(function(req, res) {
      User.find(function(err, users) {
          if (err) {
              res.send(err);
          } else {
              res.json(users);
          }
      });
  })
  .post(function(req, res) {
      var user = new User();
      user.username = req.body.username;
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.password = req.body.password;
      user.admin = req.body.admin;

      user.save(function(err) {
          if (err) {
              res.send(err);
          } else {
              res.json({
                  message: 'User created'
              });
          }
      });
  })
  .delete(function(req, res) {
      User.remove({
          _id: req.params.id
      }, function(err, user) {
          if (err)
              res.send(err);

          res.json({
              message: 'Successfully deleted'
          });
      });
  });


module.exports = UsersController;
