var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    imdb: Number,
    view: {
        default: 0,
        type: Number
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        trim: true,
        required: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        trim: true,
        required: true
    }

});

module.exports = mongoose.model('Movie', movieSchema);