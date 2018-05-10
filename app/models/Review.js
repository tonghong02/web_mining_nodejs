var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true
    },
    idMovie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        trim: true,
        required: true
    },
    movie: {
        type: String, trim: true
    },
    rate: {
        type: Number,
        default: 5,
        required: true
    },
    content: { type: String, lowercase: true, trim: true }

});

module.exports = mongoose.model('Review', reviewSchema);