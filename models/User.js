const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name!'],
        minlength: 4,
        maxlength: 50,
    },

    email: {
        type: String,
        required: [true, 'You must provide an email!'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email!',
        ],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 8,
    }
});

// Setup a pre hook to salt and hash the password
// before it gets saved. We don't want to save
// passwords in plaintext.

// Instead of an arrow function we use the function
// declaration so that we have access to the scope
// of *this*.
userSchema.pre('save', async function(next) {
    // Generate salt (random data that is used to help hash the password)
    const salt = await bcrypt.genSalt(10);

    // hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);

    // As of mongoose 5.x, instead of calling next()
    // manually, we can use a function that returns a promise.
    //next();
});

userSchema.methods.createJWT = function () {
    return jwt.sign(
        {
            userID: this._id,
            name: this.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFE,
        }
    );
};

userSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model('User', userSchema);