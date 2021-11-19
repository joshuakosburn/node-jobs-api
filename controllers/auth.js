const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {

    // Create the user based on the data sent in
    // the request.
    const user = await User.create({ ...req.body });

    // Generate a json web token to send back to
    // the user.
    const token = user.createJWT();

    // Send a 201 status with the token back
    // to the client.
    res.status(StatusCodes.CREATED).json(
        {
            user: {
                name: user.name,
            },
            token,
        }
    );
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if both the email and password
    // were supplied in the request.
    if(!email || !password) {
        throw new BadRequestError('Please provide both the email and password!');
    }

    // Email and password has been provided so
    // find the user by email.
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials!');
    }

    // Found the user!
    // Now compare the passwords...
    const isPasswordCorrect = await user.comparePassword(password);

    // Check if the password is incorrect
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials!');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json(
        {
            user: {
                name: user.name,
            },
            token
        }
    );
};

module.exports = {
    register,
    login
};