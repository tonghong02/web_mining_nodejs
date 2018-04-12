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
    country: { type: String, lowercase: true, trim: true },
    category: { type: String, lowercase: true, trim: true },

    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category',
    //     trim: true,
    //     required: true
    // },
    // country: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Country',
    //     trim: true,
    //     required: true
    // }

});


// movieSchema.post('save', function (doc, next) {
//     doc.populate('Category').execPopulate(function () {
//         next();
//     });
// });


module.exports = mongoose.model('Movie', movieSchema);