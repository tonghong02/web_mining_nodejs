var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Test', new Schema({ 
    name: String, 
    password: String, 
    admin: Boolean,
    email: String,
}));