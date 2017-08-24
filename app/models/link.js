var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linkSchema = new Schema({
  url: {
    type: String
  },
  baseUrl: {
    type: String
  },
  code: {
    type: String
  },
  title: {
    type: String
  },
  visits: String
});

var Link = mongoose.model('link', linkSchema);

linkSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});



module.exports = Link;

