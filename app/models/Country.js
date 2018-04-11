var mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({
    name: { type: String, lowercase: true, trim: true }
});

module.exports = mongoose.model('Country', countrySchema);