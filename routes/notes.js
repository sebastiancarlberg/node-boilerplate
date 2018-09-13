// routes/notes.js
var express                     = require('express'),
    NotesController             = express.Router(),
    nJwt                        = require('njwt'),
    config                      = require('../config');
    tokenvalidation             = require('../middleware/tokenvalidation');
    Note                        = require('../models/note');

NotesController.use(tokenvalidation);

NotesController.route('/')
    .get(function (req, res) {
        // if admin get all?
        var query = {
            authorusername: req.decoded.body.sub
        };
        Note.find(query, function (err, notes) {
            if (err) {
                res.send(err);
            } else {
                res.json(notes);
            }
        });
    })
    .post(function (req, res) {
        var note = new Note();
        note.subject = req.body.subject;
        note.bodytext = req.body.bodytext;
        note.authorusername = req.decoded.body.sub;

        note.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    message: 'Note created'
                });
            }
        });
    })
    .put(function (req, res) {
        var query = {
            _id: req.body.id
        };
        Note.findByIdAndUpdate(query, req.body, {
            new: true
        }, function (err, note) {
            res.send(note);
        });
    })
    .delete(function (req, res) {
        Note.remove({
            _id: req.params.id
        }, function (err, note) {
            if (err)
                res.send(err);

            res.json({
                message: 'Successfully deleted'
            });
        });
    });


module.exports = NotesController;