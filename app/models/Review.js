var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        trim: true,
        required: true
    },
    rate: {
        type: Number,
        default: 5,
        required: true
    },
    content: String

});

module.exports = mongoose.model('Reviews', reviewSchema);