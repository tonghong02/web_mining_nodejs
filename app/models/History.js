var mongoose = require('mongoose');

var historySchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        trim: true,
        required: true
    }

});

module.exports = mongoose.model('Histories', movieSchema);