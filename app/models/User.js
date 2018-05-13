var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: { type: String, lowercase: true, trim: true },
    address: { type: String, umberlowercase: true, trim: true },
    name: String,
    sex: { type: String, lowercase: true, trim: true },
    birth: Number,
});

// userSchema.pre('save', function(next){
//     this.local.movie = this.local.movie.map(function(option) { return option._id; });
//     next();
//   });

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
