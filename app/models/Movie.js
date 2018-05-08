var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
    //phim le | phim bo
    // type: { type: String, lowercase: true, trim: true },
    country: { type: String, lowercase: true, trim: true },
    category: { type: String, lowercase: true, trim: true },
    content: { type: String, lowercase: true, trim: true },
    imdb: String,
    engTitle: { type: String, lowercase: true, trim: true },
    linkPhim: { type: String, lowercase: true, trim: true },
    title: { type: String, lowercase: true, trim: true },
    linkBackgrounds: { type: String },
    country: { type: String, lowercase: true, trim: true },
    year: { type: String, lowercase: true, trim: true },
    linkWatch: { type: String, lowercase: true, trim: true },
    rate: Number,
    view: {
        default: 0,
        type: Number
    },
});

module.exports = mongoose.model('Movie', movieSchema);