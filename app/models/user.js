var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = new Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    bankroll: {
      type: Number,
      default: 5000
    },
    creationDate: {
      type: Date,
      default: Date.now
    }
});

userSchema.pre("save", function (next) {
    var user = this;

    if (!user.isModified("password")) {
        next();
    }

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', userSchema);
