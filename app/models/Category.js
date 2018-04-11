var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: { type: String, lowercase: true, trim: true }
});

module.exports = mongoose.model('Category', categorySchema);