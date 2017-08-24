var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shortlyDB');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to Mongo');
});

module.exports = db;

