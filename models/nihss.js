// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Nihss', new Schema({
    consciousness: String,
    orientation: String,
    comprehension: String,
    author: String,
    authorusername: String,
    created: { type: Date, default: Date.now }
}));
