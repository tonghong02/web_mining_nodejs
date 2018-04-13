var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    title: { type: String, lowercase: true, trim: true },
    year: Number,
    imdb: Number,
    //phim le | phim bo
    type: { type: String, lowercase: true, trim: true },
    view: {
        default: 0,
        type: Number
    },
    intro: String,
    rate: Number,
    duration: Number,
    country: { type: String, lowercase: true, trim: true },
    category: { type: String, lowercase: true, trim: true },
});

module.exports = mongoose.model('Movie', movieSchema);