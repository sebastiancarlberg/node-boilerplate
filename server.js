// server.js
// call the packages we need
var express = require('express'); // call express
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config'); // get our config file
var app = express(); // define our app using express
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = config.port; // set our port
mongoose.connect(config.database, { useNewUrlParser: true }); // connect to database
app.set('tokenKey', config.secret); // secret variable

// use morgan to log requests to the console
app.use(morgan('dev'));

// load up our routes
require('./routes')(app);

app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res) {
  res.sendFile('index.html');
});

var server = app.listen(port, function() {
  console.log('App started');
});
