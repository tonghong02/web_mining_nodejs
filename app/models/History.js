var mongoose = require('mongoose');

var historySchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        trim: true,
        required: true
    },
    titleMovie: { type: String, lowercase: true, trim: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('History', historySchema);